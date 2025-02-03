document.addEventListener("DOMContentLoaded", function () {
    const fishList = document.getElementById("fishList");
    const myFishesButton = document.getElementById("showMyFishes");
    const allFishesButton = document.getElementById("showAllFishes");

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. User is not logged in.");
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const currentUserId = payload.userId; // Extract userId

    let showOnlyUserFishes = false; 

    function fetchAndRenderFishes() {
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

                fishList.innerHTML = ""; // Clear the list

                const filteredFishes = showOnlyUserFishes
                    ? data.filter(fish => fish.user_id === currentUserId) // Show only user's fish
                    : data; // Show all fish

                filteredFishes.forEach((fish) => {
                    const isOwner = fish.user_id === currentUserId; // Check if fish belongs to the user

                    const card = `
                        <div class="col-md-4 mb-4" id="fish-card-${fish.fish_id}">
                            <div class="card shadow p-3">
                                <div class="card-body">
                                    <img src="fish-images/fish_${fish.fish_id}.png" alt="${fish.fish_name}" class="img-fluid mb-3" style="max-height: 150px;">
                                    <h5 class="card-title">${fish.fish_name}</h5> 
                                    <p class="card-text"><strong>Size:</strong> ${fish.size}</p>
                                    <p class="card-text"><strong>Caught by:</strong> ${fish.username}</p>
                                    <button class="btn btn-danger" ${isOwner ? '' : 'disabled'} onclick="deleteFish(${fish.user_id}, ${fish.fish_id})">
                                        Eat Fish
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    fishList.innerHTML += card;
                });
            })
            .catch((error) => {
                console.error("Error fetching backpack data:", error);
            });
    }

    // Event Listeners for Buttons
    myFishesButton.addEventListener("click", function () {
        showOnlyUserFishes = true;
        fetchAndRenderFishes();
    });

    allFishesButton.addEventListener("click", function () {
        showOnlyUserFishes = false;
        fetchAndRenderFishes();
    });

    fetchAndRenderFishes(); // Initial fetch on page load
});

// Function to handle the delete request
function deleteFish(user_id, fish_id) {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found. User is not logged in.");
        return;
    }

    fetch(`http://localhost:3000/api/backpack/${user_id}/${fish_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Fish deleted from backpack successfully") {
                document.getElementById(`fish-card-${fish_id}`).remove();
                alert("Fish eaten!");
            } else {
                console.error("Error deleting fish:", data);
                alert("Error deleting fish.");
            }
        })
        .catch((error) => {
            console.error("Error deleting fish:", error);
            alert("Error deleting fish.");
        });
}
