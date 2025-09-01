import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Check if we're on signin or signup pages
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 animate-slide-in-down">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300 group-hover:stroke-blue-600"
            >
              <path
                d="M22.6667 17H19.8333M2.83333 17V17C2.83333 23.2592 7.90745 28.3333 14.1667 28.3333H19.8333C26.0926 28.3333 31.1667 23.2592 31.1667 17V17C31.1667 10.7408 26.0925 5.66667 19.8333 5.66667H14.1667C7.90744 5.66667 2.83333 10.7408 2.83333 17Z"
                stroke="black"
                stroke-width="3.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-[#000000CF] transition-colors duration-300 group-hover:text-blue-600">foo-rum</span>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3 animate-fade-in">
              <span className="text-sm text-gray-600 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Welcome, {user?.name}</span>
              </span>
              <button
                onClick={logout}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-all duration-200 hover:scale-105 relative group"
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute inset-0 bg-blue-100 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 animate-fade-in">
              <Link
                to={isAuthPage ? "/" : "/signin"}
                className="text-[#000000CF] font-semibold text-sm transition-all duration-200 hover:text-blue-600 hover:scale-105 relative group"
              >
                <span className="relative z-10">{isAuthPage ? "Back to home" : "Login"}</span>
                <span className="absolute inset-0 bg-blue-100 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
