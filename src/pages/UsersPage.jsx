import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import UserModal from "../components/UserManagement/UserModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [roles, setRoles] = useState([]); // New state for roles
  const [roleChartData, setRoleChartData] = useState(null);
  const [statusChartData, setStatusChartData] = useState(null);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          axios.get("http://localhost:5000/users"),
          axios.get("http://localhost:5000/roles"),
        ]);

        setUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data);
        setRoles(rolesResponse.data); 

        prepareCharts(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndRoles(); 
  }, []);

  const prepareCharts = (users) => {
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    const roleLabels = Object.keys(roleCounts);
    const roleData = Object.values(roleCounts);

    setRoleChartData({
      labels: roleLabels,
      datasets: [
        {
          label: "Users per Role",
          data: roleData,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FFA726"],
        },
      ],
    });

    // Status Distribution
    const statusCounts = users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});

    const statusLabels = Object.keys(statusCounts);
    const statusData = Object.values(statusCounts);

    setStatusChartData({
      labels: statusLabels,
      datasets: [
        {
          label: "Users per Status",
          data: statusData,
          backgroundColor: ["#4CAF50", "#FFC107", "#F44336", "#2196F3", "#9C27B0"],
        },
      ],
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const term = e.target.value.toLowerCase();
    setFilteredUsers(
      users.filter(
        (user) =>
          (user.name && user.name.toLowerCase().includes(term)) ||
          (user.role && user.role.toLowerCase().includes(term))
      )
    );
  };

  const handleAdd = () => {
    setCurrentUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      prepareCharts(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleModalSubmit = async (user) => {
    if (currentUser) {
      try {
        const response = await axios.put(
          `http://localhost:5000/users/${currentUser.id}`,
          user
        );
        const updatedUsers = users.map((u) =>
          u.id === currentUser.id ? response.data : u
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        prepareCharts(updatedUsers);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/users", user);
        const updatedUsers = [...users, response.data];
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        prepareCharts(updatedUsers);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
      <input
        type="text"
        placeholder="Search by name or role"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full sm:w-1/2"
      />
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 mt-6">
        {roleChartData && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Role Distribution</h2>
            <Bar data={roleChartData} />
          </div>
        )}
        {statusChartData && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Status Distribution</h2>
            <Pie data={statusChartData} />
          </div>
        )}
      </div>

      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        user={currentUser} 
        roles={roles} 
      />
    </div>
  );
};

export default UsersPage;
