import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-56 px-6 sm:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold">Vellor</span>. By using our
          website and services, you agree to comply with the following Terms and
          Conditions. Please read them carefully as they govern your use of our
          services, purchases, and interactions with us.
        </p>

        <div className="space-y-10">
          {/* Shipping Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Shipping Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Orders are processed within <strong>2–3 business days</strong>{" "}
                after payment confirmation.
              </li>
              <li>
                Delivery is typically completed within{" "}
                <strong>3–7 working days</strong> depending on location within
                India.
              </li>
              <li>
                A standard shipping fee of <strong>₹120</strong> applies to all
                orders. COD may incur additional charges, communicated at
                checkout.
              </li>
              <li>
                Tracking details will be emailed once your order has been
                dispatched.
              </li>
              <li>
                Delivery delays may occur due to weather, courier issues, or
                high order volumes.
              </li>
            </ul>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Privacy Policy
            </h2>
            <p className="text-gray-700 mb-3">
              At Vellor, we value your privacy and ensure your personal
              information is protected.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                We collect personal details (name, email, phone, address),
                payment details (secured via third-party gateways), and browsing
                behavior (via cookies/analytics).
              </li>
              <li>
                Information is used to process orders, send updates, and
                personalize shopping experiences.
              </li>
              <li>
                You may opt out of promotional emails at any time.
              </li>
              <li>
                Your information is stored securely and never sold. It is shared
                only for order processing or legal obligations.
              </li>
            </ul>
          </section>

          {/* Refund, Return & Cancellation Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Refund, Return & Cancellation Policy
            </h2>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">
              Returns Eligibility
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Initiate return requests within 7 days of delivery.</li>
              <li>
                Items must be unused, unwashed, and with original tags intact.
              </li>
              <li>
                Sale items are non-returnable unless damaged or defective.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">
              Return Process
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Email us at <strong>thevellor20@gmail.com</strong> with your
                order number and reason.
              </li>
              <li>Once approved, a return shipping address will be shared.</li>
              <li>
                Return shipping costs are the customer’s responsibility unless
                the item is defective.
              </li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">Refunds</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Refunds are processed within 7–10 business days after inspection
                of returned items.
              </li>
              <li>Refunds are issued to the original payment method.</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">Exchanges</h3>
            <p className="text-gray-700">
              Exchanges are available only for size-related issues.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">
              Cancellation Policy
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Orders may be cancelled within 24 hours of placing the order.
              </li>
              <li>
                Orders already shipped cannot be cancelled. Refunds for eligible
                cancellations are processed within 5–7 business days.
              </li>
            </ul>
          </section>

          {/* General Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. General Terms
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                By placing an order with Vellor, you confirm that the details
                you provide are accurate and complete.
              </li>
              <li>
                Vellor reserves the right to update these terms at any time. It
                is your responsibility to review them periodically.
              </li>
              <li>
                Any disputes shall be governed under the laws of India with
                jurisdiction in the appropriate courts.
              </li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
