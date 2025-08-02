// components/ProductCard.jsx
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl overflow-hidden text-left mx-auto bg-white shadow-sm">
      <div className="relative w-full aspect-[3/4]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-white to-transparent" /> */}
      </div>
      <div className="p-4">
        <div className="text-sm text-primary-light">Vellor</div>
        <h3 className="text-lg font-semibold text-primary leading-tight">{product.title}</h3>
        <p className="text-base font-medium text-primary">INR {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};


export default ProductCard;
