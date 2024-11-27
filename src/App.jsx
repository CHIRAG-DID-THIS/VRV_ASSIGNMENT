import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Shared/Sidebar";
import AppRoutes from "./Routes";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Hide sidebar on smaller screens
      } else {
        setIsSidebarOpen(true); // Show sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
  className={`main-content ${isSidebarOpen ? "sidebar-open" : "full"}`}
>
  <AppRoutes />
</main>

      </div>
    </Router>
  );
};

export default App;
