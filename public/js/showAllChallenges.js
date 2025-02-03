document.addEventListener("DOMContentLoaded", function () {
  const challengeList = document.getElementById("challengeList");

  // Fetch challenge data from the API
  fetch("http://localhost:3000/api/challenges")
    .then((response) => response.json())
    .then((data) => {
      // Check if data is an array
      if (Array.isArray(data)) {
        // Loop through the challenge data and create cards
        data.forEach((challenge) => {
          const card = `
            <div class="col-md-4 mb-4">
              <div class="card shadow p-3">
                <div class="card-body">
                  <img src="challenge-images/challenge_${challenge.challenge_id}.png" alt="${challenge.challenge}" class="img-fluid mb-3" style="max-height: 150px;">
                  <h5 class="card-title">${challenge.challenge}</h5>
                  <p class="card-text"><strong>Challenge ID:</strong> ${challenge.challenge_id}</p>
                  <p class="card-text"><strong>Creator ID:</strong> ${challenge.creator_id}</p>
                  <p class="card-text"><strong>Skill Points:</strong> ${challenge.skillpoints}</p>
                  <button class="btn btn-custom complete-challenge" data-challenge-id="${challenge.challenge_id}">Complete Challenge</button>
                </div>
              </div>
            </div>
          `;
          challengeList.innerHTML += card; // Append the card to the challenge list
        });

        // Add event listeners to the "Complete Challenge" buttons
        const completeButtons = document.querySelectorAll(".complete-challenge");
        completeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const challengeId = this.getAttribute("data-challenge-id");
            completeChallenge(challengeId);
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

function completeChallenge(challengeId) {
  // Redirect to challengeinfo.html with the challenge ID as a query parameter
  window.location.href = `challengeinfo.html?challenge_id=${challengeId}`;
}