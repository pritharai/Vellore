// components/ProductCard.jsx
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="overflow-hidden text-left mx-auto ">
      <div className="relative w-full aspect-[7/8] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:cursor-pointer hover:scale-[1.1] transition"
        />
        
      </div>
      <div className="p-4">
        <div>
        <div className="text-sm text-gray-600">Vellor</div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.title}</h3>
        <p className="font-content font-[300] text-gray-800">INR {product.price.toLocaleString()}</p>
        <button className="w-full mt-5 py-3 border-1 border-primary text-primary hover:cursor-pointer hover:bg-primary-light hover:text-white transition">
          View Product
        </button>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
