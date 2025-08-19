import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-56 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">Vellor</span>, your privacy is important to us. We are committed to protecting your personal data and ensuring a safe shopping experience.
        </p>

        <div className="space-y-8">
          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Personal details like name, email, phone number, and address.</li>
              <li>Payment details (processed securely via third-party payment gateways).</li>
              <li>Browsing behavior on our website (via cookies and analytics tools).</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>To process your orders and deliver products.</li>
              <li>To send order updates and promotional emails (you can opt out anytime).</li>
              <li>To enhance your shopping experience through personalization.</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Data Protection
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Your information is stored securely.</li>
              <li>We do not sell or share your data with third parties except for order processing and legal obligations.</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
