import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster position="top-center"/>

    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

          <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;