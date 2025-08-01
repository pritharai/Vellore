import React, { useState } from 'react';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const changeQty = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const selectSize = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="max-w-[1100px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:mt-50 flex flex-col lg:flex-row">

            <div className="w-full lg:w-1/2 bg-gray-100">
                <img
                    src="/images/hero-core-1.jpg"
                    alt="Product"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full lg:w-1/2 p-10 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold">Unisex Oversized Tee</h2>
                <div className="text-lg font-medium text-black">₹899.00</div>

                <div>
                    <div className="text-sm mb-2 font-medium">Size</div>
                    <div className="flex flex-wrap gap-3">
                        {['M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                                key={size}
                                onClick={() => selectSize(size)}
                                className={`px-4 py-2 border hover:cursor-pointer rounded-md text-sm font-medium ${selectedSize === size
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white border-gray-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium block mb-1">Quantity</label>
                    <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
                        <button
                            onClick={() => changeQty(-1)}
                            className="px-4 py-2 text-lg font-bold bg-white hover:cursor-pointer "
                        >
                            −
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={quantity}
                            className="w-12 text-center py-2 border-l border-r border-gray-300 outline-none"
                        />
                        <button
                            onClick={() => changeQty(1)}
                            className="px-4 py-2 text-lg font-bold bg-white hover:cursor-pointer "
                        >
                            +
                        </button>
                    </div>
                </div>



                <div className="flex flex-col mt-20 gap-3">
                    <button className="w-full py-3 border-2 border-primary text-primary rounded-md hover:cursor-pointer hover:bg-primary-light hover:text-white transition">
                        Add to cart
                    </button>
                    <button className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-hover hover:cursor-pointer transition">
                        Buy now
                    </button>
                </div>


                <div className="text-gray-600 text-sm leading-6">
                    Discover unmatched craftsmanship and style with this product. Designed for those who value detail and quality, featuring breathable comfort for your everyday fits.
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
