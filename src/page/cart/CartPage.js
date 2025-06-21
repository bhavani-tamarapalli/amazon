import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";


export const CartPage = () => {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    if (!state.user) return;
    fetch(`http://localhost:8000/api/cart/${state.user.id}`)
      .then(res => res.json())
      .then(data => dispatch({ type: "SET_CART", payload: data }));
  }, [state.user]);

  if (!state.user) return <Typography>Please log in to view your cart</Typography>;
  if (!state.cart.length) return <Typography>Your cart is empty</Typography>;

  return (
    <Box p={4}>
      {state.cart.map(item => (
        <Box key={item.id} display="flex" gap={2} mb={2}>
          <Typography>{item.product_name}</Typography>
          <Typography>Qty: {item.quantity}</Typography>
          <Typography>₹{item.price}</Typography>
        </Box>
      ))}
    </Box>
  );
};
