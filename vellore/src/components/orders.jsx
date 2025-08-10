import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userProducts, setUserProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders");
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await axios.put(`/api/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleUserProducts = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null); // collapse
      return;
    }

    setExpandedUserId(userId);
    if (!userProducts[userId]) {
      setLoadingProducts(true);
      try {
        const res = await axios.get(`/api/users/${userId}/orders`);
        const allProducts = res.data.flatMap((order) => order.products || []);
        setUserProducts((prev) => ({ ...prev, [userId]: allProducts }));
      } catch (error) {
        console.error("Error fetching user products:", error);
        setUserProducts((prev) => ({ ...prev, [userId]: [] }));
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading orders...</p>;

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:py-54">
      <h2 className="text-2xl font-bold mb-6 text-primary">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Order ID</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Products</th>
                <th className="border p-3">Total</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3">{order._id}</td>
                    <td className="border p-3">{order.customerName}</td>
                    <td className="border p-3">{order.customerEmail}</td>
                    <td className="border p-3">
                      <ul className="list-disc list-inside">
                        {order.products?.length > 0 ? (
                          order.products.map((p, idx) => (
                            <li key={idx}>
                              {p.name} × {p.quantity} (₹{p.price})
                            </li>
                          ))
                        ) : (
                          <li>No products</li>
                        )}
                      </ul>
                    </td>
                    <td className="border p-3 font-semibold">₹{order.totalAmount}</td>
                    <td className="border p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="border p-1 rounded"
                        disabled={updatingId === order._id}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border p-3">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="border p-3 space-y-2">
                      <button
                        onClick={() => alert(JSON.stringify(order, null, 2))}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => toggleUserProducts(order.userId)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
                      >
                        {expandedUserId === order.userId
                          ? "Hide All Purchases"
                          : "View All Purchases"}
                      </button>
                    </td>
                  </tr>

                  {expandedUserId === order.userId && (
                    <tr>
                      <td colSpan="8" className="bg-gray-50 p-4">
                        {loadingProducts ? (
                          <p>Loading user purchases...</p>
                        ) : (
                          <div>
                            <h4 className="font-bold mb-2">
                              All Products Ever Bought
                            </h4>
                            {userProducts[order.userId]?.length > 0 ? (
                              <ul className="divide-y">
                                {userProducts[order.userId].map((prod, idx) => (
                                  <li key={idx} className="py-2 flex justify-between">
                                    <span>{prod.name}</span>
                                    <span className="text-gray-600">
                                      × {prod.quantity} — ₹{prod.price}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No purchase history.</p>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
