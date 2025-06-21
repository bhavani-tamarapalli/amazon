

// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, CircularProgress, Card, CardContent,
//     CardMedia, Button, Grid
// } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/autoplay';

// export const Home = () => {
//     const [banners, setBanners] = useState([]);
//     const [cards, setCards] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('http://localhost:8000/api/home-sections')
//             .then((res) => res.json())
//             .then((data) => {
//                 setBanners(data.banners || []);
//                 setCards(data.cards || []);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching data:', err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ width: '100%', maxWidth: 1300, mx: 'auto', my: 4 }}>
//             {/* Carousel Banner */}
//             <Swiper
//                 modules={[Autoplay]}
//                 autoplay={{ delay: 3000 }}
//                 loop
//                 slidesPerView={1}
//                 style={{ borderRadius: '16px', marginBottom: '32px' }}
//             >
//                 {banners.map((item) => (
//                     <SwiperSlide key={item.id}>
//                         <Box
//                             sx={{
//                                 height: { xs: 200, sm: 300, md: 400 },
//                                 borderRadius: 2,
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <img
//                                 src={`data:image/jpeg;base64,${item.image}`}
//                                 alt={item.title}
//                                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                             />
//                         </Box>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>


//             {/* Cards Section */}
//             {cards.length === 0 ? (
//                 <Typography variant="h6" textAlign="center" mt={4}>No cards to display.</Typography>
//             ) : (
//                 <Grid container spacing={2} >
//                     {cards.map((section) => (
//                         <Grid item xs={12} sm={6} md={4} key={section.id}>
//                             <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%', }}>
//                                 {section.image && (
//                                     <CardMedia
//                                         component="img"
//                                         height="160"
//                                         image={`data:image/jpeg;base64,${section.image}`}
//                                         alt={section.title}
//                                         sx={{ objectFit: 'cover' }}
//                                     />
//                                 )}
//                                 <CardContent>
//                                     <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                                         {section.title}
//                                     </Typography>
//                                     {section.subtitle && (
//                                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                                             {section.subtitle}
//                                         </Typography>
//                                     )}
//                                     <Button variant="outlined" size="small">Explore all</Button>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}

//         </Box>
//     );
// };

import React, { useEffect, useState } from 'react';
import {
    Box, Typography, CircularProgress, Card, CardContent,
    CardMedia, Button, Grid
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export const Home = () => {
    const [banners, setBanners] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/home-sections')
            .then((res) => res.json())
            .then((data) => {
                setBanners(data.banners || []);
                setCards(data.cards || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', my: 4, position: 'relative' }}>
           
            <Box sx={{ position: 'relative' }}>
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop
                    slidesPerView={1}
                    style={{ borderRadius: '16px', marginBottom: '32px' }}
                >
                    {banners.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Box
                                sx={{
                                    height: { xs: 200, sm: 300, md: 400 },
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={`data:image/jpeg;base64,${item.image}`}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {cards.length > 0 && (
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            position: 'absolute',
                            top: { xs: '60%', sm: '65%', md: '90%' },
                            left: 0,
                            width: '100%',
                            px: 2,
                            zIndex: 2,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {cards.map((section) => (
                            <Grid item xs={12} sm={6} md={4} key={section.id}>
                                <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ my: 2, px: 2 }}>
                                        {section.title}
                                    </Typography>
                                    {section.image && (

                                        <CardMedia

                                            component="img"
                                            height="200"
                                            image={`data:image/jpeg;base64,${section.image}`}
                                            alt={section.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardContent>

                                        {section.subtitle && (
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {section.subtitle}
                                            </Typography>
                                        )}
                                        <Button size="small">See more</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>

    );
};



