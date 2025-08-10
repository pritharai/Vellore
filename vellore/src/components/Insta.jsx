// components/InstagramButton.jsx
import { FaInstagram } from "react-icons/fa";

const InstagramButton = () => {
  return (
    <a
      href="https://www.instagram.com/the.vellor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 text-pink-500 text-5xl animate-pulse hover:scale-110 transition-transform duration-300"
      style={{ filter: "drop-shadow(0 0 8px rgba(255, 105, 180, 0.7))" }}
    >
      <FaInstagram />
    </a>
  );
}

export default InstagramButton;

