// // pages/ProductDetails.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button, Select, MenuItem } from "@mui/material";

// export const ProductDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedSize, setSelectedSize] = useState("");

//     useEffect(() => {
//         fetch(`http://localhost:8000/api/products/${id}`)
//             .then(res => res.json())
//             .then(data => {
//                 setProduct(data);
//                 setSelectedSize(data.size_options?.split(",")[0]);
//             });
//     }, [id]);

//     if (!product) return <div>Loading...</div>;

//     return (
//         <Box sx={{ display: "flex", gap: 4, p: 4 }}>
//             <img
//                 src={`data:image/jpeg;base64,${product.image}`}
//                 alt={product.name}
//                 style={{ width: 300, height: 400, objectFit: "cover" }}
//             />

//             <Box>
//                 <Typography variant="h5">{product.name}</Typography>
//                 <Typography variant="body2" sx={{ mt: 1 }}>{product.description}</Typography>
//                 <Typography variant="h6" sx={{ mt: 2, color: "green" }}>₹{product.price}</Typography>
//                 <Typography sx={{ textDecoration: "line-through" }}>₹{product.mrp}</Typography>
//                 <Typography color="red">-{product.discount}% off</Typography>
//                 <Typography>Rating:  {product.rating} ({product.review_count} reviews)</Typography>

//                 <Box sx={{ mt: 2 }}>
//                     <Typography variant="body1">Size:</Typography>
//                     <Select
//                         value={selectedSize}
//                         onChange={(e) => setSelectedSize(e.target.value)}
//                         sx={{ width: 120, mt: 1 }}
//                     >
//                         {product.size_options?.split(",").map((size) => (
//                             <MenuItem key={size} value={size}>{size}</MenuItem>
//                         ))}
//                     </Select>
//                 </Box>

//                 <Box sx={{ mt: 2 }}>
//                     <Button variant="contained" color="primary" sx={{ mr: 2 }}>Add to Cart</Button>
//                     <Button variant="contained" color="secondary">Buy Now</Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };
// pages/ProductDetails.js


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button, Rating } from "@mui/material";

// export const ProductDetails = () => {
//     const { product_id } = useParams(); 
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         if (!product_id) return;
//         fetch(`http://localhost:8000/api/products-details/${product_id}`)
//             .then((res) => res.json())
//             .then(setData)
//             .catch((err) => console.error("Error fetching product:", err));
//     }, [product_id]);

//     if (!data) {
//         return <div>Loading or no data found.</div>;
//     }

//     const { image, name, description, price, mrp, discount, rating, review_count, color, size_options } = data;

//     const imageUrl = image ? `data:image/jpeg;base64,${image}` : "";

//     return (
//         <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
//             <img
//                 src={imageUrl}
//                 // alt={name}
//                 alt="image"
//                 style={{ width: 300, height: 400, objectFit: "cover", borderRadius: 8 }}
//             />

//             <Box>
//                 <Typography variant="h4">{name}</Typography>
//                 <Typography sx={{ mt: 1 }}>{description}</Typography>

//                 <Typography variant="h5" sx={{ mt: 2, color: "green" }}>
//                     ₹{price}
//                 </Typography>
//                 <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
//                     ₹{mrp}
//                 </Typography>

//                 <Typography sx={{ color: "red", mt: 1 }}>
//                     You Save ₹{mrp - price}
//                 </Typography>

//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                     <Rating value={parseFloat(rating)} precision={0.5} readOnly />
//                     <Typography sx={{ ml: 1 }}>{rating} Stars ({review_count} reviews)</Typography>
//                 </Box>

//                 <Typography sx={{ mt: 1 }}>Color: {color}</Typography>
//                 <Typography sx={{ mt: 1 }}>Sizes: {size_options}</Typography>

//                 <Box sx={{ mt: 3 }}>
//                     <Button variant="contained" color="primary" sx={{ mr: 2 }}>
//                         Add to Cart
//                     </Button>
//                     <Button variant="contained" color="secondary">
//                         Buy Now
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button, Rating } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "./cart/CartContext";

// export const ProductDetails = () => {
//   const { product_id } = useParams();
//   const [data, setData] = useState(null);
//   const { state } = useAuth();
//   const { dispatch } = useCart(); 
//   const user = state.user;

