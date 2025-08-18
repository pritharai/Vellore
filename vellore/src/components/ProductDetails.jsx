import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getProductById } from "../services/productService";
import { getVariantImages } from "../services/variantImageService";
import { addToWishlist } from "../services/wishlistService";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import Reviews from "./Reviews";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch product
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // Variant
  const selectedVariant = product?.variants?.find(
    (v) => v.color.toLowerCase() === selectedColor?.name.toLowerCase()
  );

  // Variant images
  const { data: variantImages, isLoading: imagesLoading } = useQuery({
    queryKey: ["variantImages", selectedVariant?._id],
    queryFn: () => getVariantImages({ variantId: selectedVariant._id }),
    enabled: !!selectedVariant?._id,
  });

  // Wishlist Mutation
  const wishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.success("Added to wishlist!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Set default color
  useEffect(() => {
    if (product?.colors?.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
      setCurrentImageIndex(0);
    }
  }, [product]);

  const handleAddToWishlist = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    if (!selectedVariant?._id) {
      toast.error("Please select a color/variant first");
      return;
    }

    wishlistMutation.mutate({
      variantId: selectedVariant._id,
      size: selectedSize,
    });
  };

  const changeQty = (delta) => setQuantity((prev) => Math.max(1, prev + delta));
  const selectSize = (size) => setSelectedSize(size);
  const selectColor = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (isLoading) return <div className="text-center py-12">Loading product...</div>;
  if (error) {
    toast.error(error.message);
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load product: {error.message}
      </div>
    );
  }

  const mainImage = selectedVariant?.image?.url || selectedColor?.imageUrl;
  const additionalImages = variantImages?.images?.map((img) => img.url) || [];
  const images = [mainImage, ...additionalImages];

  return (
    <>
      {/* Size Chart Modal */}
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

      <div className="max-w-[1100px] mx-auto bg-white shadow-md overflow-hidden md:mt-50 md:mb-25 flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col bg-gray-100 md:min-h-[1000px] relative aspect-square md:aspect-[4/3]">
          {imagesLoading ? (
            <div className="flex items-center justify-center h-full">Loading images...</div>
          ) : (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${product?.name} - ${selectedColor?.name}`}
                className="w-full h-[600px] md:h-[1000px] object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 hover:cursor-pointer transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 hover:cursor-pointer transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </>
          )}

          {/* Thumbnails */}
          <div className="flex justify-center gap-4 py-8">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                  currentImageIndex === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-primary">{product?.name}</h2>
            {/* Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              className="text-2xl text-gray-400 hover:text-red-500 transition"
              disabled={wishlistMutation.isPending}
            >
              <FaHeart />
            </button>
          </div>

          <div className="text-lg font-content text-primary">
            ₹{product?.price?.toLocaleString("en-IN")}
          </div>

          {product?.averageRating > 0 && (
            <div className="text-sm text-gray-600 font-bold">
              Rating: {product.averageRating} ({product.reviewCount} reviews)
            </div>
          )}

          {/* Size Selection */}
          <div>
            <div className="text-sm mb-2 font-medium">Size</div>
            <div className="flex flex-wrap gap-3">
              {product?.sizes?.map((size) => {
                const isAvailable = selectedVariant?.quantity[size] > 0;
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && selectSize(size)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 border hover:cursor-pointer rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : isAvailable
                        ? "bg-white border-gray-400 hover:bg-gray-100"
                        : "bg-gray-200 border-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <div className="text-sm font-medium mb-2">Color</div>
            <div className="flex gap-3">
              {product?.colors?.map((color) => (
                <button
                  key={color.name}
                  onClick={() => selectColor(color)}
                  className={`w-8 h-8 rounded-full hover:cursor-pointer hover:scale-105 transition ${
                    selectedColor?.name === color.name ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                ></button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="text-sm font-medium block mb-1">Quantity</label>
            <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => changeQty(-1)}
                className="px-4 py-2 text-lg hover:cursor-pointer font-bold bg-white hover:bg-gray-100"
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
                className="px-4 py-2 text-lg hover:cursor-pointer font-bold bg-white hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col mt-10 gap-3">
            <button className="w-full py-3 border hover:cursor-pointer border-primary text-primary hover:bg-primary-light hover:text-white transition">
              Add to cart
            </button>
            <button className="w-full py-3 bg-primary hover:cursor-pointer text-white hover:bg-primary-hover transition">
              Buy now
            </button>
          </div>

          {/* Description */}
          <div className="text-gray-600 text-sm mb-5 leading-6">
            {product?.description}
          </div>
        </div>
      </div>


      <div className="max-w-[1280px] mx-auto p-6 md:p-10">
        {/* Review comments */}
              <Reviews productId={product.id} />

      </div>
    </>
  );
};

export default ProductDetail;
