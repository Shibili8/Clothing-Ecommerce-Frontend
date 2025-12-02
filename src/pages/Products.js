import { useEffect, useState } from "react";
import api from "../services/api";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log("FilterBar = ", FilterBar);

  const fetchProducts = async () => {
    try {
      const params = { page, limit: 10, ...filters };

      const res = await api.get("/products", { params });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.log("Product load error:", err.response?.data || err);
    }
  };

  // Fetch when filters or page changes
  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* FILTER BAR */}
      <FilterBar onFilter={(data) => { setFilters(data); setPage(1); }} />

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            to={`/product/${p._id}`}
            key={p._id}
            className="border p-3 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="mt-2 font-semibold">{p.name}</h2>
            <p className="text-gray-600 text-sm">{p.category}</p>
            <p className="font-bold mt-1">₹{p.price}</p>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="px-4 py-2">Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

    </div>
  );
}
