import { motion } from "framer-motion";

const Refund = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-56 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Refund, Return & Cancellation Policy
        </h1>

        <p className="text-gray-600 mb-6">
          At <span className="font-semibold">Vellor</span>, we prioritize your satisfaction. If you're not completely happy with your purchase, we're here to help.
        </p>

        <div className="space-y-8">
          {/* Returns Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Returns Eligibility
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Return requests must be initiated within <strong>7 days</strong> of delivery.</li>
              <li>Items must be unused, unwashed, and with original tags attached.</li>
              <li>Only regular-priced items are eligible for return. Sale items are non-returnable unless damaged or defective.</li>
            </ul>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Return Process
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Email us at <strong>thevellor20@gmail.com</strong> with your order number and reason for return.</li>
              <li>Once approved, you'll receive a return shipping address.</li>
              <li>Customers are responsible for return shipping charges unless the product is defective.</li>
            </ul>
          </section>

          {/* Refunds */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Refunds
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Once we receive and inspect the item, refunds will be processed within <strong>7–10 business days</strong>.</li>
              <li>Refunds will be issued to your original payment method.</li>
            </ul>
          </section>

          {/* Exchange */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Exchange
            </h2>
            <p className="text-gray-700">
              We offer exchanges only for size issues. Please email us with your order details for assistance.
            </p>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. Cancellation Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Orders can be cancelled within <strong>24 hours</strong> of placing the order.</li>
              <li>Once the order has been shipped, it cannot be cancelled.</li>
              <li>For Order Cancellation please mention a detailed reason. </li>
              <li>Refunds for cancelled orders will be processed to the original payment method within <strong>5–7 business days</strong>.</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Refund;
