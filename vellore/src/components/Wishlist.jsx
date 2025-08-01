import React from 'react';

const Wishlist = () => {
    const wishlistItems = [
        {
            id: 1,
            name: 'Unisex Oversized Tee',
            price: '₹899.00',
            image: '/images/hero-core-1.jpg',
        },
    ];

    return (
        <div className="max-w-[1100px] md:mt-50 mb-20 mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>

            {wishlistItems.map(item => (
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
                        <p className="text-lg font-semibold text-primary">{item.price}</p>
                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition">
                                Add to cart
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;
