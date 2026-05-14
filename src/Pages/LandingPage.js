import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import organicfruits from "../Images/organicfruits.png";
import mango from "../Images/mango.jpg";
import orange from "../Images/orange.jpg";
import strawberry from "../Images/strawberry.jpg";
import melons from "../Images/melons.jpg";
import exoticfruit from "../Images/exoticfruit.jpg";
import coconut from "../Images/coconut.jpg";
const highlights = [
  {
    title: "Farm-Fresh Quality",
    desc: "Sourced directly from trusted local farmers.",
  },
  {
    title: "Fast & Reliable Delivery",
    desc: "Fresh fruits delivered within hours.",
  },
  {
    title: "Affordable Pricing",
    desc: "Premium quality without premium prices.",
  },
];

// const fruitCategories = [
//   "Seasonal Fruits",
//   "Fruits for Glowing Skin",
//   "Berries",
//   "Melons",
//   "Exotic Fruits",
//   "More Fresh Picks",
// ];

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full font-sans text-gray-800">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[90vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${organicfruits})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl" data-aos="fade-right">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Fresh Fruits,
              <span className="text-lime-300"> Delivered Fresh</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-200">
              Experience farm-fresh fruits delivered straight to your home.
              Healthy living starts with FreshyFruits.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-lg bg-lime-400 text-green-900 font-semibold hover:bg-lime-500 transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 rounded-lg border border-white/40 text-white hover:bg-white/10 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div data-aos="fade-up">
            <h3 className="text-2xl font-bold text-green-700">10k+</h3>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-bold text-green-700">4.8★</h3>
            <p className="text-sm text-gray-600">Customer Rating</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-green-700">100%</h3>
            <p className="text-sm text-gray-600">Fresh Guarantee</p>
          </div>
        </div>
      </section>
{/* ================= FRUIT CATEGORIES ================= */}
{/* ================= FRUIT CATEGORIES ================= */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-gray-900">
        Explore Our Fruit Categories
      </h2>
      <p className="mt-4 text-gray-600">
        Carefully curated fruit collections to match your health and lifestyle needs.
      </p>
    </div>

    {/* Categories Grid */}
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

      {/* Seasonal Fruits */}
      <div
        data-aos="zoom-in"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
        {/* IMAGE PLACE */}
        <img src={mango} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>

        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Seasonal Fruits
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Fresh fruits selected according to the current season for maximum nutrition.
          </p>
        </div>
      </div>

      {/* Fruits for Glowing Skin */}
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
        <img src={orange} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Fruits for Glowing Skin
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Vitamin-rich fruits that help improve skin health and natural glow.
          </p>
        </div>
      </div>

      {/* Berries */}
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
      <img src={strawberry} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Berries
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Antioxidant-rich berries for immunity, brain health, and energy.
          </p>
        </div>
      </div>

      {/* Melons */}
      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
      <img src={melons} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Melons
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Hydrating and refreshing fruits perfect for digestion and summer health.
          </p>
        </div>
      </div>

      {/* Exotic Fruits */}
      <div
        data-aos="zoom-in"
        data-aos-delay="400"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
      <img src={exoticfruit} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>

        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Exotic Fruits
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Imported and premium fruits with unique taste and high nutritional value.
          </p>
        </div>
      </div>

      {/* Fresh Daily Picks */}
      <div
        data-aos="zoom-in"
        data-aos-delay="500"
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
      >
      <img src={coconut} alt="Seasonal Fruits" className="h-48 w-full object-cover"/>

        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">
            Fresh Daily Picks
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Hand-selected fruits delivered fresh every day from trusted farms.
          </p>
        </div>
      </div>

    </div>

    {/* SINGLE VIEW BUTTON */}
    <div className="mt-16 text-center" data-aos="fade-up">
      <Link
        to="/login"
        className="inline-block px-12 py-4 bg-lime-400 text-green-900 font-semibold rounded-lg hover:bg-lime-500 transition"
      >
        View All Fruits
      </Link>
    </div>

  </div>
</section>



      {/* ================= WHY US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose FreshyFruits
            </h2>
            <p className="mt-4 text-gray-600">
              We focus on quality, freshness, and customer satisfaction.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-green-700">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center text-gray-900"
            data-aos="fade-up"
          >
            How It Works
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="text-center"
                data-aos="zoom-in"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-lime-100 flex items-center justify-center text-green-700 font-bold">
                  {step}
                </div>
                <h3 className="mt-4 font-semibold">
                  {step === 1
                    ? "Select Fruits"
                    : step === 2
                    ? "Place Order"
                    : "Get Delivery"}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {step === 1
                    ? "Choose from seasonal and premium fruits."
                    : step === 2
                    ? "Secure and quick checkout process."
                    : "Fresh fruits delivered to your doorstep."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-lime-900 text-center">
        <h2 className="text-3xl font-bold text-white" data-aos="fade-up">
          Eat Fresh. Live Healthy.
        </h2>
        <p className="mt-4 text-lime-100" data-aos="fade-up">
          Join thousands who trust FreshyFruits every day.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 px-10 py-4 bg-lime-400 text-green-900 font-semibold rounded-lg hover:bg-lime-500 transition"
          data-aos="zoom-in"
        >
          Start Ordering
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
