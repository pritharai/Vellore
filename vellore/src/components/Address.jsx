import React, { useState } from "react";
import axios from "axios";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/user/address", formData, {
        withCredentials: true,
      });
      setMessage("Address added successfully!");
      setFormData({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
    } catch (error) {
      setMessage("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-54">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Add Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <textarea
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-hover transition disabled:opacity-50 hover:cursor-pointer "
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddAddress;
