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
// import ConfirmationPopup from "../components/ConfirmationPopup";

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
    updateProfileMutation.mutate(formData);
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
                      {["houseNumber", "street", "colony", "city", "state", "postalCode", "country"].map((field) => (
                        <input
                          key={field}
                          type="text"
                          name={field}
                          placeholder={field.replace(/([A-Z])/g, " $1")}
                          value={addressForm[field] || ""}
                          onChange={handleAddressChange}
                          className="w-full border rounded p-2"
                        />
                      ))}
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
                  {["houseNumber", "street", "colony", "city", "state", "postalCode", "country"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={newAddressForm[field]}
                      onChange={handleNewAddressChange}
                      className="w-full border rounded p-2"
                    />
                  ))}
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

          {/* ✅ Delete Confirmation Popup */}
          <ConfirmationPopup
            isOpen={showConfirm}
            title="Delete Address"
            message="Are you sure you want to delete this address?"
            onConfirm={confirmDelete}
            onCancel={() => setShowConfirm(false)}
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
