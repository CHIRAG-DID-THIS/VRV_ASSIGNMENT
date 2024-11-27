import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleList from "../components/RoleManagement/RoleList";
import RoleForm from "../components/RoleManagement/RoleForm";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleAddRole = () => {
    setCurrentRole(null); 
    setModalOpen(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role); 
    setModalOpen(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      const updatedRoles = roles.filter((role) => role.id !== id);
      setRoles(updatedRoles);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleModalSubmit = async (roleData) => {
    if (currentRole) {
      try {
        const response = await axios.put(
          `http://localhost:5000/roles/${currentRole.id}`,
          roleData
        );
        setRoles(roles.map((role) => (role.id === currentRole.id ? response.data : role)));
      } catch (error) {
        console.error("Error updating role:", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/roles", roleData);
        setRoles([...roles, response.data]); 
      } catch (error) {
        console.error("Error adding role:", error);
      }
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Role Management</h1>
      <button
        onClick={handleAddRole}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Role
      </button>
      <RoleList
        roles={roles}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />
      {modalOpen && (
        <RoleForm
          role={currentRole}
          onSubmit={handleModalSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RolesPage;
