import React, { useState } from 'react';
import { Store, User } from 'lucide-react';

export default function Register() {
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [formData, setFormData] = useState({
    fullName: '',
    storeName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt:', { userType, ...formData });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration Side */}
        <div className="hidden md:block">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frelprod.relianceanimation.in%2Fdist%2Fimages%2Flogin_illustration1.png&f=1&nofb=1&ipt=e22be1d21714585a8ddb994e5c64a392dc80177244bffc71975c9e2a3e53441a"
            alt="Eco-friendly illustration"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Registration Form Side */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">Register</h1>

          {/* User Type Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType('buyer')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
                userType === 'buyer'
                  ? 'bg-[#609966] text-white border-[#9DC08B]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('seller')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border transition-colors ${
                userType === 'seller'
                  ? 'bg-[#609966] text-white border-[#9DC08B]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Store className="w-5 h-5" />
              <span>Seller</span>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
            </div>

            {userType === 'seller' && (
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
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
              </div>
            )}

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-[#9DC08B] bg-opacity-30 border border-[#9DC08B] focus:outline-none focus:ring-2 focus:ring-[#9DC08B]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-45 bg-[#609966] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors mx-auto block"
            >
              Submit
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
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