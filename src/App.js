import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

// Component Imports
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import FreshyBot from "./Components/FreshyBot"; // Fixed capitalization to match your folder structure

// Page Imports
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import FruitDetails from "./Pages/FruitDetails";
import SeasonalProducts from "./Pages/SeasonalProducts";
import SearchPage from "./Pages/SearchPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

// Context Providers
import { CartProvider } from "./context/CartContext";

function Layout() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Logic to hide navigation and bot elements on landing, login, and signup pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {/* Renders Navbar only if user is logged in and not on authentication pages */}
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

        {/* User Protected Route */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        {/* Admin Protected Route */}
        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Product & E-commerce Routes */}
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/fruit/:id" element={<FruitDetails />} />
        <Route path="/seasonal/:slug" element={<SeasonalProducts />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Floating AI Chatbot: Renders globally on all shop pages once user is logged in */}
      {!hideNavbar && token && <FreshyBot />}

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