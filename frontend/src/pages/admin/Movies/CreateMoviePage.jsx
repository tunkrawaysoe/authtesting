import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAndEditForm from "../../../components/admin/CreateAndEditForm";
import api from "../../../lib/axios";

const CreateMoviePage = () => {
  const navigate = useNavigate();
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

  async function createMovie(e) {
    e.preventDefault();

    try {
      await api.post("/admin/movies", form);

      navigate("/admin/movies");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  return (
    <CreateAndEditForm
      submitForm={createMovie}
      form={form}
      setForm={setForm}
      title={"Create Movie"}
    />
  );
};

export default CreateMoviePage;
