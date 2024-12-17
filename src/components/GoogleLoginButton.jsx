import React from "react";
import { handleGoogleLogin } from "../utils/API/Api";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const handleLogin = async () => {
    try {
      await handleGoogleLogin();
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed, please try again.");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-red-600 text-white px-4 py-2 rounded mt-5"
    >
      Google
    </button>
  );
};

export default GoogleLoginButton;
