document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");

  // Fetch and display existing reviews
  fetchReviews();

  // Handle form submission for new reviews
  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitReview();
  });
});

function fetchReviews() {
  fetch("http://localhost:3000/api/review")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((reviews) => {
      displayReviews(reviews);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
}

function displayReviews(reviews) {
  const reviewList = document.getElementById("reviewList");

  if (reviews.length === 0) {
    reviewList.innerHTML = "<p>No reviews found.</p>";
    return;
  }

  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = payload ? payload.userId : null;

  const reviewsHTML = reviews
    .map(
      (review) => `
      <div class="col-md-4 mb-4">
        <div class="card shadow p-3">
          <div class="card-body">
            <h5 class="card-title">${review.username}</h5>
            <h6 class="card-title">User id: ${review.user_id}</h5>
            <p class="card-text">
              <strong>Rating:</strong> ${review.review_amt} <br>
              <strong>Initial review Date:</strong> ${review.created_at}
            </p>
            ${
              userId === review.user_id
                ? `
                <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id})">Delete</button>
                <button class="btn btn-warning btn-sm" onclick="editReview(${review.id}, ${review.review_amt})">Edit</button>
                `
                : ""
            }
          </div>
        </div>
      </div>
    `
    )
    .join("");

  reviewList.innerHTML = reviewsHTML;
}

function submitReview() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to submit a review.");
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  const reviewAmount = document.getElementById("reviewAmount").value;

  if (reviewAmount < 1 || reviewAmount > 5) {
    alert("Rating must be between 1 and 5.");
    return;
  }

  const requestBody = {
    user_id: userId,
    review_amt: parseInt(reviewAmount),
  };

  fetch("http://localhost:3000/api/review", {
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
      console.log("Review submitted successfully:", data);
      alert("Review submitted successfully!");
      fetchReviews(); // Refresh the reviews list
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Failed to submit review, each account can only submit 1 review.");
    });
}

function deleteReview(reviewId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to delete a review.");
    return;
  }

  if (!confirm("Are you sure you want to delete this review?")) {
    return;
  }

  fetch(`http://localhost:3000/api/review/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Review deleted successfully:", data);
      alert("Review deleted successfully!");
      fetchReviews(); 
    })
    .catch((error) => {
      console.error("Error deleting review:", error);
      alert("Review deleted.");
    });
}

function editReview(reviewId, currentRating) {
  const editFormHTML = `
    <div class="edit-review-form">
      <h3>Edit Review</h3>
      <form id="editReviewForm">
        <div class="mb-3">
          <label for="editReviewAmount" class="form-label">Rating (1-5)</label>
          <input type="number" class="form-control" id="editReviewAmount" min="1" max="5" value="${currentRating}" required>
        </div>
        <button type="submit" class="btn btn-primary">Update Review</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
      </form>
    </div>
  `;

  const reviewCard = document.querySelector(`[onclick*="editReview(${reviewId}"]`).closest('.card-body');
  reviewCard.innerHTML = editFormHTML;

  document.getElementById("editReviewForm").addEventListener("submit", function (event) {
    event.preventDefault();
    updateReview(reviewId);
  });
}

function updateReview(reviewId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to update a review.");
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.userId;

  const reviewAmount = document.getElementById("editReviewAmount").value;

  if (reviewAmount < 1 || reviewAmount > 5) {
    alert("Rating must be between 1 and 5.");
    return;
  }

  const requestBody = {
    user_id: userId,
    review_amt: parseInt(reviewAmount),
  };

  fetch(`http://localhost:3000/api/review/${reviewId}`, {
    method: "PUT",
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
      console.log("Review updated successfully:", data);
      alert("Review updated successfully!");
      fetchReviews();
    })
    .catch((error) => {
      alert("Review updated!");
      fetchReviews();
    });
}

function cancelEdit() {
  fetchReviews(); // Refresh the reviews list to cancel the edit
}