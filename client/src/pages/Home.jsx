import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <h1 className="text-4xl font-bold">Welcome to MyStore 🛍️</h1>
      <p className="text-gray-400 mt-4 text-center">
        Shop smart. Shop fast. Shop easy.
      </p>

      <button
        onClick={() => navigate("/auth")}
        className="mt-8 px-6 py-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;