document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  // Get the current page filename without query parameters
  const currentPage = window.location.pathname.split("/").pop().split("?")[0];

  // Pages that require login
  const restrictedPages = [
      "challenges.html",
      "backpack.html",
      "rods.html",
      "fishing.html",
      "profile.html",
      "challengeinfo.html"
  ];

  // Check if the user is trying to access challengeinfo.html with a challenge_id
  const urlParams = new URLSearchParams(window.location.search);
  const isChallengeInfoPage = currentPage === "challengeinfo.html" || urlParams.has("challenge_id");

  if ((!token && restrictedPages.includes(currentPage)) || (!token && isChallengeInfoPage)) {
      alert("You must login to access this page.");
      window.location.href = "login.html";
  }

  // Prevent users from clicking certain links if not logged in
  const restrictedButtons = [
      "challenges.html",
      "backpack.html",
      "rods.html",
      "reviews.html",
      "fishing.html",
      "challengeinfo.html"
  ];

  restrictedButtons.forEach(button => {
      const buttonElement = document.querySelector(`a[href='${button}']`);
      if (buttonElement) {
          buttonElement.addEventListener("click", function(event) {
              if (!token) {
                  event.preventDefault();
                  alert("You are not logged in. Please login to continue.");
              }
          });
      }
  });

  // check login for cards
  const restrictedCards = document.querySelectorAll(
      '.card a[href="challenges.html"], .card a[href="backpack.html"], .card a[href="rods.html"], .card a[href="fishing.html"]'
  );

  restrictedCards.forEach((cardLink) => {
      cardLink.addEventListener("click", function (event) {
          if (!token) {
              event.preventDefault();
              alert("You must login to access this page.");
              window.location.href = "login.html";
          }
      });
  });
});
