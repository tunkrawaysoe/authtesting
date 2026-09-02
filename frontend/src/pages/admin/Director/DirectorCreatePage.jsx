import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DirectorForm from "../../../components/admin/DirectorForm";
import api from "../../../lib/axios";
const DirectorCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    biography: "",
    birthDate: "",
  });

  async function createDirector(e) {
    e.preventDefault();

    console.log(form);

    try {
      await api.post("/directors", form);
      navigate("/admin/directors");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <DirectorForm
      mode="Create"
      submitFunction={createDirector}
      form={form}
      setForm={setForm}
    />
  );
};

export default DirectorCreatePage;
