import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are typically processed within 2–3 business days. Delivery generally takes 3–7 working days, depending on your location within India."
  },
  {
    question: "What are the shipping charges?",
    answer:
      "A standard shipping fee of ₹120 applies to all orders. Cash on Delivery (COD) may incur an additional charge, which will be displayed during checkout."
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, we accept returns and exchanges within 7 days of delivery, provided the items are unworn, unwashed, and in their original packaging. Please refer to our Returns Policy for complete details."
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we will send you a tracking number via email. You can use this number to track your shipment through the courier's website."
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, Vellor ships only within India. We are working on expanding our shipping services internationally in the future."
  }
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-52 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-primary font-bold text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQs;
