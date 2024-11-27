import React from "react";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">RBAC UI</h1>
      <button className="bg-blue-600 py-2 px-4 rounded-lg">Logout</button>
    </header>
  );
};

export default Navbar;
