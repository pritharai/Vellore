// src/pages/ConfirmOrder.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const product = {
  id: 1,
  name: "Soft Hoodie",
  price: 2500,
  size: "S",
  image: "/images/product3.jpg",
  quantity: 1,
};

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [promo, setPromo] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // new states
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingCharge, setShippingCharge] = useState(400); // default Express
  const codCharge = paymentMethod === "cod" ? 50 : 0; // e.g. ₹50 extra for COD

  const handleConfirm = () => {
    if (!address.trim() || !contact.trim()) {
      setShowPopup(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/thank-you");
    }, 2000);
  };

  const total = product.price + shippingCharge + codCharge;

  return (
    <div className="min-h-screen bg-white px-6 lg:px-20 lg:py-54">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
              />
            </div>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone number"
              className="w-full border-b rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Delivery address"
              className="w-full border-b rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Shipping Services */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Shipping Services
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingCharge === 120}
                  onChange={() => setShippingCharge(120)}
                />
                <span className="flex-1">
                  Standard Shipping (5–7 days) – ₹120
                </span>
              </label>
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingCharge === 400}
                  onChange={() => setShippingCharge(400)}
                />
                <span className="flex-1">Express (2–3 days) – ₹400</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Method
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
              <label className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
            {paymentMethod === "cod" && (
              <p className="text-sm text-gray-600 mt-2">
                ⚠️ COD incurs an extra charge of ₹{codCharge}.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SECTION: Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Summary</h2>

          {/* Product Display */}
          <div className="flex gap-4 border-b pb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500 text-sm">Size: {product.size}</p>
              <p className="text-gray-600 font-semibold">₹{product.price}</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{product.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{shippingCharge}</span>
            </div>
            {codCharge > 0 && (
              <div className="flex justify-between">
                <span>COD Charges</span>
                <span>₹{codCharge}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover shadow-md"
              }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Placing Order...
              </>
            ) : (
              "Confirm Order"
            )}
          </motion.button>
        </div>
      </div>

      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Missing Information</h3>
            <p className="text-gray-600 mb-4">
              Please fill in your delivery address and contact number.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrder;
  