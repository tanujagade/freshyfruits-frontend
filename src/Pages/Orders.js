import { useEffect, useState } from "react";
import api from "../api";

const BASE_URL = "https://freshyfruits-backend.onrender.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    api
      .get(`/orders/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const cancelOrder = async (id) => {
    try {
      await api.put(`/orders/cancel/${id}`);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, status: "Cancelled" }
            : order
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getImageUrl = (image) => {
    if (!image) {
      return "https://via.placeholder.com/150?text=No+Image";
    }

    return image.startsWith("http")
      ? image
      : `${BASE_URL}${image}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        📦 Your Orders
      </h2>

      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      {orders.map((order) => {
        const isCancelled = order.status === "Cancelled";

        return (
          <div
            key={order._id}
            className={`border p-6 mb-6 rounded-lg shadow ${
              isCancelled ? "opacity-60 bg-gray-100" : ""
            }`}
          >
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <p className="font-semibold">
                Order No: FR-{order._id.slice(-6).toUpperCase()}
              </p>

              <p
                className={`font-semibold ${
                  isCancelled
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </p>
            </div>

            {/* DATE */}
            <p className="text-gray-600 mb-4">
              Ordered on:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* PRODUCTS */}
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 mb-3"
              >
                <img
                  src={getImageUrl(item.productId?.image)}
                  alt={item.productId?.name || "Fruit"}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                />

                <div>
                  <p className="font-medium">
                    {item.productId?.name}
                  </p>

                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* TRACKING */}
            {!isCancelled && (
              <div className="flex gap-4 mt-4 text-sm flex-wrap">
                <span
                  className={
                    order.status === "Order Placed"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  Order Placed ✓
                </span>

                <span
                  className={
                    order.status === "Packed"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  Packed
                </span>

                <span
                  className={
                    order.status === "Shipped"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  Shipped
                </span>

                <span
                  className={
                    order.status === "Delivered"
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  Delivered
                </span>
              </div>
            )}

            {/* CANCEL MESSAGE */}
            {isCancelled && (
              <p className="text-red-600 font-semibold mt-4">
                ❌ This order has been cancelled
              </p>
            )}

            {/* TOTAL */}
            <p className="font-bold mt-4">
              Total: ₹{order.totalAmount}
            </p>

            {/* CANCEL BUTTON */}
            {order.status === "Order Placed" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;