//   useEffect(() => {
//     if (!product_id) return;
//     fetch(`http://localhost:8000/api/products-details/${product_id}`)
//       .then((res) => res.json())
//       .then(setData)
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [product_id]);

//   const handleAddToCart = async () => {
//     if (!user) {
//       alert("Please sign in to add items to your cart.");
//       return;
//     }

//     const response = await fetch("http://localhost:8000/api/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user_id: user.id,
//         product_id: data.id,
//         quantity: 1,
//       }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       alert("Product added to cart!");
//       dispatch({ type: "ADD_TO_CART", payload: { ...data, quantity: 1 } }); // ✅ Update context
//     } else {
//       alert(result.error || "Failed to add to cart.");
//     }
//   };

//   if (!data) return <div>Loading or no data found.</div>;

//   const {
//     image,
//     name,
//     description,
//     price,
//     mrp,
//     discount,
//     rating,
//     review_count,
//     color,
//     size_options,
//   } = data;

//   const imageUrl = image ? `data:image/jpeg;base64,${image}` : "";

//   return (
//     <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
//       <img
//         src={imageUrl}
//         alt="Product"
//         style={{ width: 300, height: 400, objectFit: "cover", borderRadius: 8 }}
//       />

//       <Box>
//         <Typography variant="h4">{name}</Typography>
//         <Typography sx={{ mt: 1 }}>{description}</Typography>
//         <Typography variant="h5" sx={{ mt: 2, color: "green" }}>
//           ₹{price}
//         </Typography>
//         <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
//           ₹{mrp}
//         </Typography>
//         <Typography sx={{ color: "red", mt: 1 }}>
//           You Save ₹{mrp - price}
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//           <Rating value={parseFloat(rating)} precision={0.5} readOnly />
//           <Typography sx={{ ml: 1 }}>
//             {rating} Stars ({review_count} reviews)
//           </Typography>
//         </Box>

//         <Typography sx={{ mt: 1 }}>Color: {color}</Typography>
//         <Typography sx={{ mt: 1 }}>Sizes: {size_options}</Typography>

//         <Box sx={{ mt: 3 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mr: 2 }}
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//           <Button variant="contained" color="secondary">
//             Buy Now
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Divider,
  Stack,
  MenuItem,
  Select,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useCart } from "./cart/CartContext";

