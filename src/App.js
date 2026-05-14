import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CategoryPage from "./Pages/CategoryPage";
import FruitDetails from "./Pages/FruitDetails";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import Footer from "./Components/Footer";
import SeasonalProducts from "./Pages/SeasonalProducts";
import Cart from "./Pages/Cart";
import SearchPage from "./Pages/SearchPage";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import { CartProvider } from "./context/CartContext";

function Layout() {

  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Hide navbar on landing/login/signup
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && token && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            !token ? (
              <Login />
            ) : role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/home" />}
        />

        {/* User Protected */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            token && role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Product Routes */}
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/fruit/:id" element={<FruitDetails />} />
        <Route path="/seasonal/:slug" element={<SeasonalProducts />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}