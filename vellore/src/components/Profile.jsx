import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = Boolean(localStorage.getItem("accessToken")); // ✅ Added

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data?.user || res.data || {};
        setProfile(userData);
        setAddresses(userData.addresses || []);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleUpdateProfile = () => {
    alert("Update profile API call here");
  };

  const handleChangePassword = () => {
    alert("Change password API call here");
  };

  const handleDeleteAddress = (id) => {
    alert(`Delete address with ID: ${id}`);
  };

  const handleAddAddress = () => {
    alert("Open Add Address form or modal here");
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="px-6 max-w-3xl mx-auto py-54">
      <h1 className="text-3xl text-primary font-bold mb-6">My Profile</h1>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p>
          <strong>Name:</strong> {profile?.name || "—"}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email || "—"}
        </p>

        <button
          onClick={handleUpdateProfile}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition hover:cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition hover:cursor-pointer"
        >
          Change Password
        </button>
      </div>

      {/* Address List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
        {addresses.length === 0 ? (
          <div>
            <p>No addresses found.</p>
            {isLoggedIn && (
              <button
                onClick={handleAddAddress}
                className="bg-primary text-white px-3 py-1 rounded mt-3 hover:bg-primary-hover transition hover:cursor-pointer"
              >
                Add Address
              </button>
            )}
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id || addr.id}
              className="border p-4 rounded mb-3 flex justify-between"
            >
              <div>
                <p>
                  {addr.street}, {addr.city}
                </p>
                <p>
                  {addr.state}, {addr.zip}
                </p>
              </div>
              <button
                onClick={() => handleDeleteAddress(addr._id || addr.id)}
                className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-hover transition hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
