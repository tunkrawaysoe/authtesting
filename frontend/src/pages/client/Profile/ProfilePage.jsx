import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, fetchUser } from "../../../redux/userSlice";
import "./ProfilePage.css";
import { logOut } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";

const ProfilePage = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      dispatch(logOut());
      dispatch(clearProfile());
      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message,
      );
    }
  }
  useEffect(() => {
    if (!accessToken) {
      dispatch(clearProfile());
      return;
    }
    dispatch(fetchUser(accessToken));
  }, [accessToken, dispatch]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!user) {
    return <div>Guest</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h1>{user.name}</h1>
        <p className="username">@{user.username}</p>

        <div className="profile-info">
          <div className="info-item">
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className="info-item">
            <span>Phone</span>
            <p>{user.phoneNumber}</p>
          </div>

          <div className="info-item">
            <span>Joined</span>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <h2>{user._count.watchlists}</h2>
            <span>Watchlist</span>
          </div>

          <div className="stat">
            <h2>{user._count.reviews}</h2>
            <span>Reviews</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
