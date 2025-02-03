document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (!token) {
      console.error("No token found. User is not logged in.");
      return;
  }

  // Fetch the rods available in the game
  fetch("http://localhost:3000/api/rods")
      .then((response) => response.json())
      .then((rods) => {
          const rodList = document.getElementById("rodList");
          const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
          const currentUsername = payload.username; // Assuming username is in the JWT payload

          rods.forEach((rod) => {
              const rodCard = document.createElement("div");
              rodCard.className = "col-md-4 mb-4";

              rodCard.innerHTML = `
                  <div class="card shadow">
                      <div class="card-body text-center">
                      <img src="rod-images/rod_${rod.rod_id}.png" alt="${rod.rod_name}" class="img-fluid mb-3" style="max-height: 150px;">
                          <h5 class="card-title">${rod.rod_name}</h5>
                          <p class="card-text"><strong>Durability:</strong> ${rod.durability}</p>
                          <p class="card-text"><strong>Required Skill Points:</strong> ${rod.required_skillpoints}</p>
                          <button class="btn btn-custom purchase-btn" data-rod-id="${rod.rod_id}">Purchase Rod</button>
                      </div>
                  </div>
              `;

              rodList.appendChild(rodCard);
          });

          // Attach event listeners to purchase buttons
          const purchaseButtons = document.querySelectorAll(".purchase-btn");
          purchaseButtons.forEach((button) => {
              button.addEventListener("click", function () {
                  const rodId = button.getAttribute("data-rod-id");

                  // Perform purchase request
                  fetch(`http://localhost:3000/api/rods/purchase/${rodId}`, {
                      method: "POST",
                      headers: {
                          "Authorization": `Bearer ${token}`,
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                          username: currentUsername
                      })
                  })
                  .then((response) => response.json())
                  .then((data) => {
                      if (data.success) {
                          alert(`Successfully purchased ${data.rod_name}!`);
                          window.location.reload();
                      } else {
                          alert(`Purchase rod: ${data.message}`);
                          window.location.reload();
                      }
                  })
                  .catch((error) => {
                      console.error("Error purchasing rod:", error);
                      alert("An error occurred while purchasing the rod.");
                  });
              });
          });

      })
      .catch((error) => console.error("Error fetching rod data:", error));
});
