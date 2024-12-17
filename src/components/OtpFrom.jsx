import React, { useState } from "react";
import axios from "axios";

function OtpForm({ email }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://your-backend-api/verify-otp", {
        email,
        otp,
      });
      if (response.data.success) {
        alert("OTP Verified Successfully!");
      } else {
        alert(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      alert("Failed to verify OTP. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
      <label className="block mb-2 text-gray-300">OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-3 mb-4 border rounded-lg text-black focus:outline-none"
        placeholder="Enter OTP"
        required
      />
      <button
        onClick={handleOtpSubmit}
        disabled={loading}
        className={`w-full ${
          loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
        } text-white font-bold py-2 px-4 rounded`}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}

export default OtpForm;
