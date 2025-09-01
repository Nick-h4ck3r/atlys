import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";

const SignUp: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup(formData.email, formData.password);
      if (success) {
        navigate("/");
      } else {
        setError("Email already exists");
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
          mode="signup"
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          switchMode={() => navigate("/signin")}
          showLinkOutside={true}
        />
      </div>
    </div>
  );
};

export default SignUp;
