import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6 text-white">
        <h1
          onClick={() => navigate("/dashboard")}
          className="font-semibold text-xl cursor-pointer"
        >
          MyStore
        </h1>

        {/* 👤 User Name Next to MyStore */}
        {user && (
          <span
            onClick={() => navigate("/profile")}
            className="cursor-pointer hover:text-indigo-400 transition"
          >
            👤 {user.name}
          </span>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-8 text-white">

        <span
          onClick={() => navigate("/products")}
          className="cursor-pointer hover:text-indigo-400 transition"
        >
          Products
        </span>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:text-indigo-400 transition"
        >
          🛒 Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-600 text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-full text-white hover:bg-red-500 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;