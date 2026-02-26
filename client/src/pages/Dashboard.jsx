import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, PackageCheck, User } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, totalPrice } = useContext(CartContext);

  // 👇 Count total quantity correctly
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-400 mt-2">
        Here's what's happening in your account.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* Orders (placeholder for now) */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-4">
            <PackageCheck size={32} className="text-indigo-400" />
            <div>
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-2xl mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-4">
            <ShoppingCart size={32} className="text-pink-400" />
            <div>
              <h2 className="text-lg font-semibold">Cart Items</h2>
              <p className="text-2xl mt-1">{totalCartItems}</p>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-4">
            <User size={32} className="text-green-400" />
            <div>
              <h2 className="text-lg font-semibold">Cart Total</h2>
              <p className="text-2xl mt-1 text-green-400">
               ₹{Math.floor(totalPrice)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;