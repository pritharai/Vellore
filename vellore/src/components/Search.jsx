// src/pages/Search.jsx
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Replace with your API endpoint
      const res = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);
      setResults(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-54 h-full">
      <h2 className="text-2xl font-semibold mb-4">Search</h2>

      {/* Search Form */}
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

      {/* Results */}
      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-gray-500">No results found for "{query}".</p>
      )}

      {!loading && results.length > 0 && (
        <ul className="space-y-4">
          {results.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
