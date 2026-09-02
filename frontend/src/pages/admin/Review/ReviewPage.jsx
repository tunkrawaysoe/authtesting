import React, { useEffect, useState } from "react";
import api from "../../../lib/axios";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function deleteReview(reviewId) {
    if (!reviewId) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId),
      );
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await api.get("/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-reviews">
      <div className="page-header">
        <div className="page-title">
          <h1>Reviews</h1>
          <p>Manage user reviews.</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search reviews..."
        />
      </div>

      <div className="table-container">
        <table className="review-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Movie</th>
              <th>User</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.movieTitle}</td>
                <td>{review.userName}</td>
                <td>{"⭐".repeat(review.rating)}</td>
                <td>{review.comment}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteReview(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewPage;
