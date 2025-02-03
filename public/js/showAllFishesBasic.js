document.addEventListener("DOMContentLoaded", function () {
  const fishList = document.getElementById("fishList");

  // Fetch fish data from the API
  fetch("http://localhost:3000/api/fish")
    .then((response) => response.json())
    .then((data) => {
      // Check if data is an array
      if (Array.isArray(data)) {
        // Loop through the fish data and create cards
        data.forEach((fish) => {
          const card = `
            <div class="col-md-4 mb-4">
              <div class="card shadow p-3">
                <div class="card-body">
                  <img src="fish-images/fish_${fish.fish_id}.png" alt="${fish.fish_name}" class="img-fluid mb-3" style="max-height: 150px;">
                  <h5 class="card-title">${fish.fish_name}</h5>
                  <p class="card-text"><strong>Fish ID:</strong> ${fish.fish_id}</p>
                  <p class="card-text"><strong>Size:</strong> ${fish.size}</p>
                </div>
              </div>
            </div>
          `;
          fishList.innerHTML += card; // Append the card to the fish list
        });
      } else {
        console.error("Fish data is not an array:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching fish data:", error);
    });
});