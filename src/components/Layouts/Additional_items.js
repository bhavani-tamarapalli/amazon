// RelatedItemsCarousel.js
import React, { useEffect, useState } from "react";
import { Box, Typography, CardMedia, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const AdditionalItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/additional-items")
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    return (
        <Box sx={{ px: 1, py: 3, width: '100%',mt:3, maxWidth: 1400, mx: 'auto',backgroundColor:"white",mb:3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                Additional items to explore
                </Typography>
                <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
                    See more
                </Link>
            </Box>

            <Swiper
                modules={[Navigation]}
                navigation
                // spaceBetween={10}
                slidesPerView={6}
                style={{ padding: "10px" }}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <CardMedia
                            component="img"
                            image={`data:image/jpeg;base64,${item.image}`}
                           
                            sx={{ height: 220, width: 210, objectFit: "contain" }}
                            alt={item.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};
