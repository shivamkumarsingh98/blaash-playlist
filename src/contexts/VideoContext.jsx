import React, { createContext, useState, useEffect } from "react";

// Create a context
export const VideoContext = createContext();

// Create a provider component
export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("videos");
    return savedVideos ? JSON.parse(savedVideos) : [];
  });

  const logout = () => {
    localStorage.clear(); // Local storage clear karte hain
    setVideos([]); // Context me videos ko reset karte hain
    window.location.reload();
    console.log("User has been logged out.");
  };

  useEffect(() => {
    if (
      videos &&
      videos.playlistsWithVideosAndThumbnails &&
      videos.playlistsWithVideosAndThumbnails.length > 0
    ) {
      localStorage.setItem("videos", JSON.stringify(videos));
    }
  }, [videos]);
  return (
    <VideoContext.Provider value={{ videos, setVideos, logout }}>
      {children}
    </VideoContext.Provider>
  );
};
