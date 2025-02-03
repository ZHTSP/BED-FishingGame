document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserId = getLoggedInUserId(); // Get the logged-in user's ID

  if (!loggedInUserId) {
    alert("You must be logged in to view this page.");
    window.location.href = "login.html"; // Redirect to login page
    return;
  }

  fetch("http://localhost:3000/api/userrods")
    .then((response) => response.json())
    .then((userRods) => {
      const userRodList = document.getElementById("userRodsList");
      userRodList.innerHTML = ""; // Clear previous content

      const groupedUsers = {};

      // Group rods by username
      userRods.forEach((entry) => {
        if (!groupedUsers[entry.username]) {
          groupedUsers[entry.username] = [];
        }
        groupedUsers[entry.username].push(entry);
      });

      Object.keys(groupedUsers).forEach((username) => {
        const userSection = document.createElement("div");
        userSection.className = "col-12 mb-4";

        userSection.innerHTML = `
          <div class="card shadow">
            <div class="card-header text-center bg-black text-white">
              <h5>${username}'s Rods</h5>
            </div>
            <div class="card-body row"></div>
          </div>
        `;

        const userCardBody = userSection.querySelector(".card-body");
        groupedUsers[username].forEach((rod) => {
          const rodCard = document.createElement("div");
          rodCard.className = "col-md-4 mb-3";

          // Only add the delete button if durability is 0 and the rod belongs to the logged-in user
          const deleteButtonHTML =
            rod.durability === 0 && rod.user_id === loggedInUserId
              ? `<button class="btn btn-custom delete-rod-btn" data-rod-id="${rod.rod_id}" data-username="${username}">Delete Rod</button>`
              : "";

          rodCard.innerHTML = `
            <div class="card border-dark">
              <div class="card-body text-center">
                <img src="rod-images/rod_${rod.rod_id}.png" alt="${rod.rod_name}" class="img-fluid mb-3" style="max-height: 150px;">
                <h6 class="card-title">${rod.rod_name}</h6>
                <p class="card-text"><strong>Durability:</strong> ${rod.durability}</p>
                ${deleteButtonHTML}
              </div>
            </div>
          `;

          // Add event listener to delete button if present
          if (rod.durability === 0 && rod.user_id === loggedInUserId) {
            const deleteButton = rodCard.querySelector(".delete-rod-btn");
            deleteButton.addEventListener("click", function () {
              const userId = rod.user_id;
              const rodId = rod.rod_id;
              const rodName = rod.rod_name;
              deleteRod(userId, rodId, rodCard, rodName);
            });
          }

          userCardBody.appendChild(rodCard);
        });

        userRodList.appendChild(userSection);
      });
    })
    .catch((error) => console.error("Error fetching user rods:", error));
});

// Function to get the logged-in user's ID from the JWT token
function getLoggedInUserId() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return payload.userId;
}

// Function to delete a rod
function deleteRod(userId, rodId, rodCard, rodName) {
  const url = `http://localhost:3000/api/rods/${userId}/${rodId}`;

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token for authentication
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("You are not authorized to delete this rod.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === "Rod deleted successfully") {
        alert(`${rodName} has been deleted due to 0 durability.`);
        rodCard.remove(); // Remove the rod card from the DOM
        window.location.reload();
      } else {
        alert("Delete rod: " + data.message);
        window.location.reload();
      }
    })
    .catch((error) => {
      alert(error.message);
      console.error("Error deleting rod:", error);
    });
}