

// import React from 'react'
// import { Card } from '@mui/material'
// import {
//     Box, Typography, CircularProgress, CardContent,
//     CardMedia, Button, Grid
// } from '@mui/material';

// export const Cards = () => {
//     return (

//         <Box>
//             <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%', mt: 20 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ my: 2, px: 2 }}>
//                     cardsss
//                 </Typography>


//                 <CardMedia

//                     component="img"
//                     height="200"

//                     sx={{ objectFit: 'cover' }}
//                 />

//                 <CardContent>


//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                         {/* {section.subtitle} */}
//                     </Typography>

//                     <Button size="small">See more</Button>
//                 </CardContent>
//             </Card>

//         </Box>



//     )
// }

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, Link
} from '@mui/material';
import image from "../../assets/images/home_tools.jpg";

export const MultiCardSections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/sections')
      .then(res => res.json())
      .then(data => setSections(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <>
      <Box sx={{ px: 3, py: 5, mt: 20, width: '100%', maxWidth: 1400, mx: 'auto', }}>
        <Grid container spacing={2}>
          {sections.map((section, sectionIndex) => (
            <Grid item key={sectionIndex}>
              <Card sx={{ width: 300, p: 2, height: 350 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {section.title}
                </Typography>

                <Grid container spacing={3}>
                  {section.items?.slice(0, 4).map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <CardMedia
                          component="img"
                          height="80"
                          src={item.image ? `data:image/jpeg;base64,${item.image}` : image}
                          alt={item.name || 'item'}
                          sx={{ objectFit: 'cover', borderRadius: 1 }}
                        />
                        <Typography variant="body2" mt={2}>
                          {item.subtitle || 'Subtitle'}
                        </Typography>

                      </Box>

                    </Grid>

                  ))}
                </Grid>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: '#007185', fontWeight: 500, fontSize: '14px', pt: 2 }}
                >
                  See all offers
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </>

  );
};



{/* <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={3} key={section.id}>
            <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
             
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>

              
              <Grid container spacing={1} sx={{display:"inline-block",}}>
                {section.items.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <CardMedia
                      component="img"
                      height="80"
                      image={`data:image/jpeg;base64,${item.image}`}
                      alt={item.name}
                      sx={{ objectFit: 'contain', borderRadius: 1 }}
                    />
                    <Typography variant="body2" mt={0.5}>
                      {item.subtitle}
                    </Typography>
                    <Box mt={2}>
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ color: '#007185', fontWeight: 500, fontSize: '14px' }}
                      >
                        See all offers
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid> */}
