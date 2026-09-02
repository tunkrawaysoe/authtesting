import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDirectors, removeDirector } from "../../../redux/directorSlice";
import PersonTable from "../../../components/admin/PersonTable";
import api from "../../../lib/axios";

const DirectorPage = () => {
  const directors = useSelector((state) => state.director.items);
  const loading = useSelector((state) => state.director.loading);
  const dispatch = useDispatch();

  async function deleteDirector(directorId) {
    try {
      await api.delete(`/directors/${directorId}`);
      dispatch(removeDirector(directorId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete");
    }
  }

  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;
  return (
    <PersonTable
      mode="Directors"
      people={directors}
      loading={loading}
      onDelete={deleteDirector}
    />
  );
};

export default DirectorPage;
