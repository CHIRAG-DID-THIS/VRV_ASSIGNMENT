import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeRoles: 0,
    permissionsGranted: 0,
    pendingRequests: 0,
  });
  const [userStatusData, setUserStatusData] = useState({
    labels: [],
    datasets: [],
  });
  const [rolePermissionData, setRolePermissionData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:5000/users");
        const rolesResponse = await axios.get("http://localhost:5000/roles");

        const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
        const roles = Array.isArray(rolesResponse.data) ? rolesResponse.data : [];

        const userStatusCounts = users.reduce((acc, user) => {
          acc[user.status] = (acc[user.status] || 0) + 1;
          return acc;
        }, {});

        const rolePermissionCounts = roles.map((role) => ({
          role: role.name,
          count: role.permissions ? role.permissions.length : 0,
        }));

        setStats({
          totalUsers: users.length,
          activeRoles: roles.length,
          permissionsGranted: rolePermissionCounts.reduce(
            (acc, item) => acc + item.count,
            0
          ),
          pendingRequests: userStatusCounts["Pending"] || 0,
        });

        setUserStatusData({
          labels: Object.keys(userStatusCounts),
          datasets: [
            {
              data: Object.values(userStatusCounts),
              backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
            },
          ],
        });

        setRolePermissionData({
          labels: rolePermissionCounts.map((item) => item.role),
          datasets: [
            {
              label: "Permissions per Role",
              data: rolePermissionCounts.map((item) => item.count),
              backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="card">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-2xl mt-2">{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold">Active Roles</h3>
          <p className="text-2xl mt-2">{stats.activeRoles}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold">Permissions Granted</h3>
          <p className="text-2xl mt-2">{stats.permissionsGranted}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-bold">Pending Requests</h3>
          <p className="text-2xl mt-2">{stats.pendingRequests}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">User Status Distribution</h3>
          <Pie data={userStatusData} />
        </div>
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Permissions by Role</h3>
          <Bar data={rolePermissionData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
