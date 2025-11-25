import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="mb-6">
      <div className="rounded-[20px] bg-emerald-50/90 px-6 py-3 flex items-center">
        
        {/* LOGO */}
        <div className="mr-6">
          <img
            src="/logo.png"
            alt="Navkalpit Logo"
            className="w-19 h-19 object-contain"
          />
        </div>

        {/* CENTER NAV LINKS */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex gap-8 text-sm text-slate-800 font-medium">
            <li><Link to="/service">Service</Link></li>
            <li><Link to="/technology">Technology</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/support">Customer Care</Link></li>
          </ul>
        </nav>

        {/* RIGHT SECTION — Login + Cart */}
        <div className="flex items-center gap-4">
          
          {/* LOGIN USING LINK */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-slate-800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-1"
            >
              <path
                d="M12 12a4 4 0 100-8 4 4 0 000 8z"
                stroke="#0f172a"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"
                stroke="#0f172a"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log In
          </Link>

          {/* CART BUTTON USING NAVIGATE */}
          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="w-8 h-8 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 text-sm"
            >
              🛒
            </button>

            <span className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
