import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [showStory, setShowStory] = useState(false);

  const goToProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <>
      <div className="overflow-hidden text-left mx-auto">
        {/* Image */}
        <div className="relative w-full aspect-[7/8] overflow-hidden">
          <img
            onClick={goToProduct}
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:cursor-pointer hover:scale-[1.05] transition"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-sm text-gray-600">Vellor</div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {product.title}
          </h3>
          <p className="font-content font-[300] text-gray-800">
            INR {product.price.toLocaleString()}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            {/* View Product Button with animation */}
            <button className="group relative w-full py-3 px-3 text-lg rounded-md font-semibold text-white backdrop-blur-md border border-white/30 overflow-hidden shadow-lg shadow-primary/20 transition-all duration-500 ease-in-out hover:scale-[1.03] active:scale-95 hover:cursor-pointer">
              <span className="relative z-10" onClick={goToProduct}>
                View Product
              </span>

              {/* Aurora Glow Animation */}
              <span className="absolute -inset-[200%] bg-gradient-to-r from-primary via-primary-light to-primary blur-3xl group-hover:animate-spin-slow"></span>

              {/* Shiny Light Sweep */}
              <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 rotate-12 group-hover:left-[130%] transition-all duration-[1200ms] ease-in-out blur-md"></span>
            </button>

            {/* Read Story Button */}
            <button
              onClick={() => setShowStory(true)}
              className="bg-white w-full text-primary px-3 py-3 rounded-md font-semibold hover:scale-[1.03] transition outline-1 hover:cursor-pointer"
            >
              Read Story
            </button>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStory && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowStory(false)}
        >
          <div
            className="bg-white p-6 rounded-md max-w-2xl w-full flex gap-6"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-1/2">
              <img
                src={product.image} // Make sure this is the correct field for product image
                alt={product.title}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h2 className="font-bold mb-3 text-xl">
                Story of {product.title}
              </h2>
              <p className="text-gray-700 text-justify" style={{fontFamily:"Quattrocento"}}>{product.story}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-light transition hover:cursor-pointer"
                onClick={() => setShowStory(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
