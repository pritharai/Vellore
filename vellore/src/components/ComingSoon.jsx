// components/ComingSoon.jsx
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ComingSoon = () => {
  return (
    <section className="bg-white text-primary py-26 px-6 sm:px-12 max-w-[1560px]">
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          More Styles. More Stories.
        </h2>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          We're crafting something new — a fresh drop of timeless designs is on its way.
          Stay tuned as we prepare to unveil the next chapter of our collection.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-all duration-300"
        >
          Explore Current Collection <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default ComingSoon;
