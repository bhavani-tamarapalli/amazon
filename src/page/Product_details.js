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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, Rating } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useCart } from "./cart/CartContext";

export const ProductDetails = () => {
  const { product_id } = useParams();
  const [data, setData] = useState(null);
  const { state } = useAuth();
  const { dispatch } = useCart(); 
  const user = state.user;

  useEffect(() => {
    if (!product_id) return;
    fetch(`http://localhost:8000/api/products-details/${product_id}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching product:", err));
  }, [product_id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please sign in to add items to your cart.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        product_id: data.id,
        quantity: 1,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Product added to cart!");
      dispatch({ type: "ADD_TO_CART", payload: { ...data, quantity: 1 } }); // ✅ Update context
    } else {
      alert(result.error || "Failed to add to cart.");
    }
  };

  if (!data) return <div>Loading or no data found.</div>;

  const {
    image,
    name,
    description,
    price,
    mrp,
    discount,
    rating,
    review_count,
    color,
    size_options,
  } = data;

  const imageUrl = image ? `data:image/jpeg;base64,${image}` : "";

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
      <img
        src={imageUrl}
        alt="Product"
        style={{ width: 300, height: 400, objectFit: "cover", borderRadius: 8 }}
      />

      <Box>
        <Typography variant="h4">{name}</Typography>
        <Typography sx={{ mt: 1 }}>{description}</Typography>
        <Typography variant="h5" sx={{ mt: 2, color: "green" }}>
          ₹{price}
        </Typography>
        <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
          ₹{mrp}
        </Typography>
        <Typography sx={{ color: "red", mt: 1 }}>
          You Save ₹{mrp - price}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Rating value={parseFloat(rating)} precision={0.5} readOnly />
          <Typography sx={{ ml: 1 }}>
            {rating} Stars ({review_count} reviews)
          </Typography>
        </Box>

        <Typography sx={{ mt: 1 }}>Color: {color}</Typography>
        <Typography sx={{ mt: 1 }}>Sizes: {size_options}</Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button variant="contained" color="secondary">
            Buy Now
          </Button>
        </Box>
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
