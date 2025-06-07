import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Configure axios base URL (include /api prefix)
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
      const role = response.data.role;

      // Save token for subsequent requests
      localStorage.setItem("auth_token", token);
      navigate("/");

      if (role == "seller") {
        localStorage.setItem("role", "seller");
        navigate("/seller/dashboard");
      } else {
        localStorage.setItem("role", "customer");
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        {/* Illustration Side */}
        <div className="hidden md:flex justify-center items-center py-12">
          <DotLottieReact 
            src="https://lottie.host/c6f47393-0544-4c9f-b876-822bbcc55b84/QQkLjJEykG.lottie"
            loop
            autoplay
            style={{ height: 300, width: 600 }}
          />
        </div>

        {/* Login Form Side */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">
            Login
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-45 bg-[#609966] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors mx-auto block disabled:opacity-50"
            >
              {submitting ? "Logging in..." : "Submit"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-[#9DC08B] hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
