// pages/Products.jsx
import ProductCard from "./ProductCard";

const sampleProducts = [
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
  {
    title: "Visionary Lie",
    price: 2899,
    image: "/images/hero-core-1.jpg",
  },
  {
    title: "Outline of a Legend",
    price: 4499,
    image: "/images/hero-core-2.jpg",
  },
  
];

const Products = () => {
  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="max-w-[1560px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {sampleProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Products;
