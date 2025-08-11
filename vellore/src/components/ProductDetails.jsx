import React, { useState } from 'react';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [prodImage, setProdImage] = useState('black');
    const [showSizeChart, setShowSizeChart] = useState(false);

    const changeQty = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const selectSize = (size) => {
        setSelectedSize(size);
    };
    const colorOptions = [
        { name: 'goldenrod', hex: '#d8c060' },
        { name: 'blue', hex: '#03139e' },
        { name: 'black', hex: '#201f24' },
        { name: 'lavender', hex: '#c58bc5' },
    ];
    return (
        <>
            {showSizeChart && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg relative p-4 max-w-[90%] md:max-w-[600px] shadow-lg">
                        <button
                            onClick={() => setShowSizeChart(false)}
                            className="absolute top-2 right-2 text-4xl font-bold text-gray-600 hover:cursor-pointer hover:text-black"
                        >
                            &times;
                        </button>
                        <img
                            src="/images/size-chart.jpg"
                            alt="Size Chart"
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                </div>
            )}

        <div className="max-w-[1100px] mx-auto bg-white shadow-md overflow-hidden md:mt-50 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 bg-gray-100">
                <img
                    src={`/images/test-${prodImage}.jpg`}
                    alt="Product"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full lg:w-1/2 p-10 flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-primary">Unisex Oversized Tee</h2>
                <div className="text-lg font-content text-primary">₹899.00</div>

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

                <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-sm text-primary text-left underline mt-2 hover:text-primary-hover hover:cursor-pointer transition"
                >
                    View Size Chart
                </button>

                <div>
                    <div className="text-sm font-medium mb-2">Color</div>
                    <div className="flex gap-3">
                        {colorOptions.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setProdImage(color.name)}
                                className="w-8 h-8 rounded-full hover:scale-105 hover:cursor-pointer transition"
                                style={{ backgroundColor: color.hex }}
                            ></button>
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
                            className="px-4 py-2 text-lg font-bold bg-white hover:cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>



                <div className="flex flex-col mt-10 gap-3">
                    <button className="w-full py-3 border-1 border-primary text-primary hover:cursor-pointer hover:bg-primary-light hover:text-white transition">
                        Add to cart
                    </button>
                    <button className="w-full py-3 bg-primary text-white hover:bg-primary-hover hover:cursor-pointer transition">
                        Buy now
                    </button>
                </div>


                <div className="text-gray-600 text-sm mb-5 leading-6">
                    Discover unmatched craftsmanship and style with this product. Designed for those who value detail and quality, featuring breathable comfort for your everyday fits.
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDetail;
