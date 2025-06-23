import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product }) => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!state.user) return navigate("/signin");

    const res = await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: state.user.id,
        product_name: product.name,
        price: product.price,
      }),
    });

    if (res.ok) {
      const updated = await fetch(`http://localhost:8000/api/cart/${state.user.id}`).then(r => r.json());
      dispatch({ type: "SET_CART", payload: updated });
      console.log("Added to cart");
    } else {
      console.log("Failed to add");
    }
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
};

export default AddToCart;
