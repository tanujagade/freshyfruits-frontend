import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const BASE_URL = "https://freshyfruits-backend.onrender.com";

const FruitDetails = () => {
  const { id } = useParams();

  const [fruit, setFruit] = useState(null);
  const [kg, setKg] = useState(1);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setFruit(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ADD TO CART
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
        quantity: kg, // ✅ FIX: send kg quantity
      });

      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Cart Error:", error);
      alert("Failed to add to cart");
    }
  };

  if (!fruit) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        {/* PRODUCT IMAGE */}
        <div className="bg-white p-6 rounded-lg shadow">
          <img
            src={`${BASE_URL}${fruit.image}`}
            alt={fruit.name}
            className="w-full h-[400px] object-cover rounded"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-bold mb-3">
            {fruit.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {fruit.description}
          </p>

          {/* PRICE */}
          <div className="text-2xl font-semibold text-green-600 mb-4">
            ₹{fruit.pricePerKg} / Kg
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mb-4">
            <label className="font-semibold">Quantity (Kg)</label>

            <input
              type="number"
              min="1"
              value={kg}
              onChange={(e) => setKg(Number(e.target.value))}
              className="border px-3 py-1 w-20 rounded"
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
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">
              Health Benefits
            </h3>

            <ul className="space-y-2">
              {fruit.benefits?.map((b, i) => (
                <li
                  key={i}
                  className="bg-green-50 p-2 rounded border"
                >
                  ✔ {b}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FruitDetails;