export const ProductDetails = () => {
  const { product_id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { state: authState } = useAuth();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const user = authState.user;

  useEffect(() => {
    if (!product_id) return;
    fetch(`http://localhost:8000/api/products-details/${product_id}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching product:", err));
  }, [product_id]);

  const handleAddToCart = async () => {
    if (!user) {
      console.log("Please sign in to add items to your cart.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        product_name: data.name,
        price: data.price,
        image: data.image,
        quantity,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      dispatch({ type: "ADD_TO_CART", payload: { ...data, quantity } });
      console.log("Product added to cart!");
    } else {
      console.log(result.error || "Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      console.log("Please sign in to continue.");
      return;
    }

    navigate("/checkout", {
      state: { product: { ...data, quantity } },
    });
  };

  if (!data) return <div>Loading or no data found.</div>;

  const {
    image,
    name,
    description,
    price,
    mrp,
    rating,
    review_count,
    color,
    size_options,
  } = data;

  const imageUrl = image ? `data:image/jpeg;base64,${image}` : "";
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);

  return (
    <Box display="flex" gap={4} p={4} flexWrap="wrap">
      {/* LEFT: Product Image */}
      <Box>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: 400,
            height: 500,
            objectFit: "contain",
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
      </Box>

      {/* RIGHT: Product Info */}
      <Box flex={1} maxWidth={600}>
       
        <Typography variant="h5" fontWeight="bold" mt={1}>
          {name}
        </Typography>

        {/* Ratings */}
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating value={parseFloat(rating)} precision={0.5} readOnly size="small" />
          <Typography fontSize={14}>
            {rating} ({review_count} ratings)
          </Typography>
        </Box>

        {/* Deal Chip */}
        <Chip
          label="Limited time deal"
          color="error"
          sx={{ mt: 2, fontWeight: "bold" }}
        />

        {/* Price Section */}
        <Typography variant="h4" color="green" mt={1}>
          ₹{price}
        </Typography>
        <Typography
          fontSize={14}
          sx={{ textDecoration: "line-through", color: "#888" }}
        >
          M.R.P: ₹{mrp}
        </Typography>
        <Typography color="red" fontWeight="bold">
          You Save ₹{mrp - price} ({discountPercent}%)
        </Typography>

        {/* Size Selection */}
        <Box mt={2}>
          <Typography fontWeight="bold" mb={1}>
            Size:
          </Typography>
          <Stack direction="row" spacing={1}>
            {size_options?.split(",").map((s) => (
              <Button key={s} variant="outlined" size="small">
                {s.trim()}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Color */}
        <Box mt={2}>
          <Typography fontWeight="bold">Color:</Typography>
          <Chip
            label={color}
            variant="outlined"
            sx={{ mt: 1, background: "#f5f5f5" }}
          />
        </Box>

        {/* Quantity Dropdown */}
        <Box mt={3}>
          <Typography fontWeight="bold">Quantity:</Typography>
          <Select
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            sx={{ mt: 1, width: 100 }}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Delivery & Fulfilled */}
        <Typography fontSize={14} mt={3}>
          <Chip label="Amazon Fulfilled" size="small" color="success" />
          &nbsp; Delivered to <b>Rajahmundry, 533101</b> — FREE Delivery in 2 days
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Action Buttons */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="contained"
            color="warning"
            sx={{ fontWeight: "bold" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ fontWeight: "bold" }}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Box>

        {/* Description */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight="bold">
          About this item
        </Typography>
        <Typography fontSize={14} mt={1}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Button, Rating } from "@mui/material";

// export const ProductDetails = () => {
//     const { product_id } = useParams(); // Actually this is related_item_id
//     const [data, setData] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!product_id) return;

//         fetch(`http://localhost:8000/api/related-items/products/${product_id}`)
//             .then((res) => res.json())
//             .then((response) => {
//                 if (response.message === "Related item not found") {
//                     setError("Product not found.");
//                 } else {
//                     setData(response);
//                 }
//             })
//             .catch((err) => {
//                 console.error("Error fetching product:", err);
//                 setError("Failed to fetch product.");
//             });
//     }, [product_id]);

//     if (error) return <Typography sx={{ p: 4, color: "red" }}>{error}</Typography>;

//     if (!data) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

//     const { related_item, product } = data;

//     // Use related item image first, fallback to product image
//     const imageUrl = related_item?.image
//         ? `data:image/jpeg;base64,${related_item.image}`
//         : product?.image
//         ? `data:image/jpeg;base64,${product.image}`
//         : "";

//     return (
//         <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
//             <img
//                 src={imageUrl}
//                 alt={related_item?.name || product?.name || "Product"}
//                 style={{ width: 300, height: 400, objectFit: "cover", borderRadius: 8 }}
//             />

//             <Box>
//                 <Typography variant="h4">{related_item?.name || product?.name}</Typography>
//                 <Typography sx={{ mt: 1 }}>{product?.description}</Typography>

//                 <Typography variant="h5" sx={{ mt: 2, color: "green" }}>
//                     ₹{product?.price}
//                 </Typography>
//                 <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
//                     ₹{product?.mrp}
//                 </Typography>

//                 {product?.price && product?.mrp && (
//                     <Typography sx={{ color: "red", mt: 1 }}>
//                         You Save ₹{product.mrp - product.price}
//                     </Typography>
//                 )}

//                 {product?.rating && (
//                     <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                         <Rating value={parseFloat(product.rating)} precision={0.5} readOnly />
//                         <Typography sx={{ ml: 1 }}>
//                             {product.rating} Stars ({product.review_count} reviews)
//                         </Typography>
//                     </Box>
//                 )}

//                 <Typography sx={{ mt: 1 }}>Color: {product?.color}</Typography>
//                 <Typography sx={{ mt: 1 }}>Sizes: {product?.size_options}</Typography>

//                 <Box sx={{ mt: 3 }}>
//                     <Button variant="contained" color="primary" sx={{ mr: 2 }}>
//                         Add to Cart
//                     </Button>
//                     <Button variant="contained" color="secondary">
//                         Buy Now
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };
