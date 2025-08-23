import React, { useState } from "react";
import { FaUsers, FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmationPopup from "../components/ConfirmationPopup";
import {
  getDashboardStats,
  getMostActiveUsers,
  getMostPurchasedProducts,
  getRecentOrders,
  getOrdersByUser,
} from "../services/dashboardService";
import { getAllOrders, updateOrderStatus } from "../services/orderService";
import Papa from "papaparse";

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [recentOrdersFilters, setRecentOrdersFilters] = useState({ status: "", method: "" });
  const [allOrdersFilters, setAllOrdersFilters] = useState({ status: "" });
  const [userOrdersFilter, setUserOrdersFilter] = useState({ email: "" });
  const [emailInput, setEmailInput] = useState(""); // New state for email input
  const [usersSortBy, setUsersSortBy] = useState("orderCount");
  const [productsSortBy, setProductsSortBy] = useState("quantitySold");
  const [recentOrdersPage, setRecentOrdersPage] = useState(1);
  const [userOrdersPage, setUserOrdersPage] = useState(1);
  const [allOrdersPage, setAllOrdersPage] = useState(1);
  const [updateOrder, setUpdateOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const limit = 10;

  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStats({}),
  });

  const { data: usersData, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["mostActiveUsers", usersSortBy],
    queryFn: () => getMostActiveUsers({ sortBy: usersSortBy, limit }),
  });

  const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["mostPurchasedProducts", productsSortBy],
    queryFn: () => getMostPurchasedProducts({ sortBy: productsSortBy, limit }),
  });

  const { data: recentOrdersData, isLoading: recentOrdersLoading, error: recentOrdersError } = useQuery({
    queryKey: ["recentOrders", recentOrdersFilters, recentOrdersPage],
    queryFn: () => getRecentOrders({ ...recentOrdersFilters, limit, page: recentOrdersPage }),
  });

  const { data: userOrdersData, isLoading: userOrdersLoading, error: userOrdersError } = useQuery({
    queryKey: ["userOrders", userOrdersFilter, userOrdersPage],
    queryFn: () => getOrdersByUser({ ...userOrdersFilter, limit, page: userOrdersPage }),
    enabled: !!userOrdersFilter.email,
  });

  const { data: allOrdersData, isLoading: allOrdersLoading, error: allOrdersError } = useQuery({
    queryKey: ["allOrders", allOrdersFilters, allOrdersPage],
    queryFn: () => getAllOrders({ ...allOrdersFilters, limit, page: allOrdersPage }),
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      toast.success("Order status updated successfully");
      setUpdateOrder(null);
      setSelectedStatus("");
      queryClient.invalidateQueries(["recentOrders", "userOrders", "allOrders"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update order status")
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStatusUpdate = (order, status) => {
    setUpdateOrder(order);
    setSelectedStatus(status);
  };

  const confirmStatusUpdate = () => {
    if (updateOrder && selectedStatus) {
      updateOrderStatusMutation.mutate({ id: updateOrder._id, status: selectedStatus });
    }
  };

  const handleSearch = () => {
    setUserOrdersFilter({ email: emailInput.trim() });
    setUserOrdersPage(1); // Reset to first page on new search
  };

  const downloadCSV = (data, filename, headers) => {
    const csv = Papa.unparse(data, { header: true, columns: headers });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen mt-30 p-6 py-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      </header>

      {/* Stats */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Stats</h2>
        {statsLoading ? (
          <p className="text-gray-500">Loading stats...</p>
        ) : statsError ? (
          <p className="text-red-500">Error: {statsError.message}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <FaShoppingCart className="text-4xl text-primary mx-auto mb-2" />
              <h2 className="text-lg text-primary font-semibold">Total Orders</h2>
              <p className="text-2xl text-primary font-bold">{statsData?.totalOrders || 0}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <FaUsers className="text-4xl text-tertiary mx-auto mb-2" />
              <h2 className="text-lg text-tertiary font-semibold">Total Customers</h2>
              <p className="text-2xl text-tertiary font-bold">{statsData?.totalCustomers || 0}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <FaBoxOpen className="text-4xl text-primary mx-auto mb-2" />
              <h2 className="text-lg text-primary font-semibold">Total Products</h2>
              <p className="text-2xl text-primary font-bold">{statsData?.totalProducts || 0}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <FaDollarSign className="text-4xl text-tertiary mx-auto mb-2" />
              <h2 className="text-lg text-tertiary font-semibold">Total Revenue</h2>
              <p className="text-2xl text-tertiary font-bold">₹{(statsData?.totalRevenue || 0).toLocaleString("en-IN")}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <FaBoxOpen className="text-4xl text-primary mx-auto mb-2" />
              <h2 className="text-lg text-primary font-semibold">Cancellation Requests</h2>
              <p className="text-2xl text-primary font-bold">{statsData?.cancellationRequests || 0}</p>
            </div>
          </div>
        )}
        {statsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Orders by Status</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border-b p-3 text-left">Status</th>
                    <th className="border-b p-3 text-right">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(statsData.ordersByStatus || {}).map(([status, count]) => (
                    <tr key={status} className="hover:bg-gray-50">
                      <td className="border-b p-3 capitalize">{status}</td>
                      <td className="border-b p-3 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">Orders by Method</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border-b p-3 text-left">Method</th>
                    <th className="border-b p-3 text-right">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(statsData.ordersByMethod || {}).map(([method, count]) => (
                    <tr key={method} className="hover:bg-gray-50">
                      <td className="border-b p-3 capitalize">{method === "cod" ? "Cash on Delivery" : "Online"}</td>
                      <td className="border-b p-3 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Most Active Users */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Most Active Users</h2>
          <select
            value={usersSortBy}
            onChange={(e) => setUsersSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="orderCount">Sort by Order Count</option>
            <option value="totalSpent">Sort by Total Spent</option>
          </select>
        </div>
        {usersLoading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : usersError ? (
          <p className="text-red-500">Error: {usersError.message}</p>
        ) : usersData?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-3 text-left">Name</th>
                  <th className="border-b p-3 text-left">Email</th>
                  <th className="border-b p-3 text-right">Order Count</th>
                  <th className="border-b p-3 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="border-b p-3">{user.name}</td>
                    <td className="border-b p-3">{user.email}</td>
                    <td className="border-b p-3 text-right">{user.orderCount}</td>
                    <td className="border-b p-3 text-right">₹{user.totalSpent.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Most Purchased Products */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Most Purchased Products</h2>
          <select
            value={productsSortBy}
            onChange={(e) => setProductsSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="quantitySold">Sort by Quantity Sold</option>
            <option value="orderCount">Sort by Order Count</option>
          </select>
        </div>
        {productsLoading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : productsError ? (
          <p className="text-red-500">Error: {productsError.message}</p>
        ) : productsData?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No sales data found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border-b p-3 text-left">Image</th>
                  <th className="border-b p-3 text-left">Product Name</th>
                  <th className="border-b p-3 text-left">Color</th>
                  <th className="border-b p-3 text-right">Quantity Sold</th>
                  <th className="border-b p-3 text-right">Order Count</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((item) => (
                  <tr key={item.variantId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="border-b p-3">
                      <img src={item.image.url} alt={item.productName} className="h-10 w-10 object-cover rounded" />
                    </td>
                    <td className="border-b p-3">{item.productName}</td>
                    <td className="border-b p-3">{item.colorName}</td>
                    <td className="border-b p-3 text-right">{item.quantitySold}</td>
                    <td className="border-b p-3 text-right">{item.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Orders */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Orders</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter user email"
              className="border border-gray-300 rounded-lg p-2"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
            >
              Search
            </button>
          </div>
        </div>
        {userOrdersLoading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : userOrdersError ? (
          <p className="text-red-500">Error: {userOrdersError.message}</p>
        ) : !userOrdersFilter.email ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">Enter an email to view orders.</p>
          </div>
        ) : userOrdersData?.orders?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No orders found for this user.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border-b p-3 text-left">Order ID</th>
                    <th className="border-b p-3 text-left">User Name</th>
                    <th className="border-b p-3 text-left">User Email</th>
                    <th className="border-b p-3 text-left">Status</th>
                    <th className="border-b p-3 text-left">Payment Method</th>
                    <th className="border-b p-3 text-right">Total Amount</th>
                    <th className="border-b p-3 text-left">Created At</th>
                    <th className="border-b p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrdersData.orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="border-b p-3">{order._id}</td>
                      <td className="border-b p-3">{order.user.name}</td>
                      <td className="border-b p-3">{order.user.email}</td>
                      <td className={`border-b p-3 capitalize ${order.status === "cancelled" ? "text-red-500" : order.status === "delivered" ? "text-green-600" : ""}`}>
                        {order.status}
                      </td>
                      <td className="border-b p-3 capitalize">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</td>
                      <td className="border-b p-3 text-right">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="border-b p-3">{formatDate(order.createdAt)}</td>
                      <td className="border-b p-3 text-center">
                        <select
                          value=""
                          onChange={(e) => handleStatusUpdate(order, e.target.value)}
                          className={`border border-gray-300 rounded-lg p-2 mr-2 ${order.status === "delivered" || order.status === "cancelled" ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={order.status === "delivered" || order.status === "cancelled"}
                        >
                          <option value="">Select Status</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {userOrdersData.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(userOrdersData.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setUserOrdersPage(i + 1)}
                    className={`px-3 py-1 rounded ${userOrdersPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <div className="flex gap-4">
            <select
              value={recentOrdersFilters.status}
              onChange={(e) => setRecentOrdersFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={recentOrdersFilters.method}
              onChange={(e) => setRecentOrdersFilters((prev) => ({ ...prev, method: e.target.value }))}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">All Methods</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        {recentOrdersLoading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : recentOrdersError ? (
          <p className="text-red-500">Error: {recentOrdersError.message}</p>
        ) : recentOrdersData?.orders?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No orders found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border-b p-3 text-left">Order ID</th>
                    <th className="border-b p-3 text-left">User Name</th>
                    <th className="border-b p-3 text-left">User Email</th>
                    <th className="border-b p-3 text-left">Status</th>
                    <th className="border-b p-3 text-left">Payment Method</th>
                    <th className="border-b p-3 text-right">Total Amount</th>
                    <th className="border-b p-3 text-left">Created At</th>
                    <th className="border-b p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrdersData.orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="border-b p-3">{order._id}</td>
                      <td className="border-b p-3">{order.user.name}</td>
                      <td className="border-b p-3">{order.user.email}</td>
                      <td className={`border-b p-3 capitalize ${order.status === "cancelled" ? "text-red-500" : order.status === "delivered" ? "text-green-600" : ""}`}>
                        {order.status}
                      </td>
                      <td className="border-b p-3 capitalize">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</td>
                      <td className="border-b p-3 text-right">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="border-b p-3">{formatDate(order.createdAt)}</td>
                      <td className="border-b p-3 text-center">
                        <select
                          value=""
                          onChange={(e) => handleStatusUpdate(order, e.target.value)}
                          className={`border border-gray-300 rounded-lg p-2 mr-2 ${order.status === "delivered" || order.status === "cancelled" ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={order.status === "delivered" || order.status === "cancelled"}
                        >
                          <option value="">Select Status</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {recentOrdersData.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(recentOrdersData.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRecentOrdersPage(i + 1)}
                    className={`px-3 py-1 rounded ${recentOrdersPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* All Orders */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Orders</h2>
          <div className="flex gap-4">
            <select
              value={allOrdersFilters.status}
              onChange={(e) => setAllOrdersFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() =>
                downloadCSV(
                  allOrdersData?.orders || [],
                  "all-orders",
                  ["_id", "user.name", "user.email", "status", "paymentMethod", "totalAmount", "createdAt"]
                )
              }
              className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition"
            >
              Download CSV
            </button>
          </div>
        </div>
        {allOrdersLoading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : allOrdersError ? (
          <p className="text-red-500">Error: {allOrdersError.message}</p>
        ) : allOrdersData?.orders?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No orders found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border-b p-3 text-left">Order ID</th>
                    <th className="border-b p-3 text-left">User Name</th>
                    <th className="border-b p-3 text-left">User Email</th>
                    <th className="border-b p-3 text-left">Status</th>
                    <th className="border-b p-3 text-left">Payment Method</th>
                    <th className="border-b p-3 text-right">Total Amount</th>
                    <th className="border-b p-3 text-left">Created At</th>
                    <th className="border-b p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrdersData.orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="border-b p-3">{order._id}</td>
                      <td className="border-b p-3">{order.user.name}</td>
                      <td className="border-b p-3">{order.user.email}</td>
                      <td className={`border-b p-3 capitalize ${order.status === "cancelled" ? "text-red-500" : order.status === "delivered" ? "text-green-600" : ""}`}>
                        {order.status}
                      </td>
                      <td className="border-b p-3 capitalize">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</td>
                      <td className="border-b p-3 text-right">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="border-b p-3">{formatDate(order.createdAt)}</td>
                      <td className="border-b p-3 text-center">
                        <select
                          value=""
                          onChange={(e) => handleStatusUpdate(order, e.target.value)}
                          className={`border border-gray-300 rounded-lg p-2 mr-2 ${order.status === "delivered" || order.status === "cancelled" ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={order.status === "delivered" || order.status === "cancelled"}
                        >
                          <option value="">Select Status</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {allOrdersData.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(allOrdersData.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAllOrdersPage(i + 1)}
                    className={`px-3 py-1 rounded ${allOrdersPage === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Confirmation Popup */}
      {updateOrder && (
        <ConfirmationPopup
          isOpen={!!updateOrder}
          title="Update Order Status"
          message={`Are you sure you want to update order #${updateOrder._id} to ${selectedStatus}?`}
          onConfirm={confirmStatusUpdate}
          onCancel={() => {
            setUpdateOrder(null);
            setSelectedStatus("");
          }}
          confirmButtonText={updateOrderStatusMutation.isPending ? "Updating..." : "Confirm"}
          confirmButtonDisabled={updateOrderStatusMutation.isPending}
        />
      )}
    </div>
  );
};

export default AdminDashboard;