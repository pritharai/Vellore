// pages/Products.jsx
import ProductCard from "./ProductCard";
import ProductBanner from "./ProductsBanner";

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
    <>

    <section className="max-w-[1560px] md:mt-50 py-10 px-6 bg-gray-50">
      <div className="flex items-center px-12 text-primary font-bold">
                    <h1 style={{fontSize:"clamp(1.3rem,5vw,3.5rem)"}} >OUR PRODUCTS</h1>
                </div>
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {sampleProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
    </>
  );
};

export default Products;
