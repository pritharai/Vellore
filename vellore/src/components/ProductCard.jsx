// components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="overflow-hidden text-left mx-auto">
      <div className="relative w-full aspect-[7/8] overflow-hidden">
        <img
          onClick={goToProduct}
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:cursor-pointer hover:scale-[1.1] transition"
        />
      </div>
      <div className="p-4">
        <div>
          <div className="text-sm text-gray-600">Vellor</div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {product.title}
          </h3>
          <p className="font-content font-[300] text-gray-800">
            INR {product.price.toLocaleString()}
          </p>
          <button className="group relative w-full mt-5 py-3 px-6 text-lg rounded-md font-semibold text-white backdrop-blur-md border border-white/30 overflow-hidden shadow-lg shadow-primary/20 transition-all duration-500 ease-in-out hover:scale-[1.03] active:scale-95 hover:cursor-pointer">
            <span className="relative z-10 " onClick={goToProduct}>View Product</span>

            {/* Aurora Glow Animation */}
            <span className="absolute -inset-[200%] bg-gradient-to-r from-primary via-primary-light to-primary blur-3xl group-hover:animate-spin-slow"></span>

            {/* Shiny Light Sweep */}
            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 rotate-12 group-hover:left-[130%] transition-all duration-[1200ms] ease-in-out blur-md"></span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
