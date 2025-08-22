import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getWishlist, removeFromWishlist, clearWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import ConfirmationPopup from "./ConfirmationPopup";

const Wishlist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const [isClearWishlistPopupOpen, setIsClearWishlistPopupOpen] = useState(false);

  const { data: wishlist, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onMutate: (id) => {
      setRemovingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Item removed from wishlist");
    },
    onError: (err) => toast.error(err.message),
    onSettled: () => {
      setRemovingId(null);
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      toast.info("Wishlist cleared");
      setIsClearWishlistPopupOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
      setIsClearWishlistPopupOpen(false);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onMutate: (data) => {
      setAddingToCartId(data.wishlistItemId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart']);
      dispatch(setCart(data));
      toast.success(data.message || "Item added to cart successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      setAddingToCartId(null);
    },
  });

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add to cart");
      setTimeout(() => navigate("/auth"), 2000);
      return;
    }
    if (!item.size) {
      toast.error("No size selected for this item");
      return;
    }
    if (!item.variant?._id) {
      toast.error("Invalid variant for this item");
      return;
    }
    if (item.variant.quantity[item.size] <= 0) {
      toast.error("This item is out of stock");
      return;
    }
    addToCartMutation.mutate({
      variantId: item.variant._id,
      size: item.size,
      quantity: 1,
      wishlistItemId: item._id, // Used to track loading state
    });
  };

  if (!isAuthenticated) {
    toast.error("Please log in to view your wishlist");
    setTimeout(() => navigate("/auth"), 2000);
    return null;
  }

  if (isLoading) return <p className="text-center mt-10">Loading wishlist...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load wishlist.</p>;

  return (
    <div className="max-w-[1100px] md:mt-50 mb-20 mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        {wishlist?.length > 0 && (
          <button
            onClick={() => setIsClearWishlistPopupOpen(true)}
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
                Color: <span>{item.variant.color.name}</span>
              </p>
              <p className="text-sm">Size: {item.size}</p>
              <p className="text-lg font-semibold text-primary">₹{item.variant.price}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={addingToCartId === item._id || item.variant.quantity[item.size] <= 0}
                  className={`px-4 py-2 border-2 border-primary text-primary rounded-md transition hover:cursor-pointer
                    ${addingToCartId === item._id || item.variant.quantity[item.size] <= 0
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:bg-primary hover:text-white'
                    }`}
                >
                  {addingToCartId === item._id ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={() => removeMutation.mutate(item._id)}
                  disabled={removingId === item._id}
                  className={`px-4 py-2 rounded-md transition hover:cursor-pointer
                    ${removingId === item._id ? 'bg-primary text-white opacity-60 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-hover'}
                  `}
                >
                  {removingId === item._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ConfirmationPopup
        isOpen={isClearWishlistPopupOpen}
        title="Clear Wishlist"
        message="Are you sure you want to clear all items from your wishlist?"
        onConfirm={() => clearMutation.mutate()}
        onCancel={() => setIsClearWishlistPopupOpen(false)}
      />
    </div>
  );
};

export default Wishlist;