// src/pages/ConfirmOrder.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const product = {  id: 1,
  name: "Sample Product",
    price: 999,
    quantity: 1,
    image: "/images/product3.jpg",
};


const ConfirmOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
//   const product = state?.product;

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleConfirm = () => {
    if (!address.trim() || !contact.trim()) {
      alert("Please fill in your delivery address and contact number.");
      return;
    }

    setLoading(true);
    // Here you'll send data to your backend to save in orders table
    // Example:
    // await axios.post("/api/orders", { product, address, contact })
    setTimeout(() => {
  setLoading(false);
  navigate("/thank-you");
}, 1500);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        No product details found. Please go back to cart.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 lg:py-54">
      <div className="bg-white shadow-lg rounded-2xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Confirm Your Order
        </h1>

        {/* Product Display */}
        <div className="border border-gray-200 rounded-lg p-5 space-y-4">
          <div className="flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h2 className="font-medium">{product.name}</h2>
              <p className="text-gray-500 text-sm">
                Quantity: {product.quantity}
              </p>
            </div>
            <p className="font-medium">₹{product.price}</p>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total:</span>
            <span>₹{product.price * product.quantity}</span>
          </div>
        </div>

        {/* Address & Contact */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter your delivery address"
              className="w-full border rounded-lg p-2 text-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full border rounded-lg p-2 text-sm focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300
            ${loading ? "bg-gray-400" : "bg-primary hover:bg-primary-hover"}`}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
