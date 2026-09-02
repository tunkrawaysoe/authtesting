import { useEffect, useState } from "react";
import MovieSection from "../../../components/MovieCardSection";
import MainCardSection from "../../../components/MainCardSection";
import Hero from "./Hero";
import "./Home.css";
import api from "../../../lib/axios";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  async function fetchMovies() {
    const [popularResponse, topRatedResponse] = await Promise.all([
      api.get("/movies/popular"),
      api.get("/movies/top-rated"),
    ]);

    setPopularMovies(popularResponse.data);
    setTopRatedMovies(topRatedResponse.data);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <Hero />
      <div className="section">
        <MovieSection movies={popularMovies} title="Popular Movies" />
        <MovieSection movies={topRatedMovies} title="Top Rated Movies" />
        <MainCardSection />
      </div>
    </>
  );
}
