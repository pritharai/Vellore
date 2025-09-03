import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createContact } from "../services/contactService";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
    <section className="max-w-[1560px] md:mt-40 py-10 px-6 mx-auto">
      <div className="flex items-center justify-center md:justify-start px-12 text-primary font-bold pb-5">
        <h1 style={{ fontSize: "clamp(1.3rem, 5vw, 3.5rem)" }}>Contact Us</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-[1350px] p-5 gap-10 md:max-h-[610px] mx-auto flex flex-col md:flex-row"
      >
        {/* Left image */}
        <div className="hidden md:block w-full md:w-1/2">
          {/* <div className="relative h-full">
            <img
              src="https://res.cloudinary.com/dlon1jww2/image/upload/v1755957530/contact-us_t8ho9p.gif"
              alt="Contact us"
              className="rounded-md w-full h-full object-cover"
            />
          </div> */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> Pakhowal Road, Ludhiana, Punjab, India - 141001
            </p>
            <p className="flex items-center gap-2 mt-2">
              <FaPhoneAlt /> +91 98104 46149
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 w-full md:w-1/2 flex items-stretch">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1">
                <p className="font-bold text-[18px] text-primary mb-3">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-gray-50 p-4 w-full rounded-2xl"
                  required
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[18px] text-primary mb-3">
                  E-mail address
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="bg-gray-50 p-4 w-full rounded-2xl"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-[18px] text-primary mb-3">
                Contact Number
              </p>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="bg-gray-50 p-4 w-full rounded-2xl"
                required
              />
            </div>
            <div>
              <p className="font-bold text-[18px] text-primary mb-3">Message</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="bg-gray-50 p-4 w-full resize-none rounded-2xl h-[200px]"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full mt-5 py-3 px-6 text-lg rounded-md font-semibold text-white backdrop-blur-md border border-white/30 overflow-hidden shadow-lg shadow-primary/20 transition-all duration-100 ease-in-out active:scale-98 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {mutation.isPending ? "Sending..." : "Send Message"}
              </span>
              <span className="absolute -inset-[200%] bg-gradient-to-r from-primary via-primary-light to-primary blur-3xl group-hover:animate-spin-slow"></span>
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 rotate-12 group-hover:left-[130%] transition-all duration-[1200ms] ease-in-out blur-md"></span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
