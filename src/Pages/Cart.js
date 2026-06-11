import { useEffect, useState, useCallback } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchCart = useCallback(() => {
    if (!userId) return;

    api
      .get(`/cart/${userId}`)
      .then((res) => {
        if (res.data && res.data.items) {
          setCart(res.data.items);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/remove/${itemId}?userId=${userId}`);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQty = async (productId, qty) => {
    try {
      await api.put("/cart/update", {
        userId,
        productId,
        quantity: qty + 1,
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQty = async (productId, qty) => {
    try {
      if (qty <= 1) return;

      await api.put("/cart/update", {
        userId,
        productId,
        quantity: qty - 1,
      });

      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce((acc, item) => {
    return acc + item.productId.pricePerKg * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            const imageUrl = item.productId?.image
              ? item.productId.image
              : "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800";

            return (
              <div
                key={item._id}
                className="flex items-center justify-between border p-4 rounded-lg shadow"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-6">
                  <img
                    src={imageUrl}
                    alt={item.productId?.name}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800";
                    }}
                  />

                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.productId?.name}
                    </h3>

                    <p className="text-gray-600">
                      ₹{item.productId?.pricePerKg} / Kg
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQty(item.productId._id, item.quantity)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-bold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.productId._id, item.quantity)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* PRICE + REMOVE */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ₹{item.productId.pricePerKg * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* TOTAL */}
          <div className="flex justify-between items-center border-t pt-6">
            <h3 className="text-2xl font-bold">
              Total: ₹{total}
            </h3>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;