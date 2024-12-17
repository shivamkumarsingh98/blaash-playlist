import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ImportYoutubeButton from "../components/ImportYoutubeButton";
import { VideoContext } from "../contexts/VideoContext";
import { SlArrowDown } from "react-icons/sl";
import { SiRedux } from "react-icons/si";

function Header() {
  const { logout } = useContext(VideoContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-zinc-800 text-white flex items-center justify-between px-5 py-4 w-full h-[80px] rounded-2xl shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          <h1>Design Studio</h1>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <nav className="flex space-x-4">
          <a
            href="#"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Support Request
          </a>
          <a
            href="#"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Product Tour
          </a>
        </nav>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Project..."
            className="bg-zinc-700 text-sm text-white px-4 py-2 rounded-lg focus:outline-none"
          />
          <button className="absolute right-2 top-2">🔍</button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ImportYoutubeButton />
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center cursor-pointer space-x-2"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-zinc-600"
            />
            <span className="text-sm flex items-center">
              Leonardo Developer
              <SlArrowDown className="ml-1 text-white" />
            </span>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-700 rounded-lg shadow-lg text-sm z-10">
              <Link
                to="/SignupForm"
                className="block px-4 py-2 hover:bg-zinc-600 rounded-b-lg"
              >
                Signup
              </Link>
              <a
                href="#"
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-zinc-600 rounded-t-lg"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
