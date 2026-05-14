import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FruitCard = ({ fruit, addToCart }) => {

  const [kg, setKg] = useState(1);
  const navigate = useNavigate();

  if (!fruit) return null;

  // ✅ HANDLE KG
  const handleKgChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) {
      setKg(1);
    } else {
      setKg(value);
    }
  };

  // ✅ ADD TO CART
  const handleAddToCart = async () => {
    try {

      if (!addToCart) {
        console.error("addToCart function not found");
        return;
      }

      // ⏳ LOADING
      Swal.fire({
        title: "Adding to cart...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await addToCart(fruit._id, kg);

      Swal.close(); // close loading

      // ✅ SUCCESS
      Swal.fire({
        icon: "success",
        title: "Added to Cart 🛒",
        text: `${fruit.name} added successfully!`,
        timer: 1500,
        showConfirmButton: false
      });

      navigate("/cart");

    } catch (err) {
      console.error("Add to cart error:", err);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to add item to cart"
      });
    }
  };

  // ✅ BUY NOW
  const handleBuyNow = async () => {
    try {

      if (!addToCart) {
        console.error("addToCart function not found");
        return;
      }

      // ⏳ LOADING
      Swal.fire({
        title: "Processing...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await addToCart(fruit._id, kg);

      Swal.close();

      navigate("/checkout");

    } catch (err) {
      console.error("Buy now error:", err);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Something went wrong"
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">

      {/* IMAGE */}
      <img
        src={fruit.image ? `http://localhost:5000${fruit.image}` : "/placeholder.jpg"}
        alt={fruit.name || "Fruit"}
        className="w-full h-40 object-cover rounded"
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