import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/API/Api";
import GoogleLoginButton from "../components/GoogleLoginButton";
import YouTubeLoginButton from "../components/YouTubeLoginButton";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState(""); // To store email
  const [loading, setLoading] = useState(false); // To show loading spinner on button
  const [error, setError] = useState(""); // To show error messages
  const navigate = useNavigate(); // Navigation hook

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

  // Function to handle OTP sending
  const handleSendOtp = async () => {
    // Reset error state
    setError("");

    // Validate email
    if (!email) {
      setError("Email field cannot be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await signup(email);

      console.log("Signup API response:", response); // Debugging

      if (response && response.message) {
        // Clear error, show success alert, and navigate to OTP verification page
        console.log("response", response);
        setError("");
        navigate("/OtpVerification", { state: { email } }); // Redirect with email
      } else if (response && response.message) {
        console.log("Error message:", response.message);
        setError(response.message); // Use server-provided error message
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error during signup:", error);

      // Handle network errors or server issues
      if (error.response && error.response.data) {
        setError(
          error.response.data.message || "Error sending OTP. Try again."
        );
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Playlist Web App</h1>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-white relative">
          {/* Form Title */}
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          {/* OAuth Buttons */}
          <div className="flex justify-between mb-6">
            <GoogleLoginButton />
            <YouTubeLoginButton
              className="w-[38%]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="text-red-500 text-center mb-4 border border-red-500 p-2 rounded bg-red-900"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Email Form */}
          <div>
            <label className="block mb-2 text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg text-black focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
