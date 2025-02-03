document.addEventListener("DOMContentLoaded", function () {
  const challengeList = document.getElementById("challengeList");

  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      currentUserId = payload.userId;
    } catch (e) {
      console.error("Error decoding token:", e);
    }
  }

  // Fetch challenge data from the API
  fetch("http://localhost:3000/api/challenges")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((challenge) => {
          // Create a delete button only if the current user is the creator
          let deleteButtonHTML = "";
          if (currentUserId && challenge.creator_id == currentUserId) {
            deleteButtonHTML = `
            <p></p>
              <button class="btn btn-danger delete-challenge" data-challenge-id="${challenge.challenge_id}">
                Delete Challenge
              </button>
            `;
          }

          const card = `
            <div class="col-md-4 mb-4">
              <div class="card shadow p-3">
                <div class="card-body">
                  <img src="challenge-images/challenge_${challenge.challenge_id}.png" alt="${challenge.challenge}" class="img-fluid mb-3" style="max-height: 150px;" onerror="this.onerror=null; this.src='challenge-images/challenge_new.png';">
                  <h5 class="card-title">${challenge.challenge}</h5>
                  <p class="card-text"><strong>Challenge ID:</strong> ${challenge.challenge_id}</p>
                  <p class="card-text"><strong>Creator Name & id:</strong> ${challenge.creator_name} | ${challenge.creator_id}</p>
                  <p class="card-text"><strong>Skill Points:</strong> ${challenge.skillpoints}</p>
                  <button class="btn btn-custom complete-challenge" data-challenge-id="${challenge.challenge_id}">Start Challenge</button>
                  ${deleteButtonHTML}
                </div>
              </div>
            </div>
          `;
          challengeList.innerHTML += card; 
        });


        const completeButtons = document.querySelectorAll(".complete-challenge");
        completeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const challengeId = this.getAttribute("data-challenge-id");
            completeChallenge(challengeId);
          });
        });


        const deleteButtons = document.querySelectorAll(".delete-challenge");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const challengeId = this.getAttribute("data-challenge-id");

            if (confirm("Are you sure you want to delete this challenge?")) {
              deleteChallenge(challengeId);
            }
          });
        });
      } else {
        console.error("Challenge data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching challenge data:", error);
    });
});

// Function to handle redirection when completing a challenge
function completeChallenge(challengeId) {
  window.location.href = `challengeinfo.html?challenge_id=${challengeId}`;
}

// Function to delete a challenge
function deleteChallenge(challengeId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to delete a challenge.");
    return;
  }

  fetch(`http://localhost:3000/api/challenges/${challengeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 204) {
        alert("Challenge deleted successfully.");
        // Optionally, refresh the page or remove the deleted card from the DOM.
        window.location.reload();
      } else {
        // If not 204, try to read the error message
        return response.json().then((data) => {
          throw new Error(data.message || data.error || "Failed to delete challenge.");
        });
      }
    })
    .catch((error) => {
      console.error("Error deleting challenge:", error);
      alert(error.message);
    });
}
