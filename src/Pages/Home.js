import HomeCarousel from "../Components/HomeCarousel";
import ExploreCategories from "../Components/ExploreCategories";
import SeasonalSection from "../Components/SeasonalSection";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">

      {/* Hero Carousel */}
      <div className="shadow-md">
        <HomeCarousel />
      </div>

      {/* Welcome Section */}
      <div className="text-center py-14 px-6">
        <h1 className="text-5xl font-extrabold text-green-700">
          Fresh Fruits For Healthy Life 🍎
        </h1>

        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          Get fresh, healthy and organic fruits delivered directly
          to your doorstep with FreshyFruits.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Explore Fruit Categories 🍓
          </h2>

          <ExploreCategories />

        </div>
      </div>

      {/* Seasonal Fruits */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-gradient-to-r from-green-500 to-lime-500 rounded-3xl shadow-2xl p-8">

          <h2 className="text-4xl font-bold text-center text-white mb-10">
            Seasonal Fresh Fruits 🌦️
          </h2>

          <div className="bg-white rounded-2xl p-5">
            <SeasonalSection />
          </div>

        </div>

      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              100% Organic 🌱
            </h3>

            <p className="text-gray-600">
              Fresh fruits directly from farms with natural quality.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">
              Fast Delivery 🚚
            </h3>

            <p className="text-gray-600">
              Quick and safe delivery at your doorstep anytime.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              Farm Fresh 🍉
            </h3>

            <p className="text-gray-600">
              Handpicked seasonal fruits full of freshness and taste.
            </p>
          </div>

        </div>

      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-green-700 to-lime-500 text-white text-center py-16 my-10 shadow-2xl">

        <h2 className="text-4xl font-extrabold">
          Fresh Fruits Delivered to Your Door 🍎
        </h2>

        <p className="mt-4 text-xl">
          Healthy • Organic • Farm Fresh
        </p>

        <button className="mt-8 bg-white text-green-700 font-bold px-8 py-4 rounded-full hover:bg-green-100 transition duration-300">
          Shop Now
        </button>

      </div>

    </div>
  );
};

export default Home;