import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductPlaylist from "./components/ProductPlaylist";
import VideoSlider from "./components/VideoSlider"; // Import the VideoSlider component
import HeroSection from "./components/HeroSection";
import SignupForm from "./pages/SignupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerification from "./pages/OtpVerification";
import { VideoProvider } from "./contexts/VideoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Layout for main components
function MainLayout({ children }) {
  return (
    <div className="flex w-full h-full bg-black">
      <Sidebar />
      <div className="flex flex-col flex-grow py-2 px-4">
        <Header />
        <HeroSection />
        <div className="flex-grow flex">
          <div className="flex-grow py-6 px-4">
            <ProductPlaylist />
          </div>
          <div>
            <VideoSlider />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <VideoProvider>
      <Router>
        <Routes>
          {/* Main Layout with Sidebar and Header */}
          <Route path="/" element={<MainLayout />} />

          {/* SignupForm route without Sidebar/Header */}
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/OtpVerification" element={<OtpVerification />} />
        </Routes>
      </Router>
      <ToastContainer />
    </VideoProvider>
  );
}

export default App;
