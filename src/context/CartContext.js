import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");


  /* FETCH CART */
  const fetchCart = useCallback(async () => {

    try {

      if (!userId) return;

      const res = await api.get(`/cart/${userId}`);

      if (res.data && res.data.items) {
        setCartItems(res.data.items);
      } else {
        setCartItems([]);
      }

    } catch (error) {
      console.log("Cart fetch error:", error);
    }

  }, [userId]);


  /* ADD TO CART */
  const addToCart = async (productId, quantity = 1) => {

    try {

      if (!userId) {
        Swal.fire({
          icon: "warning",
          title: "Login Required 🔐",
          text: "Please login first!"
        });
        return;
      }

      await api.post("/cart/add", {
        userId,
        productId,
        quantity: Number(quantity)
      });

      fetchCart();

      // ✅ SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Added to Cart 🛒",
        text: "Item added successfully!",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      console.log("Add to cart error:", error);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to add item to cart"
      });
    }

  };


  /* REMOVE ITEM */
  const removeItem = async (itemId) => {

    try {

      // ❓ CONFIRM REMOVE
      const result = await Swal.fire({
        title: "Remove Item?",
        text: "Do you want to remove this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, remove"
      });

      if (!result.isConfirmed) return;

      await api.delete(`/cart/remove/${itemId}`);

      fetchCart();

      // ✅ REMOVED ALERT
      Swal.fire({
        icon: "success",
        title: "Removed 🗑️",
        text: "Item removed from cart",
        timer: 1200,
        showConfirmButton: false
      });

    } catch (error) {
      console.log("Remove error:", error);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to remove item"
      });
    }

  };


  /* UPDATE QUANTITY */
  const updateQuantity = async (productId, quantity) => {

    try {

      await api.put("/cart/update", {
        userId,
        productId,
        quantity
      });

      fetchCart();

    } catch (error) {
      console.log("Update error:", error);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to update quantity"
      });
    }

  };


  /* CLEAR CART */
  const clearCart = async () => {

    try {

      const result = await Swal.fire({
        title: "Clear Cart?",
        text: "All items will be removed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, clear"
      });

      if (!result.isConfirmed) return;

      await api.delete(`/cart/clear/${userId}`);

      setCartItems([]);

      Swal.fire({
        icon: "success",
        title: "Cart Cleared 🧹",
        timer: 1200,
        showConfirmButton: false
      });

    } catch (error) {
      console.log("Clear cart error:", error);

      Swal.fire({
        icon: "error",
        title: "Error ❌",
        text: "Failed to clear cart"
      });
    }

  };


  /* CART COUNT */
  const cartCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};