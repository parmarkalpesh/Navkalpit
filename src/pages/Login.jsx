import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      return setError("Enter a valid email");
    }
    if (!password) {
      return setError("Enter your password");
    }

    setError(null);
    alert("Logged in (demo)");
    console.log({ email, password });
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-black text-slate-100 py-20">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Log In</h2>
          <p className="text-sm text-slate-400 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-sm text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-slate-900 border border-slate-700"
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-rose-400 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-slate-900 font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm text-slate-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-300">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
