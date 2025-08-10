import React, { useState, useEffect } from "react";
import { FaUsers, FaSignOutAlt, FaCog, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });

  useEffect(() => {
    // Fetch admin data (dummy example)
    setUsers([
      { id: 1, name: "John Doe", status: "Active" },
      { id: 2, name: "Jane Smith", status: "Blocked" },
    ]);
    setStats({ totalUsers: 2, activeUsers: 1 });
  }, []);

  const handleLogout = () => {
    // logout logic
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 py-54">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        {/* <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button> */}
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <FaUsers className="text-4xl text-blue-500 mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <FaUsers className="text-4xl text-green-500 mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.status}</td>
                <td className="border p-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fixed Instagram Icon */}
      {/* <a
        href="https://instagram.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-pink-500 p-3 rounded-full shadow-lg animate-pulse"
      >
        <FaInstagram className="text-white text-3xl" />
      </a> */}
    </div>
  );
};

export default AdminDashboard;
