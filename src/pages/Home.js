import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
        <Navbar/>
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
      <p className="text-gray-600 mt-3 max-w-md mx-auto">
        Clean CRM-style UI built with React + TailwindCSS (CDN).
      </p>

      <Link
        to="/products"
        className="mt-5 inline-block bg-gray-900 text-white px-6 py-3 rounded"
      >
        Shop Now
      </Link>
    </div>
    </>
  );
}
