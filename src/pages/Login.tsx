import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
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

        {/* Login Form Side */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-black text-center">Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-45 bg-[#609966] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors mx-auto block"
            >
              Submit
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
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
