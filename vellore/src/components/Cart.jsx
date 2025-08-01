import React, { useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Unisex Oversized Tee',
            price: 899,
            quantity: 1,
            image: '/images/hero-core-1.jpg',
        },
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-[1100px] md:mt-50 mx-auto p-6 mb-20">
            <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

            {cartItems.map(item => (
                <div
                    key={item.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row mb-6"
                >
                    <div className="md:w-1/3 bg-gray-100 h-[300px]">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>


                    <div className="md:w-2/3 p-6 flex flex-col gap-4">
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <p className="text-lg font-semibold text-primary">₹{item.price}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">Quantity</span>
                            <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-3 py-1 font-bold hover:cursor-pointer"
                                >
                                    −
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value={item.quantity}
                                    className="w-10 text-center border-l border-r border-gray-300 outline-none"
                                />
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-3 py-1 font-bold hover:cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition">
                                Buy now
                            </button>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-right mt-6 text-lg font-semibold">
                Total: ₹{total}
            </div>
        </div>
    );
};

export default Cart;
