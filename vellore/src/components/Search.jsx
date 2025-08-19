import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getVariants } from "../services/variantService";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["variants", searchQuery],
    queryFn: () => getVariants({ search: searchQuery }),
    enabled: !!searchQuery.trim(),
    retry: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setSearchQuery(query);
  };

  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-54 h-full">
      <h2 className="text-2xl font-semibold mb-4">Search</h2>

      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {isError && (
        <p className="text-red-500">
          {error.message || "Failed to load search results"}
        </p>
      )}

      {!isLoading && !isError && searchQuery && data?.variants?.length === 0 && (
        <p className="text-gray-500">No results found for "{searchQuery}".</p>
      )}

      {!isLoading && !isError && data?.variants?.length > 0 && (
        <ul className="space-y-4">
          {data.variants.map((variant) => (
            <li
              key={variant._id}
              className="border p-4 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition"
              onClick={() => goToProduct(variant.product._id)}
            >
              <div className="flex gap-4">
                <img
                  src={variant.image.url}
                  alt={variant.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{variant.product.name}</h3>
                  <p className="text-gray-600">{variant.product.description}</p>
                  <p className="text-sm text-gray-600">Color: {variant.color.name}</p>
                  <p className="text-lg font-semibold text-primary">
                    ₹{variant.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;