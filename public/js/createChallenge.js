document.addEventListener("DOMContentLoaded", function () {
    const createChallengeForm = document.getElementById("createChallengeForm");
  
    createChallengeForm.addEventListener("submit", function (event) {
      event.preventDefault();
      createChallenge();
    });
  });
  
  function createChallenge() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in to create a challenge.");
      return;
    }
  
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.userId;
  
    const challengeName = document.getElementById("challengeName").value;
    const skillPoints = document.getElementById("skillPointsReward").value;
  
    if (!challengeName || !skillPoints) {
      alert("Please fill in all fields.");
      return;
    }
  
    const requestBody = {
      challenge: challengeName,
      skillpoints: parseInt(skillPoints),
      user_id: userId,
    };
  
    fetch("http://localhost:3000/api/challenges", {
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
        console.log("Challenge created successfully:", data);
        alert("Challenge created successfully!");
        window.location.href = "challenges.html"; 
      })
      .catch((error) => {
        console.error("Error creating challenge:", error);
        alert("Failed to create challenge.");
      });
  }