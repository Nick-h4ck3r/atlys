import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AuthTest: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = React.useState("demo@example.com");
  const [password, setPassword] = React.useState("password123");
  const [message, setMessage] = React.useState("");

  const handleLogin = async () => {
    setMessage("Attempting login...");
    try {
      const success = await login(email, password);
      if (success) {
        setMessage("Login successful!");
      } else {
        setMessage("Login failed. Invalid credentials.");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    logout();
    setMessage("Logged out successfully.");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>

      {isAuthenticated ? (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="font-medium">Logged in as:</p>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      )}

      {message && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p>{message}</p>
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-medium mb-2">Test Accounts:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>demo@example.com / password123</li>
          <li>test@user.com / testpass</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthTest;
