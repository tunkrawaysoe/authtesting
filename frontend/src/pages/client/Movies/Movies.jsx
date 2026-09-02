import { useEffect, useState } from "react";
import { MainCard } from "../../../components/MainCard";
import PaginationButton from "../../../components/PaginationButton";
import api from "../../../lib/axios";
import "./Movies.css";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const totalPagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  async function fetchAllData() {
    try {
      const response = await api.get(`/movies?page=${page}`);

      setAllMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  useEffect(() => {
    fetchAllData();
  }, [page]);

  return (
    <>
      <MainCard movies={allMovies} title={"Movies"} />
      <PaginationButton
        totalPagesArray={totalPagesArray}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
