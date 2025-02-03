// checkLogin.js

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    
    // Get all the buttons that should show an alert if the user is not logged in
    const restrictedButtons = [
        "challenges.html", 
        "backpack.html", 
        "rods.html", 
    ];

    restrictedButtons.forEach(button => {
        const buttonElement = document.querySelector(`a[href='${button}']`);
        if (buttonElement) {
            buttonElement.addEventListener("click", function(event) {
                if (!token) {
                    event.preventDefault(); // Prevent navigation
                    alert("You are not logged in. Please login to continue.");
                }
            });
        }
    });
    
    const restrictedPages = [
      "challenges.html",
      "backpack.html",
      "rods.html",
      "fishing.html",
      "profile.html",
    ];
  
    // Get the current page filename
    const currentPage = window.location.pathname.split("/").pop();
  
    // Check if the current page is restricted
    if (restrictedPages.includes(currentPage)) {

      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("You must login to access this page.");
        window.location.href = "login.html";
      }
    }
  });

  //
document.addEventListener("DOMContentLoaded", function () {
    const restrictedCards = document.querySelectorAll(
    '.card a[href="challenges.html"], .card a[href="backpack.html"], .card a[href="rods.html"], .card a[href="fishing.html"]'
    );

    restrictedCards.forEach((cardLink) => {
    cardLink.addEventListener("click", function (event) {
        const token = localStorage.getItem("token");

        if (!token) {
        // User is not logged in, prevent default behavior and show alert
        event.preventDefault();
        alert("You must login to access this page.");
        window.location.href = "login.html";
        }
    });
    });
});

