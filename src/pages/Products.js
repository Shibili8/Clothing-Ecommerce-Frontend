import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Navbar from "./components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.products));
  }, []);

  return (
    <>
        <Navbar/>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
    </>
  );
}
