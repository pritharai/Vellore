// components/Footer.jsx
import { FaInstagram, FaTwitter, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-primary py-12 px-6 sm:px-12 shadow-[0_-6px_12px_-2px_rgba(0,0,0,0.1)] max-w-[1560px] mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          {/* <h2 className="text-2xl font-semibold tracking-wide text-primary" style={{ fontFamily: 'Brittany Signature' }}>Vellor</h2>
          <p className="text-sm text-primary-gradient mt-3">
            Every Fit Tells a Story
          </p> */}
          <img src="/images/logo_full_1.jpg" alt="Vellor Logo" className="w-48 mb-4" />
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Support</h3>
          <ul className="space-y-2 text-primary-gradient text-sm">
            <li>
              <Link to="/contact" className="hover:text-primary-light transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-primary-light transition">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary-light transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund" className="hover:text-primary-light transition">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <a href="/terms" className="hover:text-primary-light transition">
                Terms & Conditions
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-primary-light transition">
                Privacy Policy
              </a>
            </li> */}
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary ">Stay Connected</h3>
          {/* <form className="flex items-center space-x-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent border border-primary-light rounded-full text-sm placeholder-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-light text-white hover:text-primary rounded-full text-sm hover:bg-white hover:border-1 transition hover:cursor-pointer"
            >
              Subscribe
            </button>
          </form> */}

          <div className="flex space-x-4 text-primary-light text-xl">
            <a href="#" className="hover:text-primary-light transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary-light transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary-light transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary-light transition">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-primary">
        &copy; {new Date().getFullYear()} Vellor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
