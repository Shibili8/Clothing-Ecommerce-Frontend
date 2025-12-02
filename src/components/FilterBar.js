import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Send all filters to parent (Products.jsx)
  const applyFilters = () => {
    onFilter({
      search,
      category,
      size,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow bg-white grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {/* Search */}
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}
      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      {/* Size */}
      <select
        className="border p-2 rounded"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">All Sizes</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      {/* Price Range */}
      <div className="flex gap-2">
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button
        onClick={applyFilters}
        className="md:col-span-2 lg:col-span-4 bg-gray-900 text-white p-2 rounded hover:bg-black"
      >
        Apply Filters
      </button>
    </div>
  );
}
