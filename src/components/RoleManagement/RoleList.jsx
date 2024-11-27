import React from "react";

const RoleList = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <div key={role.id} className="card">
          <h3 className="font-bold text-lg">{role.name}</h3>
          <p className="mt-2">
            Permissions:{" "}
            <span className="font-semibold">
              {role.permissions ? role.permissions.length : 0}
            </span>
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => onEdit(role)}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(role.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleList;
