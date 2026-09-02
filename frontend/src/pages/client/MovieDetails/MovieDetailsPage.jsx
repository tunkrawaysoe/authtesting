import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../../redux/movieSlice";
import ActorCard from "./ActorCard";
import ReviewSection from "./ReviewSection";
import TrailerSection from "./TrailerSection";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieSection from "../../../components/MovieCardSection";
import "./MovieDetails.css";
import api from "../../../lib/axios";

const MovieDetails = () => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [userReviewed, setUserReviewed] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  async function getReviews() {
    try {
      const response = await api.get(`/movies/${id}/reviews`);
      setReviews(response.data.reviews);
      setUserReviewed(response.data.userReviewed);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const [similarMoviesResponse, trailerResponse] = await Promise.all([
          api.get(`/movies/${id}/similar`),
          api.get(`/movies/${id}/trailer`),
        ]);

        setSimilarMovies(similarMoviesResponse.data);
        setTrailers(trailerResponse.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    }
    dispatch(fetchMovie(id));
    fetchMovieDetails();
    getReviews();
  }, [id]);

  return (
    <div className="section">
      <MovieDetailsCard movieId={id} />
      <ActorCard />
      <TrailerSection trailers={trailers} />
      <ReviewSection
        reviews={reviews}
        userReviewed={userReviewed}
        movieId={id}
        getReviews={getReviews}
      />
      <MovieSection movies={similarMovies} title="Similar Movies" />
    </div>
  );
};

export default MovieDetails;
