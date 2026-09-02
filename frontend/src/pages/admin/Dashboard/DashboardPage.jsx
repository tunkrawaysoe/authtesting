import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import "./Dashboard.css";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get("/admin/dashboard");
        setDashboard(response.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    }

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Movies</h3>
          <h2>{dashboard.stats.movies}</h2>
        </div>

        <div className="stat-card">
          <h3>Users</h3>
          <h2>{dashboard.stats.users}</h2>
        </div>

        <div className="stat-card">
          <h3> Reviews</h3>
          <h2>{dashboard.stats.reviews}</h2>
        </div>

        <div className="stat-card">
          <h3>Watchlists</h3>
          <h2>{dashboard.stats.watchlists}</h2>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Movies</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>

                  <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h2>Recent Users</h2>

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>

                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
