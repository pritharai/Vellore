import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const StoryComponent = ({ storyData }) => {
  const { title, subtitle, image, description } = storyData;

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-0 relative">

      {/* Title & Subtitle */}
      <div className="w-full lg:w-fit text-secondary py-8 pl-10 pr-20 rounded-sm bg-primary lg:absolute lg:-top-[60px] lg:right-[12%] z-10">
        <h3 className="text-4xl font-[200]">{title}</h3>
        <p className="font-content mt-5 text-lg">{subtitle}</p>
      </div>

      {/* Image with Hover Overlay + Buttons */}
      <div className="w-full lg:w-[400px] relative group">
        <img
          src={image}
          className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-sm"
          alt={title}
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex gap-6">
            <button className="text-secondary hover:cursor-pointer p-4 rounded-full shadow-md hover:bg-primary transition-all duration-300 transform -translate-x-5 group-hover:translate-x-0">
              <FaHeart size={32} />
            </button>
            <button className="text-secondary hover:cursor-pointer p-4 rounded-full shadow-md hover:bg-primary transition-all duration-300 transform translate-x-5 group-hover:translate-x-0">
              <FaShoppingCart size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-full lg:w-fit text-secondary py-4 px-6 rounded-sm bg-primary lg:absolute lg:-bottom-[60px] lg:left-[6%]">
        <p className="font-content max-w-[650px] text-justify [word-spacing:0.2rem]">
          {description}
        </p>
      </div>

    </div>
  );
};

export default StoryComponent;
