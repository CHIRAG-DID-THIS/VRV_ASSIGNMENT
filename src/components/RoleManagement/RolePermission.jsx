import React from "react";

const RolePermissions = ({ permissions, onAdd, onRemove }) => {
  return (
    <div>
      <h4 className="font-bold mb-4">Manage Permissions</h4>
      <ul>
        {permissions.map((perm, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {perm}
            <button
              type="button"
              onClick={() => onRemove(perm)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onAdd}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Permission
      </button>
    </div>
  );
};

export default RolePermissions;
