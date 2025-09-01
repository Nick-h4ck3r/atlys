import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test accounts as specified in requirements
const TEST_ACCOUNTS = [
  { email: "demo@example.com", password: "password123", name: "Demo User" },
  { email: "test@user.com", password: "testpass", name: "Test User" },
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("foo-rum-user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const testAccount = TEST_ACCOUNTS.find(
      (account) => account.email === email && account.password === password
    );

    if (testAccount) {
      const userData: User = {
        id: `user-${Date.now()}`,
        name: testAccount.name,
        email: testAccount.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          testAccount.name
        )}&background=random`,
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("foo-rum-user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const signup = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    const existingAccount = TEST_ACCOUNTS.find(
      (account) => account.email === email
    );
    if (existingAccount) {
      return false;
    }

    // Create new user
    const userData: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0], // Use email prefix as name
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        email.split("@")[0]
      )}&background=random`,
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("foo-rum-user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("foo-rum-user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
