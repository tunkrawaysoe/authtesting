import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchActor } from "../../../redux/actorSlice";
import CreateAndEditActor from "../../../components/admin/CreateAndEditActor";
import api from "../../../lib/axios";

const EditActorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const actor = useSelector((state) => state.actor.item);
  const loading = useSelector((state) => state.actor.loading);

  const [form, setForm] = useState({
    name: "",
    profileImage: "",
    biography: "",
    birthDate: "",
  });

  useEffect(() => {
    dispatch(fetchActor(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!actor) return;

    setForm({
      name: actor.name || "",
      profileImage: actor.profileImage || "",
      biography: actor.biography || "",
      birthDate: actor.birthDate ? actor.birthDate.slice(0, 10) : "",
    });
  }, [actor]);

  async function updateActor(e) {
    e.preventDefault();

    try {
      await api.patch(`/actors/${id}`, form);
      navigate("/admin/actors");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update actor.");
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!actor) {
    return <h2>Actor not found.</h2>;
  }

  return (
    <CreateAndEditActor
      form={form}
      setForm={setForm}
      submitFunction={updateActor}
      mode="Edit"
    />
  );
};

export default EditActorPage;
