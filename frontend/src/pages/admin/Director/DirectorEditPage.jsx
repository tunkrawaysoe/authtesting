import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DirectorForm from "../../../components/admin/DirectorForm";
import api from "../../../lib/axios";

const DirectorEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    biography: "",
    birthDate: "",
  });

  useEffect(() => {
    async function fetchDirector() {
      try {
        const response = await api.get(`/directors/${id}`);
        const director = response.data;

        setForm({
          name: director.name || "",
          biography: director.biography || "",
          birthDate: director.birthDate ? director.birthDate.slice(0, 10) : "",
        });
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    }

    fetchDirector();
  }, [id]);

  async function editDirector(e) {
    e.preventDefault();

    const data = {
      ...form,
      birthDate: form.birthDate ? form.birthDate : null,
    };

    try {
      await api.patch(`/directors/${id}`, data);
      navigate("/admin/directors");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <DirectorForm
      mode="Edit"
      submitFunction={editDirector}
      form={form}
      setForm={setForm}
    />
  );
};

export default DirectorEditPage;
