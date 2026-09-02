import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreForm from "../../../components/admin/GenreForm";
import api from "../../../lib/axios";

const GrenreCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();

  async function createGenre(e) {
    e.preventDefault();

    try {
      await api.post("/genres", form);
      navigate("/admin/genres");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  return (
    <GenreForm
      mode="Create"
      submitFunction={createGenre}
      form={form}
      setForm={setForm}
    />
  );
};

export default GrenreCreatePage;
