import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGenres, removeGenre } from "../../../redux/GenreSlice";
import api from "../../../lib/axios";
import "./GenrePage.css";

const GenrePage = () => {
  const genres = useSelector((state) => state.genre.items);
  const loading = useSelector((state) => state.genre.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteGenre(genreId) {
    if (!genreId) return;

    try {
      await api.delete(`/genres/${genreId}`);
      dispatch(removeGenre(genreId));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-genres">
      <div className="page-header">
        <div className="page-title">
          <h1>Genres</h1>
          <p>Manage movie genres.</p>
        </div>

        <div className="page-actions">
          <input
            className="search-input"
            type="text"
            placeholder="Search genres..."
          />

          <button
            className="add-btn"
            onClick={() => navigate("/admin/genres/create")}
          >
            Add Genre
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="genre-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.id}</td>
                <td>{genre.name}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/genres/${genre.id}/edit`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteGenre(genre.id)}
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

export default GenrePage;
