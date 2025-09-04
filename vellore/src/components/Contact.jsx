import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createContact } from "../services/contactService";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
const Contact = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleFaqClick = () =>{
        navigate("/about");
    setTimeout(() => {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section className="max-w-[1200px] pt-10 md:pt-16 pb-16 px-6 mx-auto md:mt-40">
      {/* Heading */}
      <div className=" mb-10">
        <h1 className="text-3xl md:text-center md:text-5xl font-bold text-primary">
          Contact Us
        </h1>
        <p className="text-left md:text-center text-gray-600 mt-3 max-w-2xl mx-auto">
          Have questions, feedback, or need help? Our support team is here to assist you. 
          Get in touch with us anytime — we’re committed to making your experience smooth, safe, and satisfying.
        </p>
      </div>

      {/* Layout: Form on left, Info on right */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 md:col-span-2 flex flex-col gap-5"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <p className="font-bold mb-2">Full Name</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-gray-50 p-3 w-full rounded-lg border"
                required
              />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-2">Email Address</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-gray-50 p-3 w-full rounded-lg border"
                required
              />
            </div>
          </div>

          <div>
            <p className="font-bold mb-2">Contact Number</p>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="bg-gray-50 p-3 w-full rounded-lg border"
              required
            />
          </div>

          <div>
            <p className="font-bold mb-2">Message</p>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="bg-gray-50 p-3 w-full rounded-lg border h-40 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="group relative w-full mt-4 py-3 px-6 text-lg rounded-md font-semibold text-white backdrop-blur-md border border-white/30 overflow-hidden shadow-lg shadow-primary/20 transition-all duration-100 ease-in-out active:scale-98 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {mutation.isPending ? "Sending..." : "Send Message"}
            </span>
            <span className="absolute -inset-[200%] bg-gradient-to-r from-primary via-primary-light to-primary blur-3xl group-hover:animate-spin-slow"></span>
            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 rotate-12 group-hover:left-[130%] transition-all duration-[1200ms] ease-in-out blur-md"></span>
          </button>
        </form>

        {/* Right: Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-3">Get In Touch</h2>
            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt /> Pakhowal Road, Ludhiana, Punjab, India - 141001
            </p>
            <p className="flex items-center gap-2 text-gray-700 mt-2">
              <FaPhoneAlt /> +91 98104 46149
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-3">Get Quick Help</h2>
            <p className="text-gray-600 mb-3">
              Explore our FAQs section to get instant answers to your common questions.
            </p>
            <button onClick={handleFaqClick} className="bg-primary text-white px-4 py-2 rounded-lg">
              Visit FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
