import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { AuthMode } from "../types";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signin",
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let success = false;

      if (mode === "signin") {
        success = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.repeatPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        success = await signup(formData.email, formData.password);
      }

      if (success) {
        onClose();
        setFormData({ email: "", password: "", repeatPassword: "" });
      } else {
        setError(
          mode === "signin" ? "Invalid credentials" : "Email already exists"
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setError("");
    setFormData({ email: "", password: "", repeatPassword: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay fixed inset-0 flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="max-w-md w-full mx-4 bg-[#EBEBEB] rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AuthForm
              formData={formData}
              isLoading={isLoading}
              error={error}
              mode={mode}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              switchMode={switchMode}
              showLinkOutside={true}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
