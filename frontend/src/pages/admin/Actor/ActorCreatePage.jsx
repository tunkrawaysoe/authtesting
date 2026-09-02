import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAndEditActor from "../../../components/admin/CreateAndEditActor";
import api from "../../../lib/axios";

const ActorCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    profileImage: "",
    biography: "",
    birthDate: "",
  });

  async function createActor(e) {
    e.preventDefault();

    try {
      await api.post("/actors", form);
      navigate("/admin/actors");
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to create actor");
    }
  }

  return (
    <CreateAndEditActor
      form={form}
      setForm={setForm}
      submitFunction={createActor}
      mode="Create"
    />
  );
};

export default ActorCreatePage;
