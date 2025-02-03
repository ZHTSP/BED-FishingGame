document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const fishCountMessage = document.getElementById("fishCountMessage");
    const heaviestFishCard = document.getElementById("heaviestFishCard");
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. User is not logged in.");
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const currentUserId = payload.userId; // Extract userId
    const currentUsername = payload.username; // Extract username
    
    // Display welcome message with username
    welcomeMessage.innerHTML = `Welcome ${currentUsername}<br><h4>Your User Id is: ${currentUserId}<h4>`;


    // Fetch user's fish data
    fetch("http://localhost:3000/api/backpack", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (!Array.isArray(data)) {
                console.error("Backpack data is not an array:", data);
                return;
            }

            // Filter the fishes for the current user
            const userFishes = data.filter(fish => fish.user_id === currentUserId);

            // Display total fish count for the current user
            fishCountMessage.textContent = `You currently have ${userFishes.length} fish${userFishes.length === 1 ? '' : 'es'}. `;
            fishCountMessage.style.fontSize = "24px";

            if (userFishes.length > 0) {
                // Find the heaviest fish by comparing the size
                const heaviestFish = userFishes.reduce((maxFish, fish) => 
                    fish.size > maxFish.size ? fish : maxFish, userFishes[0]);

                // Display heaviest fish in a card format
                const heaviestFishHTML = `
                    <div class="card shadow mt-4" style="max-width: 18rem;">
                        <img src="fish-images/fish_${heaviestFish.fish_id}.png" class="card-img-top" alt="${heaviestFish.fish_name}">
                        <div class="card-body">
                            <h5 class="card-title">${heaviestFish.fish_name}</h5>
                            <p class="card-text"><strong>Size:</strong> ${heaviestFish.size}</p>
                            <p class="card-text"><strong>Caught by:</strong> ${heaviestFish.username}</p>
                            <p class="card-text"><strong>Your user ID is: ${currentUserId}</p>
                        </div>
                    </div>
                `;
                heaviestFishCard.innerHTML = heaviestFishHTML;
            } else {
                heaviestFishCard.innerHTML = "<p>No fishes caught yet!</p>";
            }

        })
        .catch((error) => {
            console.error("Error fetching backpack data:", error);
        });
});
