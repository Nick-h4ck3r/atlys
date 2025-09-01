import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AuthTest: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = React.useState("demo@example.com");
  const [password, setPassword] = React.useState("password123");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("Attempting login...");
    try {
      const success = await login(email, password);
      if (success) {
        setMessage("Login successful!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setMessage("Login failed. Invalid credentials.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage("Logged out successfully.");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 animate-fade-in">
        Authentication Test
      </h2>

      {isAuthenticated ? (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-slide-in-up">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="font-semibold text-green-800">Logged in as:</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-center space-x-2">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-800">{user?.name}</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">{user?.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-6 space-y-4 animate-slide-in-up">
          <div className="group">
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="group">
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      )}

      {message && (
        <div className={`mt-6 p-4 rounded-xl border transition-all duration-500 animate-slide-in-up ${
          showSuccess 
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800" 
            : "bg-gray-50 border-gray-200 text-gray-700"
        }`}>
          <div className="flex items-center space-x-2">
            {showSuccess && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <p className="font-medium">{message}</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 animate-fade-in-delayed">
        <h3 className="font-semibold mb-3 text-blue-800 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Test Accounts</span>
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>demo@example.com / password123</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>test@user.com / testpass</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthTest;
