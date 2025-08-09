import { motion } from "framer-motion";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-50 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
          Vellor – Shipping Policy
        </h1>

        <p className="text-gray-600 mb-6">
          We deliver fashion right to your doorstep with reliable and timely shipping.
        </p>

        <div className="space-y-8">
          {/* Shipping Time */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">📦 Shipping Time</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Orders are processed within <strong>2–3 business days</strong>.</li>
              <li>Delivery usually takes <strong>3–7 working days</strong>, depending on your location in India.</li>
            </ul>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">💰 Shipping Charges</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>A standard shipping fee of ₹120 applies to all orders.</li>
              <li>Cash on Delivery (COD) may attract an additional fee.</li>
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">📍 Tracking</h2>
            <p className="text-gray-700">
              Once your order is shipped, you'll receive a tracking number via email.
            </p>
          </section>

          {/* Delays */}
          <section>
            <h2 className="text-xl font-semibold text-primary mb-2">⏳ Delays</h2>
            <p className="text-gray-700">
              While we strive to deliver on time, delays may occur due to weather, courier issues, or high order volumes.
              We appreciate your patience and understanding.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ShippingPolicy;
