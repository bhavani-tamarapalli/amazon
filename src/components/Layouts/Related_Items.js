
// import React, { useState, useEffect } from "react";
// import { Box, Typography, CardMedia, Link } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// export const RelatedItems = () => {
//     const [items, setItems] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("http://localhost:8000/api/related-items")
//             .then((res) => res.json())
//             .then((data) => setItems(data))
//             .catch((err) => console.error("Fetch error:", err));
//     }, []);

//     return (
//         <Box sx={{ px: 1, py: 5, width: '100%', maxWidth: 1400, mx: 'auto', backgroundColor: "white" }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                     Related to items you've viewed
//                 </Typography>
//                 <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
//                     See more
//                 </Link>
//             </Box>

//             <Swiper modules={[Navigation]} navigation slidesPerView={9} style={{ padding: "10px" }}>
//                 {items.map((item) => (
//                     <SwiperSlide
//                         key={item.id}
//                         // onClick={() => navigate(`/product/${item.product_id}`)}
//                         onClick={()=>navigate(`/nav-item/${nav_item_id}`)}
//                         style={{ cursor: "pointer" }}
//                     >
//                         <CardMedia
//                             component="img"
//                             image={`data:image/jpeg;base64,${item.image}`}
//                             sx={{ height: 220, width: 150, objectFit: "contain" }}
//                             alt={item.name}
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </Box>
//     );
// };


import React, { useState, useEffect } from "react";
import { Box, Typography, CardMedia, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

export const RelatedItems = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/api/related-items")
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <Box sx={{ px: 1, py: 5, width: '100%', maxWidth: 1400, mx: 'auto', backgroundColor: "white" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Related to items you've viewed
                </Typography>
                <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
                    See more
                </Link>
            </Box>

            <Swiper modules={[Navigation]} navigation slidesPerView={9} style={{ padding: "10px" }}>
                {items.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        onClick={() => navigate(`/product/${item.product_id}`)}


                        style={{ cursor: "pointer" }}
                    >
                        <CardMedia
                            component="img"
                            image={`data:image/jpeg;base64,${item.image}`}
                            sx={{ height: 220, width: 150, objectFit: "contain" }}
                            alt={item.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};


// import React, { useState, useEffect } from "react";
// import { Box, Typography, CardMedia, Link } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// export const RelatedItems = () => {
//     const [items, setItems] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch("http://localhost:8000/api/related-items")
//             .then((res) => res.json())
//             .then((data) => setItems(data))
//             .catch((err) => console.error("Fetch error:", err));
//     }, []);

//     return (
//         <Box sx={{ px: 1, py: 5, width: '100%', maxWidth: 1400, mx: 'auto', backgroundColor: "white" }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold">
//                     Related to items you've viewed
//                 </Typography>
//                 <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
//                     See more
//                 </Link>
//             </Box>

//             <Swiper modules={[Navigation]} navigation slidesPerView={6} style={{ padding: "10px" }}>
//                 {items.map((item) => (
//                     <SwiperSlide
//                         key={item.id}
//                         onClick={() => navigate(`/product/${item.id}`)} // Use related_item ID
//                         style={{ cursor: "pointer" }}
//                     >
//                         <CardMedia
//                             component="img"
//                             image={`data:image/jpeg;base64,${item.image}`}
//                             sx={{ height: 220, width: 150, objectFit: "contain", borderRadius: 2, boxShadow: 2 }}
//                             alt={item.name}
//                         />
//                         <Typography sx={{ textAlign: "center", mt: 1 }} variant="body2">{item.name}</Typography>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </Box>
//     );
// };
