import React, { useState, useEffect } from "react";
import axios from "axios";

const PermissionsPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

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

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handlePermissionToggle = async (permission) => {
    if (selectedRole) {
      const updatedPermissions = selectedRole.permissions?.includes(permission)
        ? selectedRole.permissions.filter((perm) => perm !== permission)
        : [...(selectedRole.permissions || []), permission];

      const updatedRole = { ...selectedRole, permissions: updatedPermissions };

      try {
        await axios.put(`http://localhost:5000/roles/${selectedRole.id}`, updatedRole);

        setRoles(
          roles.map((role) => (role.id === selectedRole.id ? updatedRole : role))
        );
        setSelectedRole(updatedRole);
      } catch (error) {
        console.error("Error updating permissions:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Permissions Management</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => handleRoleSelect(role)}
            className={`p-4 rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 ${
              selectedRole?.id === role.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <h3 className="text-lg font-bold">{role.name}</h3>
          </div>
        ))}
      </div>

      {selectedRole && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Manage Permissions for <span className="text-blue-600">{selectedRole.name}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {["Read", "Write", "Delete", "Update", "View Reports"].map((permission) => (
              <div
                key={permission}
                className="flex items-center p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedRole.permissions?.includes(permission) || false} // Safe check
                  onChange={() => handlePermissionToggle(permission)}
                  className="w-5 h-5 mr-3 accent-blue-500 cursor-pointer"
                />
                <label className="text-gray-800 font-medium">{permission}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPage;
