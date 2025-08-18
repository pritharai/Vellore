import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsByProduct,
  createReview,
  deleteReview,
} from "../services/reviewService"; 
import { useSelector } from "react-redux";

const Reviews = ({ productId }) => {
    
  const queryClient = useQueryClient();
  const {user} = useSelector((state) => state.auth)
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
  });

  
  const { mutate: addReview, isPending: adding } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      setComment("");
      setRating(5);
    },
  });

  
  const { mutate: removeReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Login required to add a review");
    addReview({ productId, rating, comment });
  };

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        )}
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-b pb-3 flex justify-between items-start"
          >
            <div>
              <p className="font-medium text-primary">{review.user.name}</p>
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-500">
                ⭐ {review.rating} |{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>

            
            {user?._id === review.user._id && (
              <button
                onClick={() => removeReview(review._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      
      {user && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 p-4 border rounded-md bg-gray-50"
        >
          <label className="block text-sm font-medium mb-1">Your Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-2 py-1 rounded mb-3"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1">
            Your Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-md p-2 mb-3 focus:ring focus:ring-primary/50"
            placeholder="Write your review..."
          />

          <button
            type="submit"
            disabled={adding}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition"
          >
            {adding ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
