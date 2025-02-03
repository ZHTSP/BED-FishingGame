document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const skillPointsElement = document.getElementById("skillPoints");

    if (!token) {
        console.error("No token found. User is not logged in.");
        return;
    }

    // Fetch the users data from the API
    fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((users) => {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            const currentUserId = payload.userId;

            // Find the current user by user_id
            const currentUser = users.find(user => user.user_id === currentUserId);

            if (currentUser) {
                // Set the skillpoints in the element
                skillPointsElement.textContent = `Skillpoints: ${currentUser.skillpoints}`;
            } else {
                console.error("Current user not found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
});
