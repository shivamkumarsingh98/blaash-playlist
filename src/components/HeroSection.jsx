import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-black text-white p-2 rounded-md flex justify-between items-center">
      <h3 className="text-xl font-semibold">Product Playlists</h3>
      <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-5 py-3 rounded transition duration-300">
        <span className="mr-1 mt-2">🔗</span> Generate Code
      </button>
    </div>
  );
};

export default HeroSection;
