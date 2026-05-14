import { useState, useContext } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { cartItems = [], clearCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 💳 PAYMENT HANDLER
  const handlePayment = async () => {
    try {
      // VALIDATION
      if (!address || !city || !pincode) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Details",
          text: "Please fill all fields!",
        });
      }

      if (!cartItems.length) {
        return Swal.fire({
          icon: "warning",
          title: "Cart Empty 🛒",
          text: "Add items before payment!",
        });
      }

      // CONFIRM
      const confirm = await Swal.fire({
        title: "Proceed to Payment?",
        text: `Total Amount: ₹${totalAmount}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        confirmButtonText: "Pay Now",
      });

      if (!confirm.isConfirmed) return;

      // CREATE ORDER (Backend)
      const { data } = await api.post("/payment/create-order", {
        amount: totalAmount,
      });

      // ⚠️ CHECK Razorpay loaded
      if (!window.Razorpay) {
        return Swal.fire({
          icon: "error",
          title: "Razorpay not loaded",
          text: "Please refresh page and try again",
        });
      }

      const options = {
        key: "YOUR_KEY_ID", // 🔴 replace later with real key
        amount: data.amount,
        currency: "INR",
        name: "Fresh Fruits",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            // VERIFY PAYMENT
            const verifyRes = await api.post(
              "/payment/verify",
              response
            );

            if (verifyRes.data.success) {
              // SAVE ORDER
              await api.post("/orders/create", {
                userId,
                items: cartItems,
                totalAmount,
                address,
                city,
                pincode,
              });

              // CLEAR CART
              await clearCart();

              Swal.fire({
                icon: "success",
                title: "Payment Successful 🎉",
                text: "Order placed successfully!",
                confirmButtonColor: "#16a34a",
              });

              navigate("/home");
            } else {
              Swal.fire({
                icon: "error",
                title: "Verification Failed ❌",
                text: "Payment could not be verified",
              });
            }
          } catch (err) {
            console.log(err);
          }
        },

        prefill: {
          name: "Customer",
          email: "test@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Payment Failed ❌",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <input
        placeholder="Address"
        className="border w-full p-2 mb-3"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        placeholder="City"
        className="border w-full p-2 mb-3"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        placeholder="Pincode"
        className="border w-full p-2 mb-3"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded w-full"
      >
        💳 Pay & Place Order
      </button>
    </div>
  );
};

export default Checkout;