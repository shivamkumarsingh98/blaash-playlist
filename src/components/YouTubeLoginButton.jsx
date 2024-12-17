import React from "react";
import { handleYouTubeLogin } from "../utils/API/Api";

const YouTubeLoginButton = () => {
  const handleLogin = async () => {
    try {
      await handleYouTubeLogin();
    } catch (error) {
      console.error("YouTube Login Error:", error);
      alert("YouTube login failed, please try again.");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-red-600 text-white px-4 py-2 rounded mt-5"
    >
      YouTube
    </button>
  );
};

export default YouTubeLoginButton;
