import React from "react";

interface FormData {
  email: string;
  password: string;
  repeatPassword?: string;
}

interface AuthFormProps {
  formData: FormData;
  isLoading: boolean;
  error: string;
  mode: "signin" | "signup";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  switchMode?: () => void;
  showLinkOutside?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formData,
  isLoading,
  error,
  mode,
  handleInputChange,
  handleSubmit,
  switchMode,
  showLinkOutside = false,
}) => {
  const renderContent = () => (
    <>
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mode === "signin"
                  ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              }
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center text-black mb-1">
        {mode === "signin"
          ? "Sign in to continue"
          : "Create an account to continue"}
      </h2>

      <p className="text-center text-sm text-[#0000007A] mb-6 font-normal">
        {mode === "signin"
          ? "Sign in to access all the features on this app"
          : "Create an account to access all the features on this app"}
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-14 mb-8 flex flex-col items-center"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-black mb-1"
          >
            Email or username
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email or username"
            className="w-[377px] h-[46px] bg-[#F4F4F4] rounded-[11px] px-3 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black placeholder:text-[#0000007A] font-normal"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-[377px] h-[46px] bg-[#F4F4F4] rounded-[11px] px-3 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black placeholder:text-[#0000007A] font-normal"
            required
          />
        </div>

        {mode === "signup" && (
          <div>
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-black mb-1"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword || ""}
              onChange={handleInputChange}
              placeholder="Enter your password again"
              className="w-[377px] h-[46px] bg-[#F4F4F4] rounded-[11px] px-3 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black placeholder:text-[#0000007A] font-normal"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-[377px] h-[50px] bg-[#5057EA] text-white rounded-[11px] font-inter font-semibold text-[14px] leading-[21px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* Switch Mode Button (inside form) */}
      {switchMode && !showLinkOutside && (
        <div className="text-center mt-4">
          <span className="text-[#00000099] text-sm font-medium mr-1">
            {mode === "signin"
              ? "Do not have an account?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={switchMode}
            className="text-[#5057EA] hover:text-[#5057EA]/80 font-semibold text-sm transition-colors duration-200"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      )}
    </>
  );

  // Render with container
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="rounded-[21px] bg-[#00000008] p-[7px]">
        <div className="bg-white border border-gray-200 rounded-[18px] p-6">
          {renderContent()}
        </div>

        {/* Switch Mode Link (outside form) */}
        {switchMode && showLinkOutside && (
          <div className="text-center my-2">
            <span className="text-[#00000099] text-sm font-medium mr-1">
              {mode === "signin"
                ? "Do not have an account?"
                : "Already have an account?"}
            </span>
            <button
              onClick={switchMode}
              className="text-[#5057EA] hover:text-[#5057EA]/80 font-semibold text-sm transition-colors duration-200"
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
