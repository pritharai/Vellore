import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { createOrder } from "../services/orderService";
import { allUserAddresses } from "../services/userService";
import { useAuth } from "../hooks/useAuth";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthenticated } = useAuth();
  const products = state?.products || [];

  const [addressOption, setAddressOption] = useState("new");
  const [addressId, setAddressId] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    houseNumber: "",
    street: "",
    colony: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to COD
  const [shippingCharge, setShippingCharge] = useState(400); // Default Express
  const [showPopup, setShowPopup] = useState(false);
  const codCharge = paymentMethod === "cod" ? 50 : 0;

  const { data: addresses, isLoading: addressesLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: allUserAddresses,
    enabled: isAuthenticated,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Order created successfully");
      navigate("/thank-you", { state: { order: data.order } });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create order");
    },
  });

  const handleConfirm = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to place an order");
      setTimeout(() => navigate("/auth"), 2000);
      return;
    }

    // Validate contact number: exactly 10 digits
    if (!/^\d{10}$/.test(contact)) {
      toast.error("Please enter a valid 10-digit contact number");
      return;
    }

    if (addressOption === "new") {
      const { houseNumber, street, colony, city, state, country, postalCode } = shippingAddress;
      if (!houseNumber || !street || !colony || !city || !state || !country || !postalCode) {
        setShowPopup(true);
        return;
      }
    } else if (addressOption === "saved" && !addressId) {
      setShowPopup(true);
      return;
    }

    const itemIds = products.map((item) => item._id).filter(Boolean);
    const items = products
      .filter((item) => !item._id)
      .map((item) => ({
        variant: item.variantId || item.variant._id,
        size: item.size,
        quantity: item.quantity,
      }));

    createOrderMutation.mutate({
      itemIds: itemIds.length > 0 ? itemIds : undefined,
      addressId: addressOption === "saved" ? addressId : undefined,
      paymentMethod: "cod",
      shippingAddress: addressOption === "new" ? shippingAddress : undefined,
      contact: Number(contact),
    });
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = products.reduce(
    (sum, item) => sum + (item.variant?.price || item.price) * item.quantity,
    0
  );
  const total = subtotal + shippingCharge + codCharge;

  if (!products.length) {
    return (
      <div className="min-h-screen bg-white px-6 lg:px-20 lg:py-54 text-center">
        <p>No items to order</p>
      </div>
    );
  }

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
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone number"
              className="w-full border-b rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
            />
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="addressOption"
                  value="new"
                  checked={addressOption === "new"}
                  onChange={() => setAddressOption("new")}
                />
                New Address
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="addressOption"
                  value="saved"
                  checked={addressOption === "saved"}
                  onChange={() => setAddressOption("saved")}
                />
                Saved Address
              </label>
            </div>
            {addressOption === "new" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="House Number"
                  value={shippingAddress.houseNumber}
                  onChange={(e) => handleAddressChange("houseNumber", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Street"
                  value={shippingAddress.street}
                  onChange={(e) => handleAddressChange("street", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Colony"
                  value={shippingAddress.colony}
                  onChange={(e) => handleAddressChange("colony", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                  className="border-b rounded-lg p-3 text-sm focus:ring-1 focus:ring-black outline-none"
                />
              </div>
            ) : (
              <select
                value={addressId}
                onChange={(e) => setAddressId(e.target.value)}
                className="w-full border-b rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
                disabled={addressesLoading || !addresses?.length}
              >
                <option value="">Select a saved address</option>
                {addresses?.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {`${addr.houseNumber}, ${addr.street}, ${addr.colony}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.postalCode}`}
                  </option>
                ))}
              </select>
            )}
          </div>

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

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Method
            </h2>
            <div className="flex gap-4">
              <label
                className="flex items-center gap-2 border rounded-lg px-4 py-2 opacity-50 cursor-not-allowed relative group"
                title="Card payment is temporarily unavailable"
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  disabled
                  className="cursor-not-allowed"
                />
                Card
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                  Temporarily unavailable
                </span>
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
          {products.map((item, index) => (
            <div key={index} className="flex gap-4 border-b pb-4">
              <img
                src={item.variant?.image.url || item.image}
                alt={item.variant?.product.name || item.product?.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.variant?.product.name || item.product?.name}</h3>
                <p className="text-gray-500 text-sm">Size: {item.size}</p>
                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                <p className="text-gray-600 font-semibold">
                  ₹{(item.variant?.price || item.price).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{shippingCharge.toLocaleString("en-IN")}</span>
            </div>
            {codCharge > 0 && (
              <div className="flex justify-between">
                <span>COD Charges</span>
                <span>₹{codCharge.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            disabled={createOrderMutation.isPending}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300
              ${
                createOrderMutation.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-hover hover:cursor-pointer shadow-md"
              }`}
          >
            {createOrderMutation.isPending ? (
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

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Missing Information</h3>
            <p className="text-gray-600 mb-4">
              Please fill in all address fields and a valid 10-digit contact number, or select a saved address.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-hover transition hover:cursor-pointer"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;