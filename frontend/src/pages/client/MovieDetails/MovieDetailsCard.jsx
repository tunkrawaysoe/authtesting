import { useDispatch, useSelector } from "react-redux";
import { fetchWatchList } from "../../../redux/watchListSlice";
import api from "../../../lib/axios";

const MovieDetailsCard = ({ movieId }) => {
  const movieDetails = useSelector((state) => state.movie.item);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const watchlist = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  const addedToWatchList = watchlist?.some(
    (list) => list.id === Number(movieId),
  );

  async function handleWatchList() {
    try {
      if (!addedToWatchList) {
        await api.post(`/watchlist/${movieDetails.id}`);
        dispatch(fetchWatchList(accessToken));
        return;
      }

      await api.delete(`/watchlist/${movieDetails.id}`);
      dispatch(fetchWatchList(accessToken));
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  }
  return (
    <>
      <section className="movie-details-container">
        <div className="details-image-card">
          <img src={movieDetails.posterUrl} />
        </div>
        <div className="movie-details">
          <h1>{movieDetails.title}</h1>
          <div className="movie-meta">
            {movieDetails.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p className="overview">{movieDetails.description}</p>

          <div className="buttons">
            <button
              onClick={() => {
                document.getElementById("trailers").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              ▶ Watch Trailer
            </button>

            <button className="watchlist" onClick={handleWatchList}>
              {addedToWatchList ? "✓ Added" : "+ Add Watchlist"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetailsCard;
