import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Use Font Awesome for chevrons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <button
        className={`absolute top-1/2 -translate-y-1/2 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "left-[250px]" : "left-2"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <aside
        className={`sidebar fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ${
          isOpen ? "w-[250px]" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4 font-bold text-center bg-blue-700">RBAC UI</div>
        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-blue-600 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="block py-2 px-4 hover:bg-blue-600 rounded">
              Users
            </Link>
          </li>
          <li>
            <Link to="/roles" className="block py-2 px-4 hover:bg-blue-600 rounded">
              Roles
            </Link>
          </li>
          <li>
            <Link to="/permissions" className="block py-2 px-4 hover:bg-blue-600 rounded">
              Permissions
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
