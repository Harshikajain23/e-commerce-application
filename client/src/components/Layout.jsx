import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="bg-gray-950 text-white">

      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-52">
      
        <div className="p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Layout