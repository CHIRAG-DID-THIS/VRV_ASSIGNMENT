import React, { useState, useEffect } from "react";

const RoleForm = ({ role, onSubmit, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setPermissions(role.permissions || []);
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: roleName, permissions });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              id="roleName"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="space-y-2 mt-2">
              {["Read", "Write", "Delete", "Update", "View Reports"].map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={permissions.includes(permission)}
                    onChange={() =>
                      setPermissions((prev) =>
                        prev.includes(permission)
                          ? prev.filter((perm) => perm !== permission)
                          : [...prev, permission]
                      )
                    }
                    className="mr-2"
                  />
                  <label>{permission}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              {role ? "Update" : "Add"} Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
