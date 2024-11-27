import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h3 className="font-bold text-lg">{user.name}</h3>
      <p className="mt-2">Role: {user.role}</p>
      <p>Status: {user.status}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
