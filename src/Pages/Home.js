import React from "react";
import { Link } from "react-router-dom"; // Assumed link navigation for shop interactions
import HomeCarousel from "../Components/HomeCarousel";
import ExploreCategories from "../Components/ExploreCategories";
import SeasonalSection from "../Components/SeasonalSection";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-green-50/50 via-slate-50 to-white min-h-screen overflow-x-hidden">
      
      {/* 1. Hero Carousel Viewport */}
      <section className="relative shadow-lg border-b border-green-100/20">
        <HomeCarousel />
      </section>

      {/* 2. Welcome & Value Proposition Hook */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-green-600 uppercase bg-green-100/60 px-3 py-1.5 rounded-full">
          Premium Grocery Delivery
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mt-4">
          Fresh Fruits For A <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-600">Healthy Life</span> 🍎
        </h1>
        <p className="text-slate-600 text-lg md:text-xl mt-6 font-normal leading-relaxed max-w-2xl mx-auto">
          Experience farm-to-table perfection. Get crisp, nutritionally rich, and certified organic produce brought right straight to your door.
        </p>
      </section>

      {/* 3. Shop Categories Interactive Cluster */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-12">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Explore Fruit Categories 🍓
            </h2>
            <div className="h-1 w-16 bg-green-500 rounded-full mt-4"></div>
          </div>
          <ExploreCategories />
        </div>
      </section>

      {/* 4. Seasonal Flash Highlights */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-xl shadow-emerald-900/20 p-1 md:p-2">
          <div className="p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white tracking-tight mb-4">
              Seasonal Fresh Fruits 🌦️
            </h2>
            <p className="text-emerald-100 text-center text-sm md:text-base max-w-xl mx-auto mb-10">
              Handpicked varieties caught at the absolute peak of their annual harvest cycles.
            </p>
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-inner">
              <SeasonalSection />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Operational Features Matrix */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature: 100% Organic */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 height-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              100% Organic Quality
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sourced natively directly from sustainably certified partner orchards prioritizing natural biodiversity.
            </p>
          </div>

          {/* Feature: Fast Delivery */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-100 transition-colors">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Cold-Chain Logistics
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Expedited insulated transport methods protect fresh delicate items so items arrive perfectly unbruised.
            </p>
          </div>

          {/* Feature: Farm Fresh */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-100 transition-colors">
              <span className="text-2xl">🍉</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Artisan Handpicked
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every single piece undergoes meticulous quality checks to match elite freshness thresholds.
            </p>
          </div>

        </div>
      </section>

      {/* 6. High-Conversion Promo Section Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white text-center py-20 px-4 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to taste true natural vitality?
          </h2>
          <p className="mt-4 text-emerald-200 text-lg font-medium">
            Healthy • Organic • Farm Fresh Delivered Express
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              to="/home" 
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl shadow-md shadow-green-900/30 transition duration-200"
            >
              Order Produce Now
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;