import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";

const SignIn: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials");
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex items-center justify-center px-4 py-6">
        <AuthForm
          formData={formData}
          isLoading={isLoading}
          error={error}
          mode="signin"
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          switchMode={() => navigate("/signup")}
          showLinkOutside={true}
        />
      </div>
    </div>
  );
};

export default SignIn;
