import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND_URL = "https://freshyfruits-backend.onrender.com";

const FruitCard = ({ fruit, addToCart }) => {
  const [kg, setKg] = useState(1);
  const navigate = useNavigate();

  if (!fruit) return null;

  const handleKgChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) {
      setKg(1);
    } else {
      setKg(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (!addToCart) {
        console.error("addToCart function not found");
        return;
      }

      Swal.fire({
        title: "Adding to cart...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await addToCart(fruit._id, kg);

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Added to Cart 🛒",
        text: `${fruit.name} added successfully!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/cart");
    } catch (err) {
      console.error("Add to cart error:", err);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to add item to cart",
      });
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!addToCart) {
        console.error("addToCart function not found");
        return;
      }

      Swal.fire({
        title: "Processing...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await addToCart(fruit._id, kg);

      Swal.close();

      navigate("/checkout");
    } catch (err) {
      console.error("Buy now error:", err);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Something went wrong",
      });
    }
  };

  const imageUrl = fruit.image
    ? fruit.image.startsWith("http")
      ? fruit.image
      : `${BACKEND_URL}${fruit.image}`
    : "/placeholder.jpg";

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={fruit.name || "Fruit"}
        className="w-full h-40 object-cover rounded"
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
        }}
      />

      {/* NAME */}
      <h2 className="font-bold text-lg mt-2">
        {fruit.name}
      </h2>

      {/* PRICE */}
      <p>
        ₹{fruit.pricePerKg} / Kg
      </p>

      {/* KG INPUT */}
      <input
        type="number"
        min="1"
        value={kg}
        onChange={handleKgChange}
        className="border w-full my-2 px-2 py-1 rounded"
      />

      {/* TOTAL */}
      <p className="font-semibold">
        Total: ₹{(fruit.pricePerKg * kg).toFixed(2)}
      </p>

      {/* BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Add To Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Buy Now
        </button>

        <Link
          to={`/fruit/${fruit._id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default FruitCard;