import { useContext } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: "Headphones", price: 1999 },
    { id: 2, name: "Smart Watch", price: 2999 },
    { id: 3, name: "Laptop", price: 55999 },
    { id: 4, name: "Mobile Phone", price: 24999 },
  ];

  return (
    <>
      
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Products 🛒</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-400 mt-2">₹{product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 transition py-2 rounded-full cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;