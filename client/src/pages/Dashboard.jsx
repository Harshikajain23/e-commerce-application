import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
  
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name} 
      </h1>

      <p className="text-gray-400 mt-2">
        Here's what's happening in your account.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl mt-2">12</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold">Cart Items</h2>
          <p className="text-2xl mt-2">3</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold">Profile Status</h2>
          <p className="text-2xl mt-2 text-green-400">Active</p>
        </div>

      </div>
    </div>
     </>
  );
};

export default Dashboard;