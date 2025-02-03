document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const challengeId = urlParams.get("challenge_id");
    const editChallengeForm = document.getElementById("editChallengeForm");
    const warningCard = document.getElementById("warningCard-edit");
    const warningText = document.getElementById("warningText-edit");
  
    editChallengeForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const challenge = document.getElementById("challenge").value;
      const skillpoints = document.getElementById("skillpoints").value;
        const data = {
          challenge: challenge,
          skillpoints: skillpoints,
        };
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 201 || responseStatus == 200) {
            editChallengeForm.reset();
              // Redirect or perform further actions for logged-in user
              window.location.href = currentUrl + `/ChallengeInfo.html?challenge_id=${challengeId}`;
          } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message || responseData.error;
          }
        };
  
        // Perform signup request
        fetchMethod(currentUrl + `/api/challenges/${challengeId}`, callback, "PUT", data, localStorage.getItem("token"));
  
        // Reset the form fields
      editChallengeForm.reset();
    
    });
  });