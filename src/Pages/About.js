import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-lime-600 text-white py-20 text-center">
        <img
          src="/favicon.png"
          alt="FreshyFruits"
          className="w-24 h-24 mx-auto bg-white rounded-full p-2 mb-4"
        />

        <h1 className="text-5xl font-bold mb-4">
          About FreshyFruits
        </h1>

        <p className="text-lg max-w-3xl mx-auto">
          Bringing farm-fresh fruits directly to your doorstep with quality,
          freshness and care.
        </p>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Our Story
            </h2>

            <p className="text-gray-700 leading-8">
              FreshyFruits was created with a simple goal: making fresh,
              healthy and premium quality fruits available online for everyone.
              We carefully select fruits from trusted farms and deliver them
              directly to customers while maintaining freshness and quality.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf"
              alt="Fresh Fruits"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>

      </div>

      {/* Features */}
      <div className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-green-50 p-6 rounded-xl text-center shadow">
              <h3 className="text-xl font-bold mb-2">🍎 Fresh Fruits</h3>
              <p>Directly sourced from farms.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl text-center shadow">
              <h3 className="text-xl font-bold mb-2">🚚 Fast Delivery</h3>
              <p>Quick doorstep delivery.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl text-center shadow">
              <h3 className="text-xl font-bold mb-2">💚 Healthy Living</h3>
              <p>Quality fruits for better health.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl text-center shadow">
              <h3 className="text-xl font-bold mb-2">⭐ Trusted Service</h3>
              <p>Customer satisfaction first.</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;