import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-white font-semibold text-xl">MyStore</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded-full text-white hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;