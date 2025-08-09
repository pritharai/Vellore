import { motion } from "framer-motion";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-56 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto p-8 "
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Shipping Policy
        </h1>

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">Vellor</span>, we are committed to delivering your orders in a
          timely and reliable manner. This Shipping Policy outlines the terms,
          timelines, and charges associated with our delivery services.
        </p>

        <div className="space-y-8">
          {/* Shipping Time */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Processing and Delivery Time
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Orders are processed within <strong>2–3 business days</strong> after payment confirmation.</li>
              <li>Delivery is typically completed within <strong>3–7 working days</strong>, depending on your location within India.</li>
            </ul>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Shipping Charges
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>A standard shipping fee of ₹120 applies to all orders.</li>
              <li>Cash on Delivery (COD) services may incur an additional charge, which will be communicated at checkout.</li>
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Order Tracking
            </h2>
            <p className="text-gray-700">
              Once your order has been dispatched, you will receive an email
              containing the tracking number and courier details, enabling you
              to monitor the delivery status.
            </p>
          </section>

          {/* Delays */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Delivery Delays
            </h2>
            <p className="text-gray-700">
              While we make every effort to ensure timely delivery, unforeseen
              circumstances such as adverse weather conditions, courier delays,
              or high order volumes may cause delays. We appreciate your
              understanding and patience in such instances.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ShippingPolicy;
