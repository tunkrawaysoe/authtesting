import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GenreForm from "../../../components/admin/GenreForm";
import api from "../../../lib/axios";

const GenreEditPage = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genre.items);
  const genreToEdit = genres.find((genre) => genre.id === Number(id));

  async function editGenre(e) {
    e.preventDefault();

    try {
      await api.patch(`/genres/${id}`, form);
      navigate("/admin/genres");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  useEffect(() => {
    if (!genreToEdit) return;
    setForm({
      name: genreToEdit.name,
    });
  }, [genreToEdit]);

  return (
    <GenreForm
      form={form}
      setForm={setForm}
      submitFunction={editGenre}
      mode="Edit"
    />
  );
};

export default GenreEditPage;
