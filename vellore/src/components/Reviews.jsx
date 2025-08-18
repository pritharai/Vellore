import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsByProduct,
  createReview,
  deleteReview,
} from "../services/reviewService";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import ConfirmationPopup from "./ConfirmationPopup";

const Reviews = ({ productId }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId,
  });

  const { mutate: addReview, isPending: adding } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setComment("");
      setRating(5);
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: removeReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setShowConfirm(false);
      setSelectedReviewId(null);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return toast.info("Login required to add a review");
    addReview({ productId, rating, comment });
  };

  const handleDeleteClick = (id) => {
    setSelectedReviewId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedReviewId) {
      removeReview(selectedReviewId);
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-500">Loading reviews...</div>;

  return (
    <div className="mt-10 w-full mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        Customer Reviews
      </h3>

      {/* Review List */}
      <div className="space-y-5">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-center">
            No reviews yet. Be the first!
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex gap-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 border-gray-300 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                {review.user.name[0]}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{review.user.name}</p>
                  <div className="flex items-center mt-1 space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>

                {user?._id === review.user._id && (
                  <button
                    onClick={() => handleDeleteClick(review._id)}
                    className="text-primary hover:text-primary-hover ml-4 p-1 rounded-full transition-colors hover:cursor-pointer"
                  >
                    <MdDelete size={22} />
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      {user && (
        <form className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Add a Review</h4>

          <label className="block text-gray-600 mb-1 font-medium">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-primary/50 transition"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label className="block text-gray-600 mb-1 font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Write your review..."
            className="w-full border rounded-md border-gray-300 p-3 mb-4 focus:ring-2 focus:ring-primary/50 transition resize-none"
          />

          <button
            type="submit"
            disabled={adding}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-hover transition hover:cursor-pointer"
          >
            {adding ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showConfirm}
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default Reviews;
