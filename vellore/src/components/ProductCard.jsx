// components/ProductCard.jsx
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl overflow-hidden text-left mx-auto bg-tertiary shadow-sm">
      <div className="relative w-full aspect-[3/4]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-tertiary via-tertiary-light/70 to-transparent" />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600">Vellor</div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{product.title}</h3>
        <p className="text-base font-medium text-gray-800">INR {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};


export default ProductCard;
