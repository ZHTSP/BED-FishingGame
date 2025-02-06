document.addEventListener("DOMContentLoaded", function () {
  
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const challengeId = urlParams.get("challenge_id");

  fetch("http://localhost:3000/api/challenges")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((challenges) => {
      const challenge = challenges.find((c) => c.challenge_id == challengeId);
      if (!challenge) {
        const challengeInfo = document.getElementById("challengeInfo");
        challengeInfo.innerHTML = "<p>Challenge not found.</p>";
        return;
      }

      displayChallengeInfo(challenge);

      const completeChallengeForm = document.getElementById("completeChallengeForm");
      completeChallengeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        completeChallenge(challengeId);
      });

      // Display the Edit Challenge form if the user is the creator
      displayEditChallengeForm(challenge);

      fetchChallengeRecords(challengeId);
    })
    .catch((error) => {
      console.error("Error fetching challenge data:", error);
    });
});

  //date and time formatted
  const now = new Date();
  const dateTime = now.toISOString().replace("T", " ").split('.')[0];

function displayChallengeInfo(challenge) {
  const challengeInfo = document.getElementById("challengeInfo");

  challengeInfo.innerHTML = `
    <div class="col-md-6 offset-md-3">
      <div class="card shadow p-3">
        <div class="card-body">
        <img src="challenge-images/challenge_${challenge.challenge_id}.png" alt="${challenge.challenge}" class="img-fluid mb-3" style="max-height: 150px;" onerror="this.onerror=null; this.src='challenge-images/challenge_new.png';">
          <h5 class="card-title">${challenge.challenge}</h5>
          <p class="card-text">
            <strong>Challenge ID:</strong> ${challenge.challenge_id} <br>
            <strong>Skill Points:</strong> ${challenge.skillpoints}
          </p>
        </div>
      </div>
    </div>
  `;
}

function displayEditChallengeForm(challenge) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User is not logged in.");
    return;
  }

  // Decode the JWT token to get the user ID
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  // Check if the logged-in user is the creator of the challenge
  if (userId != challenge.creator_id) {
    return; // Do not display the edit form if the user is not the creator
  }

  const editChallengeFormContainer = document.getElementById("editChallengeFormContainer");

  editChallengeFormContainer.innerHTML = `
    <div class="col-md-6">
      <form id="editChallengeForm" class="card shadow p-3">
        <div class="card-body">
          <h5 class="card-title">Edit Challenge</h5>
          <div class="mb-3">
            <label for="challengeName" class="form-label">Challenge Name</label>
            <input type="text" class="form-control" id="challengeName" required>
          </div>
          <div class="mb-3">
            <label for="skillPoints" class="form-label">Skill Points Reward</label>
            <input type="number" class="form-control" id="skillpoints_edit"  required>
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  `;

  // Handle form submission
  const editChallengeForm = document.getElementById("editChallengeForm");
  editChallengeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    updateChallenge(challenge.challenge_id);
  });
}

function updateChallenge(challengeId) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User is not logged in.");
    return;
  }

  // Decode the JWT token to get the user ID
  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log(payload)
  const userId = payload.userId;

  const challengeName = document.getElementById("challengeName").value;
  const skillpoints_edit = document.getElementById("skillpoints_edit").value;
  // Include user_id in the request body
  const requestBody = {
    user_id: userId,
    challenge: challengeName,
    skillpoints: skillpoints_edit, 
  };

  fetch(`http://localhost:3000/api/challenges/${challengeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      console.log(requestBody)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.json)
      return response.json();
    })
    .then((data) => {
      console.log("Challenge updated successfully:", data);
      alert("Challenge updated successfully!");
      window.location.reload(); // Refresh the page to reflect changes
    })
    .catch((error) => {
      console.error("Error updating challenge:", error);
      alert("Failed to update challenge.");
    });
}



function fetchChallengeRecords(challengeId) {
  fetch(`http://localhost:3000/api/challenges/${challengeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((records) => {
      displayChallengeRecords(records);
    })
    .catch((error) => {
      console.error("Error fetching challenge records:", error);
    });
}

function displayChallengeRecords(records) {
  const challengeRecordsContainer = document.getElementById("challengeRecords");

  if (records.length === 0) {
    challengeRecordsContainer.innerHTML = "<p>No challenge records found.</p>";
    return;
  }

  // First, fetch all users to create a mapping from user_id to username.
  fetch("http://localhost:3000/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error while fetching users! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      // Create a mapping from user_id to username.
      const userMap = {};
      users.forEach((user) => {
        userMap[user.user_id] = user.username;
      });

      // Build the HTML for each challenge record.
      const recordsHTML = records
        .map((record) => {
          const username = userMap[record.user_id] || "N/A";
          return `
            <div class="col-md-4 mb-4">
              <div class="card shadow p-3 ${record.completed ? "border-success" : "border-warning"}">
                <div class="card-body">
                  <h5 class="card-title">Record ID: ${record.complete_id}</h5>
                  <p class="card-text">
                    <strong>User:</strong> ${username} (${record.user_id})<br>
                    <strong>Completed:</strong> ${record.completed ? "Yes" : "No"} <br>
                    <strong>Creation Date:</strong> ${record.creation_date} <br>
                    <strong>Notes:</strong> ${record.notes || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      challengeRecordsContainer.innerHTML = recordsHTML;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      challengeRecordsContainer.innerHTML = "<p>Error loading challenge records.</p>";
    });
}


function completeChallenge(challengeId) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User is not logged in.");
    alert("You must be logged in to complete a challenge.");
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  const completed = document.getElementById("completed").value === "true";
  const notes = document.getElementById("notes").value;

  const requestBody = {
    user_id: userId,
    completed: completed,
    creation_date: dateTime,
    notes: notes,
  };

  fetch(`http://localhost:3000/api/challenges/${challengeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Challenge submitted successfully:", data);
      alert("Challenge submitted successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error completing challenge:", error);
      alert("Failed to complete challenge.");
    });
}