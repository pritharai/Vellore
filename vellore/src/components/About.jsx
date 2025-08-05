import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <section className=" py-8 md:py-20 px-6 overflow-hidden">
      <motion.div
        className="max-w-[1560px] mx-auto flex flex-col md:flex-row items-center justify-around"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 text-primary">
          <motion.h1
            className="text-5xl font-extrabold leading-tight mb-6"
            style={{ fontFamily: 'Raleway, sans-serif' }}
            variants={fadeUpVariant}
          >
            <span className="bg-gradient-to-r from-tertiary via-tertiary-gradient to-tertiary bg-clip-text text-transparent" style={{ fontFamily: 'Brittany Signature' }}>
              Vellor
            </span>{" "}
            — a need for calm<br />
            in the chaos of fast fashion
          </motion.h1>

          <motion.p
            className="text-lg mb-8"
            style={{ fontFamily: 'Roboto, sans-serif' }}
            variants={fadeUpVariant}
          >
            In a world chasing trends and timelines, Vellor chooses stillness.
            We create oversized T-shirts that don’t just clothe, but comfort.
            Each piece is thoughtfully designed with intention — minimal in style,
            rich in detail, and made to last. We believe fashion should feel good —
            not just look good. That’s why our fabrics are breathable, our fits are relaxed,
            and our designs are timeless. No logos shouting for attention. No clutter.
            Just clean, effortless wear for everyday ease.
          </motion.p>

          <motion.a
            href="#"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-[#3d0a12] transition-all duration-200 text-lg"
            style={{ fontFamily: 'Raleway, sans-serif' }}
            variants={fadeUpVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More →
          </motion.a>
        </div>

        {/* Image */}
        <div className="relative">
  {/* Static background shape */}
  <div className="bg-[#4f0d17] absolute w-[80%] h-[75%] bottom-0 left-[33px] -z-10 rounded-t-full"></div>

  {/* Animated image only */}
  <motion.img
    src="/images/about-hero-1.png"
    alt="Model showcasing neutral-toned fashion collection"
    className="h-[140%]"
    variants={imageVariant}
    initial="hidden"
    animate="visible"
  />
</div>

      </motion.div>
    </section>
  );
};

export default About;
