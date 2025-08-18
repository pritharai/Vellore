import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
  const [mostSold, setMostSold] = useState([]);

  useEffect(() => {
    // Fetch admin data (dummy example)
    setUsers([
      { id: 1, name: "John Doe", status: "Active" },
      { id: 2, name: "Jane Smith", status: "Blocked" },
    ]);
    setStats({ totalUsers: 2, activeUsers: 1 });

    // Fetch most sold t-shirts (dummy example)
    setMostSold([
      { id: 101, name: "Unisex Oversized Tee", sold: 150 },
      { id: 102, name: "Graphic Print Tee", sold: 120 },
      { id: 103, name: "Classic White Tee", sold: 95 },
    ]);
  }, []);

  return (
    <div className="min-h-screen p-6 py-54">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <FaUsers className="text-4xl text-primary mx-auto mb-2" />
          <h2 className="text-lg text-primary font-semibold">Total Users</h2>
          <p className="text-2xl text-primary font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <FaUsers className="text-4xl text-tertiary mx-auto mb-2" />
          <h2 className="text-lg text-tertiary font-semibold">Active Users</h2>
          <p className="text-2xl text-tertiary font-bold">{stats.activeUsers}</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>

        {users.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-3 text-left">ID</th>
                  <th className="border-b p-3 text-left">Name</th>
                  <th className="border-b p-3 text-left">Status</th>
                  <th className="border-b p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border-b p-3">{u.id}</td>
                    <td className="border-b p-3">{u.name}</td>
                    <td
                      className={`border-b p-3 font-medium ${
                        u.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {u.status}
                    </td>
                    <td className="border-b p-3 text-center">
                      <button className="bg-primary px-3 py-1 rounded hover:bg-primary-hover mr-2 transition hover:cursor-pointer">
                        Edit
                      </button>
                      <button className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition hover:cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Most Sold T-Shirts Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Most Sold T-Shirts</h2>

        {mostSold.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No sales data found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-3 text-left">Product ID</th>
                  <th className="border-b p-3 text-left">Product Name</th>
                  <th className="border-b p-3 text-left">Sold</th>
                </tr>
              </thead>
              <tbody>
                {mostSold.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border-b p-3">{item.id}</td>
                    <td className="border-b p-3">{item.name}</td>
                    <td className="border-b p-3 font-bold text-primary">
                      {item.sold}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
