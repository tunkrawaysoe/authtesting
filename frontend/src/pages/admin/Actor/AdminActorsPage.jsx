import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors, removeActor } from "../../../redux/actorSlice";
import { useNavigate } from "react-router-dom";
import PersonTable from "../../../components/admin/PersonTable";
import api from "../../../lib/axios";

const AdminActorsPage = () => {
  const actors = useSelector((state) => state.actor.items);
  const loading = useSelector((state) => state.actor.loading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  async function deleteActor(actorId) {
    if (!actorId) return;

    try {
      await api.delete(`/actors/${actorId}`);
      dispatch(removeActor(actorId));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <PersonTable
      mode="Actors"
      loading={loading}
      people={actors}
      onDelete={deleteActor}
    />
  );
};

export default AdminActorsPage;
