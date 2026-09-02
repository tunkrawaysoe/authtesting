import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../../redux/movieSlice";
import { useNavigate } from "react-router-dom";
import "./AdminMoviesPage.css";
import api from "../../../lib/axios";

export default function AdminMoviesPage() {
  const movies = useSelector((state) => state.movie.items);
  const loading = useSelector((state) => state.movie.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deleteMovie(movieId) {
    if (!movieId) return;

    try {
      await api.delete(`/admin/movies/${movieId}`);

      dispatch(fetchMovies());
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  function addMovie() {
    navigate("/admin/movie/create");
  }
  return (
    <div className="admin-movies">
      <div className="page-header">
        <div className="page-title">
          <h1>Movies</h1>
          <p>Manage all movies in your library.</p>
        </div>

        <div className="page-actions">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
          />

          <button className="add-btn" onClick={addMovie}>
            Add Movie
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Genres</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <img
                    src={movie.posterUrl || null}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td>{movie.movieGenres.join(", ")}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/movie/edit/${movie.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMovie(movie.id)}
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
}
