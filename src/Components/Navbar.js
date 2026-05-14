import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [seasonalOpen, setSeasonalOpen] = useState(false);
  const [freshOpen, setFreshOpen] = useState(false);
  const [search, setSearch] = useState("");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
  const { cartCount } = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const goTo = (path) => {
    setSeasonalOpen(false);
    setFreshOpen(false);
    setMobileMenu(false);
    navigate(path);
  };

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search/${search}`);

    setSearch("");

  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-green-900 to-lime-700 text-white shadow-md sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <h1
              onClick={() => goTo("/home")}
              className="text-2xl font-bold cursor-pointer hover:text-yellow-300"
            >
              FreshyFruits 🍎
            </h1>

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-white/10 px-4 py-2 rounded-lg w-80"
            >

              <input
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search fresh fruits..."
                className="bg-transparent outline-none w-full text-sm placeholder-gray-200"
              />

              <button type="submit" className="ml-2">
                🔍
              </button>

            </form>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex items-center gap-6 text-sm">

              <li>
                <button
                  onClick={()=>goTo("/home")}
                  className="hover:text-yellow-300"
                >
                  Home
                </button>
              </li>

              {/* Seasonal */}
              <li className="relative">

                <button
                  onClick={()=>{
                    setSeasonalOpen(!seasonalOpen);
                    setFreshOpen(false);
                  }}
                  className="hover:text-yellow-300"
                >
                  Seasonal ▾
                </button>

                {seasonalOpen && (

                  <ul className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-44">

                    <li onClick={()=>goTo("/seasonal/summer")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Summer</li>
                    <li onClick={()=>goTo("/seasonal/winter")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Winter</li>
                    <li onClick={()=>goTo("/seasonal/rainy")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Rainy</li>

                  </ul>

                )}

              </li>

              {/* Fresh */}
              <li className="relative">

                <button
                  onClick={()=>{
                    setFreshOpen(!freshOpen);
                    setSeasonalOpen(false);
                  }}
                  className="hover:text-yellow-300"
                >
                  Fresh Fruits ▾
                </button>

                {freshOpen && (

                  <ul className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-56">

                    <li onClick={()=>goTo("/category/exotic-fruits")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Exotic Fruits</li>
                    <li onClick={()=>goTo("/category/tropical-fruits")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tropical Fruits</li>
                    <li onClick={()=>goTo("/category/citrus-fruits")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Citrus Fruits</li>
                    <li onClick={()=>goTo("/category/berries")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Berries</li>
                    <li onClick={()=>goTo("/category/stone-fruits")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Stone Fruits</li>
                    <li onClick={()=>goTo("/category/melons")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Melons</li>
                    <li onClick={()=>goTo("/category/pomes")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pomes</li>

                  </ul>

                )}

              </li>

              {/* CART */}
              <li
                onClick={()=>goTo("/cart")}
                className="relative cursor-pointer text-xl hover:text-yellow-300"
              >

                🛒

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
                    {cartCount}
                  </span>
                )}

              </li>

              {/* PROFILE */}
              <li>

                <button
                  onClick={()=>setProfileOpen(true)}
                  className="text-xl hover:text-yellow-300"
                >
                  👤
                </button>

              </li>

            </ul>

            {/* MOBILE MENU */}
            <div className="md:hidden flex items-center gap-4">

              <span
                onClick={()=>goTo("/cart")}
                className="text-xl relative"
              >
                🛒

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
                    {cartCount}
                  </span>
                )}

              </span>

              <button onClick={()=>setProfileOpen(true)}>
                👤
              </button>

              <button
                onClick={()=>setMobileMenu(!mobileMenu)}
                className="text-2xl"
              >
                ☰
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* PROFILE SIDEBAR */}
     {/* PROFILE DROPDOWN */}

{profileOpen && (

<div className="absolute right-4 top-16 bg-white text-black rounded-lg shadow-xl w-64 z-50">

  {/* USER INFO */}

  <div className="p-4 border-b">

    <p className="font-semibold text-lg">
      {name || "User"}
    </p>

    <p className="text-sm text-gray-600">
      {email}
    </p>

  </div>


  {/* MENU */}

  <div className="p-2">

    <button
      onClick={()=>goTo("/profile")}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
    >
      👤 Your Profile
    </button>

    <button
      onClick={()=>goTo("/orders")}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
    >
      📦 Your Orders
    </button>

    <button
      onClick={()=>goTo("/cart")}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
    >
      🛒 Your Cart
    </button>

    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded"
    >
      🚪 Logout
    </button>

  </div>

</div>

)}

    </>
  );
};

export default Navbar;