// components/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes Vellor different from other fashion brands?",
    answer:
      "Vellor focuses on intentional design — minimalist, comfortable, and made to last. We prioritize breathable fabrics, timeless fits, and sustainability over fast trends.",
  },
  {
    question: "Are your T-shirts unisex?",
    answer:
      "Yes, all our T-shirts are designed to be gender-neutral with relaxed oversized fits that suit all body types.",
  },
  {
    question: "How should I wash and care for Vellor pieces?",
    answer:
      "Machine wash cold with like colors, and avoid using bleach. Hang dry or tumble dry on low. Our garments are pre-shrunk for lasting fit.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we ship across India. International shipping options will be available soon — stay tuned!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-[1560px] py-20 px-6 bg-[#fef9f6] text-primary md:h-[660px]">
      <div className="mx-auto max-w-[1280px]">
        <h2
          className="text-4xl font-extrabold text-center mb-12"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex gap-5 items-center justify-between p-5 text-left"
              >
                <span className="text-lg font-medium text-primary">
                  {faq.question}
                </span>
                <ChevronDown size={20}
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="px-5 pb-5 text-gray-700 text-base font-[400]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
