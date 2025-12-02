import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded shadow p-3 hover:shadow-lg transition">
      <img
        src={product.image}
        alt=""
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="font-semibold mt-2 text-lg">{product.name}</h3>

      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-800 font-semibold">₹{product.price}</p>

        <p className="text-sm text-green-700 font-medium">
          Stock: {product.stock}
        </p>
      </div>

      <Link
        to={`/product/${product._id}`}
        className="block mt-3 py-2 bg-gray-900 text-white text-center rounded"
      >
        View
      </Link>
    </div>
  );
}
