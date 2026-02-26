import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingBag, ShoppingCart, UserIcon } from "lucide-react";
 

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="w-50 fixed top-0 left-0 bg-gray-900 border-r border-gray-800 min-h-screen flex flex-col px-6 py-6">
      
      {/* Top Section */}
      <div className="mb-10">
        <h1
          onClick={() => navigate("/dashboard")}
          className="font-semibold text-2xl cursor-pointer text-white"
        >
          MyStore
        </h1>

      
      </div>
       
      {/* Navigation Links */}
      <div className="flex flex-col gap-4 text-white">
           {user && (
          <p
            onClick={() => navigate("/profile")}
            className="mt-2 flex gap-2 text-white cursor-pointer hover:text-indigo-400 transition"
          >
            <UserIcon/> {user.name}
          </p>
        )}
     
        <span
          onClick={() => navigate("/products")}
          className={`cursor-pointer rounded-lg transition flex gap-2 ${
            isActive("/products")
              ? "bg-indigo-600"
              : "hover:bg-gray-800"
          }`}
        >
            <ShoppingBag/>
          Products
        </span>

          <div
          onClick={() => navigate("/cart")}
          className="relative flex gap-4 cursor-pointer hover:text-indigo-400 transition"
        >
        <ShoppingCart />  Cart  
          {cartItems.length > 0 && (
            <span className="absolute -top-3 left-4 bg-red-600 text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Logout at Bottom */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-center bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition cursor-pointer "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;