import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  const { loadCartCount } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);

      if (res.data.sizes && res.data.sizes.length > 0) {
        setSelectedSize(res.data.sizes[0]);
      }
    });
  }, [id]);

  const increaseQty = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const addToCart = async () => {
    if (!selectedSize) return alert("Please select a size!");

    const auth = localStorage.getItem("auth");

    // LOGGED-IN USER
    if (auth === "true") {
      try {
        await api.post("/cart/add", {
          productId: product._id,
          size: selectedSize,
          qty,
        }, { withCredentials: true });


        loadCartCount(); // update navbar badge
        alert("Added to cart!");
        return;
      } catch (err) {
        console.log("Add-to-cart error:", err.response?.data);
        alert("Error adding to cart");
        return;
      }
    }

    // GUEST USER — save in localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
      size: selectedSize,
      category: product.category,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartCount();
    alert("Added to cart!");
  };

  // ⛔ THIS MUST BE INSIDE THE COMPONENT
  if (!product) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <>
        <Navbar/>
    <div className="p-4">
      <img
        src={product.image}
        alt=""
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-600 text-sm mt-1">{product.category}</p>

      <p className="text-gray-700 mt-4">{product.description}</p>

      <p className="mt-3 text-sm text-green-700 font-semibold">
        In Stock: {product.stock}
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-4">
        ₹{product.price}
      </h3>

      <div className="mt-6">
        <p className="font-medium mb-2">Available Sizes:</p>

        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded border ${
                selectedSize === size
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block mb-1 font-medium">Select Size</label>

        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="border w-full p-3 rounded mb-4"
        >
          {product.sizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>

        <label className="block mb-1 font-medium">Quantity</label>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={decreaseQty}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl"
          >
            –
          </button>

          <span className="w-12 text-center text-lg font-semibold">
            {qty}
          </span>

          <button
            onClick={increaseQty}
            className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full text-xl"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={addToCart}
        className="w-full bg-gray-900 text-white py-3 rounded mt-6 text-lg"
      >
        Add To Cart
      </button>
    </div>
    </>
  );
}
