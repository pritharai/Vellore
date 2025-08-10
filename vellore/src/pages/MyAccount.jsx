// pages/MyAccount.jsx
import { useState } from "react";
import { FaBoxOpen, FaHistory, FaEdit, FaHeadset, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="max-w-7xl mx-auto px-6 py-54">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primary mb-6">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow p-4">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "orders" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaBoxOpen /> <span>Track Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "history" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaHistory /> <span>Order History</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "feedback" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaEdit /> <span>Give Feedback</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "profile" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaUser /> <span>Profile Details</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("support")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                  activeTab === "support" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaHeadset /> <span>Contact Support</span>
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-3 bg-white rounded-2xl shadow p-6 min-h-[400px]">
          {activeTab === "orders" && <TrackOrders />}
          {activeTab === "history" && <OrderHistory />}
          {activeTab === "feedback" && <Feedback />}
          {activeTab === "profile" && <ProfileDetails />}
          {activeTab === "support" && <ContactSupport />}
        </section>
      </div>
    </div>
  );
};

// Track Orders
const TrackOrders = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Track Your Orders</h2>
    <p className="text-gray-600">You have no active orders right now.</p>
  </div>
);

// Order History
const OrderHistory = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Order History</h2>
    <p className="text-gray-600">No past orders found.</p>
  </div>
);

// Feedback
const Feedback = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>
    <textarea
      placeholder="Write your feedback..."
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
      rows={5}
    ></textarea>
    <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
      Submit Feedback
    </button>
  </div>
);

// Profile Details (email uneditable)
const ProfileDetails = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-700">Full Name</label>
        <input
          type="text"
          defaultValue="John Doe"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Email (cannot be changed)</label>
        <input
          type="email"
          defaultValue="johndoe@email.com"
          readOnly
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Address</label>
        <input
          type="text"
          defaultValue="123 Main Street"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Contact Number</label>
        <input
          type="text"
          defaultValue="+91 9876543210"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>
      <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition">
        Save Changes
      </button>
    </form>
  </div>
);

// Contact Support
const ContactSupport = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
    <p className="text-gray-600 mb-4">
      If you have any questions or issues, feel free to reach out to us.
    </p>
    <p className="flex items-center gap-2">
      <FaMapMarkerAlt /> 123 Street, New Delhi, India
    </p>
    <p className="flex items-center gap-2 mt-2">
      <FaPhoneAlt /> +91 9876543210
    </p>
  </div>
);

export default MyAccount;
