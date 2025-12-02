import { useParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useCart } from "../context/CartContext";
export default function OrderSuccess() {
  const { id } = useParams();
  const { setCartCount } = useCart();
  return (
    <>
        <Navbar/>
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">Order Successful!</h1>
      <p className="mt-2">Your order ID:</p>
      <p className="font-semibold text-xl">{id}</p>
      <Link to="/products"onClick={()=>setCartCount(0)} className="block bg-gray-900 text-white text-center py-3 rounded mt-4">
        Purchase more products
      </Link>
    </div>
    </>
  );
}
