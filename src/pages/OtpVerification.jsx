import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify } from "../utils/API/Api";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; 

  const [otp, setOtp] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 


  useEffect(() => {
    if (!email) {
      setError("Invalid access. Please go back and try again.");
    }
  }, [email]);

  
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP (minimum 4 digits).");
      return;
    }

    try {
      setLoading(true); 
      setError(""); 

      const response = await verify(email, otp);
      console.log("Verify API response:", response); 

      if (response && response.message) {
        navigate("/"); 
      } else {
       
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error);

      // Display appropriate error message
      if (error.response) {
        setError(error.response.data?.message || "Server error occurred.");
      } else if (error.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading indicator
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
          <h2 className="text-3xl font-bold mb-6 text-center">Enter OTP</h2>

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-500 text-white text-center py-2 px-4 rounded mb-4"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* OTP Form */}
          <div>
            <label className="block mb-2 text-gray-300">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg text-black focus:outline-none"
              placeholder="Enter OTP"
              maxLength="6"
              required
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
              className={`w-full ${
                loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
