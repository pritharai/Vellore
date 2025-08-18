import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWishlist, removeFromWishlist, clearWishlist } from "../services/wishlistService";
import { toast } from "react-toastify";

const Wishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Item removed from wishlist");
    },
    onError: (err) => toast.error(err.message),
  });

  const clearMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.info("Wishlist cleared");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) return <p className="text-center mt-10">Loading wishlist...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load wishlist.</p>;

  return (
    <div className="max-w-[1100px] md:mt-50 mb-20 mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        {wishlist?.length > 0 && (
          <button
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600 transition"
          >
            {clearMutation.isPending ? "Clearing..." : "Clear Wishlist"}
          </button>
        )}
      </div>

      {wishlist?.length === 0 ? (
        <p className="text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        wishlist?.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row mb-6"
          >
            {/* Image */}
            <div className="md:w-1/3 bg-gray-100 h-[300px]">
              <img
                src={item.variant.image.url}
                alt={item.variant.product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-6 flex flex-col gap-4">
              <h3 className="text-xl font-medium">{item.variant.product.name}</h3>
              <p className="text-gray-600">{item.variant.product.description}</p>
              <p className="text-sm">
                Color:{" "}
                <span>
                  {item.variant.color.name}
                </span>
              </p>
              <p className="text-sm">Size: {item.size}</p>
              <p className="text-lg font-semibold text-primary">₹{item.variant.price}</p>

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:cursor-pointer hover:text-white transition">
                  Add to Cart
                </button>
                <button
                  onClick={() => removeMutation.mutate(item._id)}
                  disabled={removeMutation.isPending}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition hover:cursor-pointer"
                >
                  {removeMutation.isPending ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
