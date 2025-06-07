import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PenSquare,
  Trash2,
  User,
  ShoppingBag,
  Ticket,
  Recycle,
} from "lucide-react";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ProfileSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-pulse">
    {/* Sidebar Skeleton */}
    <div className="md:col-span-3">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
    {/* Profile & Addresses Skeleton */}
    <div className="md:col-span-6 space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-100 rounded mb-1" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-4 w-24 bg-gray-100 rounded mb-1 mt-4" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-4 w-32 bg-gray-100 rounded mb-1 mt-4" />
          <div className="h-10 bg-gray-100 rounded-lg" />
          <div className="h-10 w-24 bg-gray-200 rounded-lg mt-4" />
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="h-6 w-32 bg-gray-200 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-3 py-1 bg-gray-200 rounded-md w-16 h-6" />
                <div className="h-4 w-32 bg-gray-100 rounded" />
              </div>
              <div className="h-4 w-40 bg-gray-100 rounded mb-3" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
          <div className="w-full border-2 border-dashed border-gray-200 py-3 rounded-lg h-12" />
        </div>
      </div>
    </div>
    {/* Profile Picture Skeleton */}
    <div className="md:col-span-3">
      <div className="bg-white rounded-lg p-6 shadow-sm text-center">
        <div className="w-48 h-48 rounded-full bg-gray-200 mx-auto mb-4" />
        <div className="h-10 w-full bg-gray-100 rounded-lg mb-2" />
        <div className="h-10 w-full bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-32 bg-gray-100 rounded mx-auto mt-2" />
      </div>
    </div>
  </div>
);

export default function CustomerAccount() {
  const [user, setUser] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userRes = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!userRes.ok) {
        localStorage.removeItem("auth_token");
        navigate("/login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData);
      setProfileForm({
        name: userData.name || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
      });

      // Fetch addresses (POST method per API)
      const addressRes = await fetch(
        "http://localhost:8000/api/show-customer-address",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (addressRes.ok) {
        const addressData = await addressRes.json();
        setAddresses(addressData);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      localStorage.removeItem("auth_token");
      navigate("/login");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleLogout = async () => {
    await axios
      .post("/logout")
      .then(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        toast.success("Logged out successfully");
        //time out for 0.5 seconds
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    try {
      const res = await fetch(
        "http://localhost:8000/api/edit-customer-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileForm),
        }
      );
      const data = await res.json();
      alert(data.message || "Profile updated");
      fetchUser();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!profileImage) {
      alert("Please choose an image first");
      return;
    }
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append("profile", profileImage);

    const res = await fetch(
      "http://localhost:8000/api/customer-profile-picture",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    const data = await res.json();
    alert(data.message || "Profile picture updated");
    setProfileImage(null);
    fetchUser();
  };

  const handleAddressDelete = async (id: number) => {
    const token = localStorage.getItem("auth_token");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    // Use POST per API route
    const res = await fetch(
      `http://localhost:8000/api/delete-customer-address/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    if (res.ok) {
      fetchUser();
    } else {
      alert("Failed to delete address");
    }
  };

  const handleAddAddress = async () => {
    const label = prompt("Label? (e.g., Home)");
    const address = prompt("Address?");
    if (!label || !address) return alert("Label and Address required");
    const token = localStorage.getItem("auth_token");

    const res = await fetch("http://localhost:8000/api/add-customer-address", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label, address }),
    });
    if (res.ok) {
      fetchUser();
    } else {
      alert("Failed to add address");
    }
  };

  const handleEditAddress = async (
    id: number,
    currentLabel: string,
    currentAddress: string
  ) => {
    const label = prompt("New label:", currentLabel);
    const address = prompt("New address:", currentAddress);
    if (!label || !address)
      return alert("Both label and address are required.");

    const token = localStorage.getItem("auth_token");

    const res = await fetch(
      `http://localhost:8000/api/edit-customer-address/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label, address }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert(data.message || "Address updated");
      fetchUser();
    } else {
      alert(data.error || "Failed to update address");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <img
                    src={
                      user?.profile
                        ? `http://localhost:8000/storage/public/${user.profile}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {user?.name || "Guest"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {user?.customer ? "Premium Member" : "Visitor"}
                    </p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <a href="/account">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#9DC08B] bg-opacity-10 rounded-lg cursor-pointer">
                      <User className="w-5 h-5" />
                      <span>My Account</span>
                    </button>
                  </a>
                  <a href="/order">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <ShoppingBag className="w-5 h-5" />
                      <span>My Orders</span>
                    </button>
                  </a>
                  <a href="/voucher">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Ticket className="w-5 h-5" />
                      <span>My Vouchers</span>
                    </button>
                  </a>
                  <a href="/upcycle-requests">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Recycle className="w-5 h-5" />
                      <span>Upcycle Requests</span>
                    </button>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Profile & Addresses */}
            <div className="md:col-span-6">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h3 className="text-xl font-semibold mb-6 text-black">
                  Personal Profile
                </h3>
                <form className="space-y-4" onSubmit={handleProfileSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={profileForm.phone_number}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9DC08B] focus:border-transparent text-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#9DC08B] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Save
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-black">
                  Address
                </h3>
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-[#9DC08B] bg-opacity-10 text-white rounded-md text-sm">
                            {address.label}
                          </span>
                          <span className="text-gray-700">
                            {user.name} | {user.phone_number}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{address.address}</p>
                        <div className="flex items-center gap-2">
                          {/* Edit button placeholder - add edit functionality if you want */}
                          <button
                            onClick={() =>
                              handleEditAddress(
                                address.id,
                                address.label,
                                address.address
                              )
                            }
                            className="text-gray-600 hover:text-[#9DC08B]"
                          >
                            <PenSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAddressDelete(address.id)}
                            className="text-gray-600 hover:text-red-500"
                            type="button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No address available.</p>
                  )}
                  <button
                    onClick={handleAddAddress}
                    className="w-full border-2 border-dashed border-[#9DC08B] text-[#9DC08B] py-3 rounded-lg hover:bg-[#9DC08B] hover:text-white hover:bg-opacity-5 transition-colors"
                    type="button"
                  >
                    + Add New Address
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <img
                  src={
                    user?.profile
                      ? `http://localhost:8000/storage/public/${user.profile}`
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="profileImageInput"
                  onChange={(e) =>
                    setProfileImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="hidden"
                />
                <label
                  htmlFor="profileImageInput"
                  className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Choose Image
                </label>
                <button
                  onClick={handleProfilePictureUpload}
                  className="mt-2 w-full bg-[#9DC08B] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                  type="button"
                >
                  Upload
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Max. 10 MB (*.JPG, *.PNG)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
