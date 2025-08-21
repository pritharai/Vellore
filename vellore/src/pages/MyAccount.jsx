import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  updateUserProfile,
  allUserAddresses,
  updateAddress,
  changePassword,
  addAddress,
  deleteAddress,
} from "../services/userService";
import {
  getUserOrders,
  requestOrderCancellation,
} from "../services/orderService";
import { addFeedback, getAllFeedbacks } from "../services/feedbackService";
import { toast } from "react-toastify";
import ConfirmationPopup from "../components/ConfirmationPopup";
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
                  activeTab === "orders"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaBoxOpen /> <span>Track Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "history"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaHistory /> <span>Order History</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("feedback")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "feedback"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaEdit /> <span>Give Feedback</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaUser /> <span>Profile Details</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("support")}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition hover:cursor-pointer ${
                  activeTab === "support"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
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

// Track Orders
const TrackOrders = () => {
  const queryClient = useQueryClient();
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
  });

  const activeOrders = orders?.filter((order) =>
    ["pending", "processing", "shipped"].includes(order.status)
  );

  const cancelOrderMutation = useMutation({
    mutationFn: requestOrderCancellation,
    onSuccess: () => {
      toast.success("Cancellation request submitted");
      setIsCancelModalOpen(false);
      setCancelReason("");
      setCancelOrderId(null);
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
    },
    onError: (err) => toast.error(err.message || "Failed to request cancellation"),
  });

  const handleCancelClick = (orderId) => {
    setCancelOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }
    cancelOrderMutation.mutate({ orderId: cancelOrderId, reason: cancelReason });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { houseNumber, street, colony, city, state, country, postalCode } = address;
    return `${houseNumber}, ${street}, ${colony}, ${city}, ${state}, ${country} - ${postalCode}`;
  };

  if (isLoading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading orders: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Track Your Orders</h2>
      {activeOrders?.length > 0 ? (
        <div className="space-y-6">
          {activeOrders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h3 className="text-lg font-medium text-wrap text-gray-800">
                  Order #{order._id}
                </h3>
                <span
                  className={`text-sm capitalize px-3 py-1 rounded-full ${
                    order.status === "pending" || order.status === "processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Placed On:</strong> {formatDate(order.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expected Delivery:</strong>{" "}
                {formatDate(order.expectedDelivery)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Shipping Address:</strong>{" "}
                {formatAddress(order.shippingAddress)}
              </p>
              {order.cancellationRequest.requested && (
                <p className="text-sm text-red-600">
                  <strong>Cancellation Requested:</strong>{" "}
                  {order.cancellationRequest.reason}
                </p>
              )}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                <ul className="divide-y divide-gray-200 mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.variant?.product.name} ({item.variant?.color.name}, {item.size})
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm text-primary font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-4">
                <strong>Total Amount:</strong>{" "}
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
              {order.status !== "cancelled" &&
                order.status !== "delivered" &&
                !order.cancellationRequest.requested && (
                  <button
                    onClick={() => handleCancelClick(order._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no active orders right now.</p>
      )}

      {/* Cancellation Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Request Order Cancellation</h3>
            <form onSubmit={handleCancelSubmit} className="space-y-3">
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please provide a reason for cancellation"
                className="w-full border border-gray-300 resize-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCancelModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={cancelOrderMutation.isPending}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                >
                  {cancelOrderMutation.isPending ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Order History
const OrderHistory = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { houseNumber, street, colony, city, state, country, postalCode } = address;
    return `${houseNumber}, ${street}, ${colony}, ${city}, ${state}, ${country} - ${postalCode}`;
  };

  if (isLoading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading orders: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {orders?.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h3 className="text-lg font-medium text-wrap text-gray-800">
                  Order #{order._id}
                </h3>
                <span
                  className={`text-sm capitalize px-3 py-1 rounded-full ${
                    order.status === "pending" || order.status === "processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "shipped" || order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Placed On:</strong> {formatDate(order.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expected Delivery:</strong>{" "}
                {formatDate(order.expectedDelivery)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Shipping Address:</strong>{" "}
                {formatAddress(order.shippingAddress)}
              </p>
              {order.cancellationRequest.requested && (
                <p className="text-sm text-red-600">
                  <strong>Cancellation Requested:</strong>{" "}
                  {order.cancellationRequest.reason}
                </p>
              )}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                <ul className="divide-y divide-gray-200 mt-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.variant?.product.name} ({item.variant?.color.name}, {item.size})
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm text-primary font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-4">
                <strong>Total Amount:</strong>{" "}
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No past orders found.</p>
      )}
    </div>
  );
};

// Feedback
const Feedback = () => {
  const queryClient = useQueryClient();
  const [feedbackText, setFeedbackText] = useState("");

  const addFeedbackMutation = useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      toast.success("Feedback submitted successfully");
      setFeedbackText("");
      queryClient.invalidateQueries({ queryKey: ["userFeedbacks"] });
    },
    onError: (err) => toast.error(err.message || "Failed to submit feedback"),
  });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast.error("Feedback cannot be empty");
      return;
    }
    addFeedbackMutation.mutate(feedbackText);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>
      {/* Feedback Form */}
      <form onSubmit={handleFeedbackSubmit} className="mb-6">
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full border resize-none border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={5}
        ></textarea>
        <button
          type="submit"
          disabled={addFeedbackMutation.isPending}
          className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
        >
          {addFeedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

// Profile Details
const ProfileDetails = ({ user }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Address states
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    houseNumber: "",
    street: "",
    colony: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Delete popup state
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Profile confirmation popup state
  const [showProfileConfirm, setShowProfileConfirm] = useState(false);

  // Fetch addresses
  const { data: addresses, isLoading: addressesLoading } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: allUserAddresses,
  });

  // Mutations
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Profile updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setShowPasswordFields(false);
    },
    onError: (err) => toast.error(err.message),
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: () => {
      toast.success("Address updated successfully");
      setEditingAddress(null);
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully");
      setNewAddressForm({
        houseNumber: "",
        street: "",
        colony: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      setShowConfirm(false);
      setSelectedAddressId(null);
    },
    onError: (err) => toast.error(err.message),
  });

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setShowProfileConfirm(true); // Show confirmation popup instead of direct mutation
  };

  const confirmProfileUpdate = () => {
    updateProfileMutation.mutate(formData);
    setShowProfileConfirm(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    updateAddressMutation.mutate({ id: editingAddress, data: addressForm });
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewAddressSubmit = (e) => {
    e.preventDefault();
    addAddressMutation.mutate(newAddressForm);
  };

  const handleDeleteClick = (id) => {
    setSelectedAddressId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedAddressId) {
      deleteAddressMutation.mutate(selectedAddressId);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    changePasswordMutation.mutate(passwordData);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      {user ? (
        <>
          {/* Profile form */}
          <form className="space-y-4 mb-6" onSubmit={handleProfileSubmit}>
            <div>
              <label className="block mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">
                Email (cannot be changed)
              </label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 hover:cursor-pointer"
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Password Section */}
          <div className="mb-6">
            {!showPasswordFields ? (
              <button
                onClick={() => setShowPasswordFields(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition hover:cursor-pointer"
              >
                Change Password
              </button>
            ) : (
              <form className="space-y-3" onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Current Password"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded p-3"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded p-3"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
                  >
                    {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                    onClick={() => setShowPasswordFields(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Address Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Addresses</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              + Add Address
            </button>
          </div>

          {addressesLoading ? (
            <p>Loading addresses...</p>
          ) : addresses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="border rounded-lg p-4 shadow-sm relative"
                >
                  {editingAddress === addr._id ? (
                    // Address Edit Form
                    <form onSubmit={handleAddressSubmit} className="space-y-2">
                      {["houseNumber", "street", "colony", "city", "state", "postalCode", "country"].map(
                        (field) => (
                          <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field.replace(/([A-Z])/g, " $1")}
                            value={addressForm[field] || ""}
                            onChange={handleAddressChange}
                            className="w-full border rounded p-2"
                          />
                        )
                      )}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={updateAddressMutation.isPending}
                          className="bg-primary text-white px-4 py-2 rounded"
                        >
                          {updateAddressMutation.isPending ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          className="bg-gray-300 px-4 py-2 rounded"
                          onClick={() => setEditingAddress(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="font-medium">{addr.title || "Address"}</p>
                      <p>
                        {addr.houseNumber}, {addr.street}, {addr.colony}
                      </p>
                      <p>
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                      <p>{addr.country}</p>

                      {/* Edit Button */}
                      <button
                        className="absolute top-2 right-20 text-sm text-primary"
                        onClick={() => {
                          setEditingAddress(addr._id);
                          setAddressForm(addr);
                        }}
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="absolute top-2 right-2 text-sm text-red-500"
                        onClick={() => handleDeleteClick(addr._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mb-4">No addresses found.</p>
          )}

          {/* Add Address Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                <form onSubmit={handleNewAddressSubmit} className="space-y-3">
                  {["houseNumber", "street", "colony", "city", "state", "postalCode", "country"].map(
                    (field) => (
                      <input
                        key={field}
                        type="text"
                        name={field}
                        placeholder={field.replace(/([A-Z])/g, " $1")}
                        value={newAddressForm[field]}
                        onChange={handleNewAddressChange}
                        className="w-full border rounded p-2"
                      />
                    )
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      className="bg-gray-300 px-4 py-2 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={addAddressMutation.isPending}
                      className="bg-primary text-white px-4 py-2 rounded"
                    >
                      {addAddressMutation.isPending ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          <ConfirmationPopup
            isOpen={showConfirm}
            title="Delete Address"
            message="Are you sure you want to delete this address?"
            onConfirm={confirmDelete}
            onCancel={() => setShowConfirm(false)}
          />

          {/* Profile Update Confirmation Popup */}
          <ConfirmationPopup
            isOpen={showProfileConfirm}
            title="Confirm Profile Update"
            message="Are you sure you want to save changes to your profile?"
            onConfirm={confirmProfileUpdate}
            onCancel={() => setShowProfileConfirm(false)}
            confirmButtonText="Save"
          />
        </>
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