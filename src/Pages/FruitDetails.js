import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const BASE_URL = "https://freshyfruits-backend.onrender.com";

const FruitDetails = () => {
  const { id } = useParams();

  const [fruit, setFruit] = useState(null);
  const [kg, setKg] = useState(1);

  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setFruit(res.data);
      } catch (err) {
        console.log("Fruit fetch error:", err);
      }
    };

    fetchFruit();
  }, [id]);

  const addToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      if (!fruit?._id) {
        alert("Product not loaded");
        return;
      }

      await api.post("/cart/add", {
        userId,
        productId: fruit._id,
        quantity: kg,
      });

      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Cart Error:", error);
      alert("Failed to add to cart");
    }
  };

  if (!fruit) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  const imageUrl = fruit.image
    ? fruit.image.startsWith("http")
      ? fruit.image
      : `${BASE_URL}${fruit.image}`
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* PRODUCT IMAGE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <img
            src={imageUrl}
            alt={fruit.name}
            className="w-full h-[400px] object-cover rounded"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=No+Image";
            }}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div>
          <h1 className="text-4xl font-bold mb-3">
            {fruit.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {fruit.description}
          </p>

          <div className="text-2xl font-semibold text-green-600 mb-4">
            ₹{fruit.pricePerKg} / Kg
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mb-4">
            <label className="font-semibold">
              Quantity (Kg)
            </label>

            <input
              type="number"
              min="1"
              value={kg}
              onChange={(e) =>
                setKg(Math.max(1, Number(e.target.value)))
              }
              className="border px-3 py-1 w-24 rounded"
            />
          </div>

          {/* TOTAL */}
          <p className="text-lg font-semibold mb-6">
            Total Price: ₹{fruit.pricePerKg * kg}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={addToCart}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Add To Cart
          </button>

          {/* BENEFITS */}
          {fruit.benefits && fruit.benefits.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">
                Health Benefits
              </h3>

              <ul className="space-y-2">
                {fruit.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="bg-green-50 p-2 rounded border"
                  >
                    ✔ {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SEASON */}
          {fruit.season && fruit.season.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">
                Available Seasons
              </h3>

              <div className="flex gap-2 flex-wrap">
                {fruit.season.map((s, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FruitDetails;