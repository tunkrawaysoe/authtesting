import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../../redux/userSlice";
import "./AdminUsersPage.css";
import api from "../../../lib/axios";
const AdminUsersPage = () => {
  const users = useSelector((state) => state.user.items);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  async function deleteUser(userId) {
    try {
      await api.delete(`/admin/users/${userId}`);
      dispatch(removeUser(userId));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="admin-users">
      <div className="page-header">
        <div className="page-title">
          <h1>Users</h1>
          <p>Manage registered users.</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search users..."
        />
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.username}</td>

                <td>{user.email}</td>

                <td>
                  {user.roles
                    ?.map((role) =>
                      role
                        .toLowerCase()
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" "),
                    )
                    .join(", ")}
                </td>

                <td>
                  <button className="edit-btn">Edit</button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
