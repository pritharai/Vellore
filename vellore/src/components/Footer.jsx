// components/Footer.jsx
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6 sm:px-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-semibold tracking-wide text-tertiary">Vellor</h2>
          <p className="text-sm text-tertiary-gradient mt-3">
            Timeless, breathable fashion — made to last.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-tertiary">Shop</h3>
          <ul className="space-y-2 text-tertiary-gradient text-sm">
            <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition">Men</a></li>
            <li><a href="#" className="hover:text-white transition">Women</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-tertiary">Support</h3>
          <ul className="space-y-2 text-tertiary-gradient text-sm">
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-tertiary">Stay Connected</h3>
          <form className="flex items-center space-x-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent border border-tertiary-gradient rounded-full text-sm placeholder-tertiary-gradient focus:outline-none focus:ring-1 focus:ring-tertiary-gradient"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-tertiary-gradient text-primary rounded-full text-sm hover:bg-white transition"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 text-tertiary-gradient text-xl">
            <a href="#" className="hover:text-tertiary-gradient transition"><FaInstagram /></a>
            <a href="#" className="hover:text-tertiary-gradient transition"><FaTwitter /></a>
            <a href="#" className="hover:text-tertiary-gradient transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-tertiary-gradient transition"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-tertiary">
        &copy; {new Date().getFullYear()} Vellor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
