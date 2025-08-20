import { useLocation, Link } from "react-router-dom";

const ThankYou = () => {
  const { state } = useLocation();
  const order = state?.order;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format address
  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { houseNumber, street, colony, city, state, country, postalCode } = address;
    return `${houseNumber}, ${street}, ${colony}, ${city}, ${state}, ${country} - ${postalCode}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 lg:py-54">
      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-8 text-center">
        {/* Thank You Icon */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-600 mt-2">
          We appreciate your trust in our brand.
        </p>

        {/* Latest Order Info */}
        {order ? (
          <div className="mt-6 border rounded-lg p-4 bg-gray-50 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Order Details
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Payment Method:</strong>{" "}
              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Expected Delivery:</strong>{" "}
              {formatDate(order.expectedDelivery)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Shipping Address:</strong> {formatAddress(order.shippingAddress)}
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Items:</h3>
              <ul className="divide-y divide-gray-200 mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.variant?.product.name} ({item.variant?.color.name}, {item.size})
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm text-primary font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-4">
              <strong>Total Amount:</strong> ₹{order.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No order details available.</p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition hover:cursor-pointer"
          >
            Continue Shopping
          </Link>
          <Link
            to="/my-account?tab=history"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition hover:cursor-pointer"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
