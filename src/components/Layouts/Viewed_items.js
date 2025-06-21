import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Chip,
    Button,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {Link as RouterLink} from 'react-router-dom'; 

const imageBase = "data:image/jpeg;base64,";

const truncate = (lines = 2) => ({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
});

export const Viewed_items = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/view-related-product")
            .then((res) => res.json())
            .then((data) => setSections(data.sections))
            .catch((err) => console.error(err));
    }, []);

    return (
        <Box sx={{ backgroundColor: "#fff", p: 2 }}>
            {sections.map((section) => (
                <Box key={section.id} mb={4}>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{ mb: 2, ml: 1 }}
                    >
                        Related to items you've viewed <Typography variant="caption" component="span" sx={{ color: "#007185", cursor: "pointer" }}>See more</Typography>
                    </Typography>

                    <Swiper slidesPerView={8} spaceBetween={15} navigation modules={[Navigation]}>
                        {section.products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Card
                                    sx={{
                                        height: 390,
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        boxShadow: "none",
                                        transition: "transform 0.2s",
                                        ":hover": { transform: "scale(1.02)" },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={`${imageBase}${product.image}`}
                                        alt={product.name}
                                        sx={{ objectFit: "contain", p: 1 }}
                                    />
                                    <CardContent sx={{ px: 1, pt: 0.5 }}>
                                        <Typography
                                            variant="body2"
                                            sx={truncate(2)}
                                            title={product.name}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Box display="flex" alignItems="center" gap={0.5} my={0.5}>
                                            <Rating
                                                value={parseFloat(product.rating)}
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {product.bought_count}+ bought in past month
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant="body2" fontWeight="bold">
                                                ₹{product.price}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ textDecoration: "line-through", color: "#555" }}
                                            >
                                                ₹{product.mrp}
                                            </Typography>
                                        </Box>

                                        {product.badge && (
                                            <Chip
                                                label={product.badge}
                                                color="error"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                        )}

                                        <Typography
                                            variant="caption"
                                            sx={{ mt: 1, display: "block", color: "#555" }}
                                        >
                                            Get it by <strong>{product.delivery_date}</strong>
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ color: "#4caf50", fontWeight: 500 }}
                                        >
                                            FREE Delivery by Amazon
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            ))}

            {/* Personalized Recommendation Footer Section */}
            <Box
                sx={{
                    textAlign: "center",
                    mt: 4,
                    borderTop: "1px solid #ccc",
                    pt: 4,
                    pb: 2,
                }}
            >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    See personalized recommendations
                </Typography>

                {/* <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFD814",
                        color: "#111",
                        borderRadius: "20px",
                        px: 4,
                        fontWeight: 600,
                        textTransform: "none",
                        ":hover": { backgroundColor: "#f7ca00" },
                    }}
                >
                    Sign in
                </Button> */}
                <Button
                    component={RouterLink}
                    to="/signin"
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFD814",
                        color: "#111",
                        borderRadius: "20px",
                        px: 4,
                        fontWeight: 600,
                        textTransform: "none",
                        ":hover": { backgroundColor: "#f7ca00" },
                    }}
                >
                    Sign in
                </Button>


                <Typography variant="caption" display="block" mt={1}>
                    New customer?{" "}
                    <Typography
                        variant="caption"
                        component="span"
                        sx={{ color: "#007185", cursor: "pointer" }}
                    >
                        Start here.
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};
