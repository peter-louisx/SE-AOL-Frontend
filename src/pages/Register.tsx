import React, { useState } from "react";
import axios from "../api/axios";
import { Store, User } from "lucide-react";
import { toast } from "react-toastify";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Configure Axios base URL (include `/api` in URL)
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface FormData {
  name: string;
  storeName?: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    storeName: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const endpoint =
      userType === "seller" ? "/seller-register" : "/customer-register";

    const payload = {
      name: formData.name,
      phone_number: formData.phone_number,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      ...(userType === "seller" && { store_name: formData.storeName }),
    };

    try {
      await axios.post(endpoint, payload).then(() => {
        window.location.href = "/login";
      });
    } catch (err) {
      toast.error(
        "Registration failed. Please check your input and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        <div className="hidden md:flex justify-center items-center py-12">
          <DotLottieReact 
            src="https://lottie.host/c6f47393-0544-4c9f-b876-822bbcc55b84/QQkLjJEykG.lottie"
            loop
            autoplay
            style={{ height: 300, width: 600 }}
          />
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">
            Register
          </h1>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType("buyer")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
                userType === "buyer"
                  ? "bg-[#609966] text-white border-[#9DC08B]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType("seller")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
                userType === "seller"
                  ? "bg-[#609966] text-white border-[#9DC08B]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Store className="w-5 h-5" />
              <span>Seller</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.join(" ")}</p>
              )}
            </div>

            {userType === "seller" && (
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store Name
                </label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                  required
                />
                {errors.store_name && (
                  <p className="text-red-500 text-sm">
                    {errors.store_name.join(" ")}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.join(" ")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.join(" ")}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.join(" ")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation.join(" ")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-45 bg-[#609966] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors mx-auto block disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#9DC08B] hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
