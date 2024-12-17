import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../contexts/VideoContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImportYoutubeButton = () => {
  const { setVideos } = useContext(VideoContext);
  const navigate = useNavigate();

  const handleImportClick = async () => {
    const youtubetoken = localStorage.getItem("youtubetoken");

    // if (!youtubetoken) {
    //   navigate("/SignupForm");
    //   return;
    // }

    try {
      const response = await axios.get("http://localhost:4000/api/getvideos", {
        headers: { Authorization: `Bearer ${youtubetoken}` },
      });
      toast.success(response.data.message);
      setVideos(response.data);
      console.log("Videos:", response.data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handleImportClick}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Import
      </button>
    </div>
  );
};

export default ImportYoutubeButton;
