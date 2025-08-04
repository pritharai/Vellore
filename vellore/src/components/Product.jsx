// pages/Products.jsx
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import sampleProducts from "../data/sampleProducts";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Products = () => {
  return (
    <>
      {/* Page Fade-In */}
      <motion.section
        className="max-w-[1560px] md:mt-40 py-10 px-6 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Animation */}
        <motion.div
          className="flex items-center px-12 justify-center md:justify-start text-primary font-bold pb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: "clamp(1.3rem,5vw,3.5rem)" }}>OUR PRODUCTS</h1>
        </motion.div>

        {/* Grid Entrance Animation */}
        <motion.div
          className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {sampleProducts.map((product, index) => (
            <motion.div key={index} variants={cardVariants} >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
};

export default Products;
