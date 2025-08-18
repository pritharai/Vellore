import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FaBoxOpen,
  FaHistory,
  FaEdit,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { updateUserProfile } from "../services/userService";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:mt-40 px-6 py-12">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-primary mb-6">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "orders" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaBoxOpen /> <span>Track Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "history" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaHistory /> <span>Order History</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "feedback" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaEdit /> <span>Give Feedback</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "profile" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaUser /> <span>Profile Details</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("support")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "support" ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                <FaHeadset /> <span>Contact Support</span>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="pt-6 border-t mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-primary hover:bg-red-100 transition hover:cursor-pointer"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-3 bg-white rounded-2xl shadow p-6 min-h-[400px]">
          {activeTab === "orders" && <TrackOrders />}
          {activeTab === "history" && <OrderHistory />}
          {activeTab === "feedback" && <Feedback />}
          {activeTab === "profile" && <ProfileDetails user={user} />}
          {activeTab === "support" && <ContactSupport />}
        </section>
      </div>
    </div>
  );
};

// Track Orders (Placeholder)
const TrackOrders = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Track Your Orders</h2>
    <p className="text-gray-600">You have no active orders right now.</p>
  </div>
);

// Order History (Placeholder)
const OrderHistory = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Order History</h2>
    <p className="text-gray-600">No past orders found.</p>
  </div>
);

// Feedback (Placeholder)
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

// Profile Details
const ProfileDetails = ({ user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    address: user?.address || "",
    phone: user?.phone || "",
  });

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      {user ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email (cannot be changed)</label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Loading user data...</p>
      )}
    </div>
  );
};

// Contact Support
const ContactSupport = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
    <p className="text-gray-600 mb-4">If you have any questions or issues, feel free to reach out to us.</p>
    <p className="flex items-center gap-2">
      <FaMapMarkerAlt /> 123 Street, New Delhi, India
    </p>
    <p className="flex items-center gap-2 mt-2">
      <FaPhoneAlt /> +91 9876543210
    </p>
  </div>
);

export default MyAccount;