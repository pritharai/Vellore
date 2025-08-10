// pages/ThankYou.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const latestOrder = location.state?.order;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 lg:py-54">
      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-8 text-center">
        {/* Thank You Icon */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-600 mt-2">
          We appreciate your trust in our brand.
        </p>

        {/* Latest Order Info */}
        {latestOrder && (
          <div className="mt-6 border rounded-lg p-4 bg-gray-50">
            <p className="text-lg text-gray-700">
              Your order for{" "}
              <strong className="text-primary">{latestOrder.name}</strong> has
              been placed successfully.
            </p>
          </div>
        )}

        {/* My Orders */}
        <div className="mt-10 text-left">
         
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            My Orders
          </h2>
          
          
          {orders.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{order.name}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className="text-primary font-semibold">
                    ₹{order.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No previous orders found.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/my-account?tab=history"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
