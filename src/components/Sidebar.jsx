import { useState } from "react";

function Sidebar() {
  const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which dropdown is open

  const navItems = [
    { name: "Revenue", dropdown: ["Earnings", "Reports", "Invoices"] },
    { name: "Shoppable Video", dropdown: ["Create Video", "Manage Videos"] },
    { name: "Story", dropdown: ["New Story", "Drafts", "Published"] },
    { name: "Live Commerce", dropdown: ["Go Live", "Schedule Live"] },
    {
      name: "Playlist Manager",
      dropdown: ["Product Playlists"],
    },
    { name: "One Click Post", dropdown: ["Create Post", "Post Analytics"] },
    { name: "Calendar", dropdown: ["Events", "Reminders"] },
    {
      name: "Hire Influencer",
      dropdown: ["Find Influencers", "Manage Contracts"],
    },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name)); // Toggles the dropdown
  };

  return (
    <div className="bg-zinc-800 w-[250px] h-screens rounded-2xl mt-2 mb-2 text-white p-4 flex flex-col space-y-4">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-center">
        <h1>blaash</h1>
      </div>

      {/* Navigation Items */}
      <div className="space-y-4">
        {navItems.map((item, index) => (
          <div key={index} className="relative">
            {/* Navigation Button */}
            <button
              onClick={() => toggleDropdown(item.name)}
              className="w-full flex justify-between items-center hover:bg-zinc-700 p-2 rounded-lg cursor-pointer"
            >
              <span>{item.name}</span>
              {/* Up/Down Arrow Toggle */}
              <span>{activeDropdown === item.name ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown Menu */}
            {activeDropdown === item.name && (
              <div className="bg-zinc-700 p-2 rounded-lg shadow-lg space-y-2 mt-2">
                {item.dropdown.map((dropdownItem, i) => (
                  <p
                    key={i}
                    className="hover:bg-zinc-600 p-1 rounded cursor-pointer text-sm"
                  >
                    {dropdownItem}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
