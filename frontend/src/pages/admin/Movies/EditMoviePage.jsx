import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovie } from "../../../redux/movieSlice";
import CreateAndEditForm from "../../../components/admin/CreateAndEditForm";
import api from "../../../lib/axios";

const EditMoviePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieDetails = useSelector((state) => state.movie.item);
  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    duration: "",
    posterUrl: "",
    backdropUrl: "",
    language: "",
    genreIds: [],
    actors: [],
    directorIds: [],
  });

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!movieDetails) return;

    setForm({
      title: movieDetails.title || "",
      description: movieDetails.description || "",
      releaseDate: movieDetails.releaseDate
        ? movieDetails.releaseDate.slice(0, 10)
        : "",
      duration: movieDetails.duration || "",
      posterUrl: movieDetails.posterUrl || "",
      backdropUrl: movieDetails.backdropUrl || "",
      language: movieDetails.language || "",

      genreIds: movieDetails.genres
        ? movieDetails.genres.map((genre) => genre.id)
        : [],

      actors: movieDetails.actors
        ? movieDetails.actors.map((actor) => ({
            actorId: actor.id,
            characterName: actor.characterName,
          }))
        : [],

      directorIds: movieDetails.directors
        ? movieDetails.directors.map((director) => director.id)
        : [],
    });
  }, [movieDetails]);

  const updateMovie = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/admin/movies/${id}`, form);

      navigate("/admin/movies");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <CreateAndEditForm
      submitForm={updateMovie}
      title={"Edit Movie"}
      form={form}
      setForm={setForm}
    />
  );
};

export default EditMoviePage;
