import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useContext(CartContext);

  return (
    <>

      <div className="min-h-screen bg-gray-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">Your cart is empty 🛒</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border w-[50vw] mx-auto border-gray-800 rounded-2xl p-6 flex justify-between items-center"
              >
                {/* Product Info */}
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-400">
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-800 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-800 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Section */}
            <div className="mt-10 w-[50vw] mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Total
              </h2>
              <p className="text-2xl font-bold text-indigo-400">
                ₹{totalPrice}
              </p>
            </div>

            {/* Checkout Button */}
            <button className="w-[50vw] mx-78 mt-6 bg-indigo-600 h-12 rounded-xl text-white hover:bg-indigo-500 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;