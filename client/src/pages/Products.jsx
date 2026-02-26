import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const Products = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  // Fetch Products with Pagination
  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=12&skip=${(page-1) * 12}`
      );
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
    } catch (err) {
      setError("Failed to fetch products");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Infinite Scroll Logic
  const lastProductRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Products
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;

          return (
            <div
              ref={isLast ? lastProductRef : null}
              key={product.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="mt-4 font-semibold">
                {product.title}
              </h2>

              <p className="text-indigo-400 mt-2">
                ₹{Math.floor(product.price)}
              </p>

              <button
                onClick={() =>{
                  addToCart({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                  })
                   toast.success(`${product.title} added to cart 🛒`);
                }}
                className="mt-4 w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-500 transition"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center mt-6 animate-pulse">
          Loading more products...
        </p>
      )}

      {/* No More Products */}
      {!hasMore && (
        <p className="text-center mt-6 text-gray-500">
          No more products
        </p>
      )}
    </div>
  );
};

export default Products;