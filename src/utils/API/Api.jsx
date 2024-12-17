import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:4000/api";

// SignUp API
export const signup = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { email });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

// Verify API
export const verify = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, { email, otp });
    const accestoken = response.data.accestoken || response.data.accestoken;
    if (!accestoken) throw new Error("Token is missing from response!");

    localStorage.setItem("AuthToken", accestoken);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const handleGoogleLogin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/googleLogin`);
    const data = await response.data;
    window.location.href = data.url;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// Google Callback Handler
export const handleGoogleCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/googleCallback?code=${code}`
      );
      const data = await response.data;
      console.log("data", data);
      toast.success(data.message);
      if (data.message === "Google login successful!") {
        localStorage.setItem("googleTokens", JSON.stringify(data.googleTokens));
        localStorage.setItem("Googleemail", data.email);
        toast.success(data.message, { autoClose: 3000 });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};

export const handleYouTubeLogin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/youtubeLogin`);
    const data = await response.data;
    window.location.href = data.url;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const handleYouTubeCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const response = await axios.get(`${API_BASE_URL}/youtubeCallback`, {
        params: { code: code },
      });

      if (response.data.message === "YouTube login successful!") {
        localStorage.setItem(
          "youtubetoken",
          JSON.stringify(response.data.tokens)
        );
        localStorage.setItem("youtubeemail", response.data.email);
        localStorage.setItem(
          "youtubeaccesstoken",
          response.data.youtubeaccesstoken
        );
        localStorage.setItem(
          "channelData",
          JSON.stringify(response.data.channelData)
        );

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};

if (window.location.search.includes("code=")) {
  handleYouTubeCallback();
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  window.history.replaceState({}, document.title, url.pathname);
}
// if (window.location.search.includes("code=")) {
//   handleGoogleLogin();
//   const url = new URL(window.location.href);
//   url.searchParams.delete("code");
//   window.history.replaceState({}, document.title, url.pathname);
// }

// Get Videos API
// export const getVideos = async () => {
//   const youtubetoken = localStorage.getItem("youtubetoken");
//   try {
//     const response = await axios.get("http://localhost:4000/api/getvideos", {
//       headers: { Authorization: `Bearer ${youtubetoken}` },
//     });
//     toast.success(response.data.message);
//     console.log("response", response);
//     return response.data;
//   } catch (error) {
//     toast.error(error.message);
//     console.error("Error fetching videos:", error);
//   }
// };

export const saveLayout = async (reorderedItems) => {
  const token = localStorage.getItem("youtubeaccesstoken");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/savelayout`,
      { layout: reorderedItems },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

// Get Layout API
export const getLayout = async () => {
  const token = localStorage.getItem("youtubeaccesstoken");
  try {
    const response = await axios.get(`${API_BASE_URL}/loadlayout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response.data.message);
    return response.data.layout;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
