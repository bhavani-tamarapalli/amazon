// import React, { useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";


// export const CartPage = () => {
//   const { state, dispatch } = useAuth();

//   useEffect(() => {
//     if (!state.user) return;
//     fetch(`http://localhost:8000/api/cart/${state.user.id}`)
//       .then(res => res.json())
//       .then(data => dispatch({ type: "SET_CART", payload: data }));
//   }, [state.user]);

//   if (!state.user) return <Typography>Please log in to view your cart</Typography>;
//   if (!state.cart.length) return <Typography>Your cart is empty</Typography>;

//   return (
//     <Box p={4}>
//       {state.cart.map(item => (
//         <Box key={item.id} display="flex" gap={2} mb={2}>
//           <Typography>{item.product_name}</Typography>
//           <Typography>Qty: {item.quantity}</Typography>
//           <Typography>₹{item.price}</Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// import React, { useEffect } from "react";
// import { Box, Typography } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";
// import { useCart } from "./CartContext";

// export const CartPage = () => {
//   const { state: authState } = useAuth();
//   const { cart, dispatch } = useCart();

//   useEffect(() => {
//     if (!authState.user) return;
//     fetch(`http://localhost:8000/api/cart/${authState.user.id}`)
//       .then(res => res.json())
//       .then(data => dispatch({ type: "SET_CART", payload: data }))
//       .catch(err => console.error("Error loading cart:", err));
//   }, [authState.user]);

//   if (!authState.user) return <Typography>Please log in to view your cart</Typography>;
//   if (!cart.items.length) return <Typography>Your cart is empty</Typography>;

//   return (
//     <Box p={4}>
//       {cart.items.map((item, index) => (
//         <Box
//           key={index}
//           display="flex"
//           gap={2}
//           mb={2}
//           alignItems="center"
//           border="1px solid #ccc"
//           borderRadius={2}
//           p={2}
//         >
//           <img
//             src={item.image?.startsWith("data:image") ? item.image : `data:image/jpeg;base64,${item.image}`}
//             alt={item.product_name || item.name}
//             style={{
//               width: 80,
//               height: 80,
//               objectFit: "cover",
//               borderRadius: 4,
//             }}
//           />

//           <Box>
//             <Typography fontWeight="bold">
//               {item.product_name || item.name}
//             </Typography>
//             <Typography>Qty: {item.quantity}</Typography>
//             <Typography color="green">₹{item.price}</Typography>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };



import React, { useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "./CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const CartPage = () => {
  const { state: authState } = useAuth();
  const { cart, dispatch } = useCart();
  const user = authState.user;

  // Fetch cart items on page load
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8000/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => dispatch({ type: "SET_CART", payload: data }))
      .catch(err => console.error("Error loading cart:", err));
  }, [user]);

  if (!user) return <Typography>Please log in to view your cart</Typography>;
  if (!cart.items.length) return <Typography>Your cart is empty</Typography>;

  // Handle quantity update
  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    const res = await fetch("http://localhost:8000/api/cart/update-quantity", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        item_id: itemId,
        quantity: newQty,
      }),
    });
    const updated = await res.json();
    dispatch({ type: "SET_CART", payload: updated });
  };

  // Handle item delete
  const deleteItem = async (itemId) => {
    const res = await fetch(`http://localhost:8000/api/cart/${user.id}/${itemId}`, {
      method: "DELETE",
    });
    const updated = await res.json();
    dispatch({ type: "SET_CART", payload: updated });
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Your Shopping Cart</Typography>
      {cart.items.map((item) => (
        <Box
          key={item.id}
          display="flex"
          gap={2}
          mb={2}
          alignItems="center"
          border="1px solid #ccc"
          borderRadius={2}
          p={2}
        >
          <img
            src={
              item.image?.startsWith("data:image")
                ? item.image
                : `data:image/jpeg;base64,${item.image}`
            }
            alt={item.product_name || item.name}
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
          />

          <Box flex={1}>
            <Typography fontWeight="bold">{item.product_name || item.name}</Typography>
            <Typography color="green">₹{item.price}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <RemoveIcon />
              </IconButton>
              <Typography mx={1}>{item.quantity}</Typography>
              <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <IconButton color="error" onClick={() => deleteItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};
