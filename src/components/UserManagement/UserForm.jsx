import React, { useState } from "react";

const UserForm = ({ user = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    role: user.role || "",
    status: user.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
