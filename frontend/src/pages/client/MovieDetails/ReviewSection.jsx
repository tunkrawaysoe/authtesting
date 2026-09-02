import { useState } from "react";
import { useSelector } from "react-redux";
import { setSocketToken, socket } from "../../../lib/socket.js";
import { useEffect } from "react";
import api from "../../../lib/axios.js";

const ReviewSection = ({ reviews, movieId, getReviews, userReviewed }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);

  async function addReview(e) {
    e.preventDefault();

    try {
      await api.post(`/movies/${movieId}/reviews`, {
        rating,
        comment,
      });

      await getReviews();

      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  }
  useEffect(() => {
    setSocketToken(accessToken);
    socket.connect();
    socket.on("notification", (notification) => {
      console.log(notification);
    });
    return () => {
      socket.disconnect();
    };
  }, [movieId]);

  return (
    <div className="review-container">
      <div className="header">
        <h3 className="title">Reviews</h3>
      </div>
      {!userReviewed && (
        <form className="review-form" onSubmit={addReview}>
          <label>Your Rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <label>Your Review</label>

          <textarea
            rows={5}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-header">
              <img
                src={
                  review.user?.profilePicture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    review.user?.name || "User",
                  )}`
                }
                alt={review.user?.name}
                className="review-avatar"
              />

              <div className="review-info">
                <h4 className="review-name">{review.user?.name}</h4>

                <small className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>

              <span className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(10 - review.rating)}
              </span>
            </div>

            <p className="review-comment">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
