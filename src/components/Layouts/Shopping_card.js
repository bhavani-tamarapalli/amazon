// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Link,
//   Stack,
//   Button,
// } from "@mui/material";

// export const Shopping_card = () => {
//   const [sections, setSections] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/shopping-home-section")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched sections:", data);
//         setSections(data.sections || []); 
//       })
//       .catch((err) => console.error("Error:", err));
//   }, []);

//   return (
//     <Box sx={{ backgroundColor: "#fff", padding: "20px 16px", width: '100%',mt:3, maxWidth: 1400, mx: 'auto',backgroundColor:"white", }}>
//       <Grid container spacing={3}>
//         {sections.length === 0 && (
//           <Typography variant="body1" sx={{ padding: 2 }}>
//             No sections available.
//           </Typography>
//         )}
//         {sections.map((section, idx) => (
//           <Grid item xs={12} sm={6} md={3} key={section.id || idx}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "700",
//                 marginBottom: 1,
//                 borderBottom: "2px solid #febd69",
//                 paddingBottom: "4px",
//                 color: "#111",
//               }}
//             >
//               {section.title}
//             </Typography>

//             <Card
//               sx={{
//                 borderRadius: 1,
//                 boxShadow:
//                   "0 1px 2px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1)",
//                 transition: "box-shadow 0.3s ease",
//                 "&:hover": {
//                   boxShadow:
//                     "0 4px 12px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.15)",
//                 },
//                 cursor: "pointer",
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//                 backgroundColor: "#fff",
//               }}
//             >
//               {section.products && section.products.length > 0 ? (
//                 <>
//                   <Box
//                     sx={{
//                       position: "relative",
//                       paddingTop: "100%", // 1:1 aspect ratio
//                       overflow: "hidden",
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={`data:image/jpeg;base64,${section.products[0].image}`}
//                       alt={section.products[0].name}
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "contain",
//                         backgroundColor: "#f8f8f8",
//                       }}
//                     />
//                   </Box>

//                   <CardContent sx={{ flexGrow: 1, padding: "12px 16px" }}>
//                     <Typography
//                       variant="subtitle1"
//                       noWrap
//                       title={section.products[0].name}
//                       sx={{
//                         fontWeight: 600,
//                         color: "#111",
//                         marginBottom: "6px",
//                         cursor: "default",
//                       }}
//                     >
//                       {section.products[0].name}
//                     </Typography>

//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <Typography
//                         variant="h6"
//                         sx={{ fontWeight: "700", color: "#b12704" }}
//                       >
//                         ₹{section.products[0].price}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "#767676",
//                           textDecoration: "line-through",
//                           fontSize: "0.875rem",
//                         }}
//                       >
//                         ₹{section.products[0].mrp}
//                       </Typography>
//                     </Stack>
//                   </CardContent>

//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     sx={{
//                       padding: "0 16px 12px",
//                       overflowX: "auto",
//                       scrollbarWidth: "thin",
//                       scrollbarColor: "#ccc transparent",
//                     }}
//                   >
//                     {section.products[0].thumbnails?.map((thumb, i) => (
//                       <Box
//                         key={i}
//                         sx={{
//                           border: "1px solid #ddd",
//                           borderRadius: 1,
//                           padding: 0.5,
//                           backgroundColor: "#fff",
//                           minWidth: 40,
//                           minHeight: 40,
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           cursor: "pointer",
//                           transition: "border-color 0.3s ease",
//                           "&:hover": {
//                             borderColor: "#febd69",
//                           },
//                         }}
//                       >
//                         <img
//                           src={`data:image/jpeg;base64,${thumb.image}`}
//                           alt={`thumbnail-${i}`}
//                           style={{
//                             width: 32,
//                             height: 32,
//                             objectFit: "cover",
//                             borderRadius: 2,
//                           }}
//                         />
//                       </Box>
//                     ))}
//                   </Stack>
//                   <Box sx={{ padding: "0 16px 16px" }}>
//                     <Button
//                       variant="contained"
//                       fullWidth
//                       size="small"
//                       sx={{
//                         backgroundColor: "#febd69",
//                         color: "#111",
//                         textTransform: "none",
//                         fontWeight: 600,
//                         "&:hover": {
//                           backgroundColor: "#f3a847",
//                         },
//                       }}
//                       href="#"
//                     >
//                       See more
//                     </Button>
//                   </Box>
//                 </>
//               ) : (
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ padding: 2 }}
//                 >
//                   No products available
//                 </Typography>
//               )}
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Stack,
  Link,
} from "@mui/material";

export const Shopping_card = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/shopping-home-section")
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []))
      .catch((err) => console.error("Error fetching sections", err));
  }, []);

  return (
    <Box sx={{ padding: "24px 10px",width: '100%',mt:3, maxWidth: 1400, mx: 'auto',backgroundColor:"white", }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          gap: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {sections.map((section, idx) => {
          const products = section.products || [];
          const useThumbnails = idx === 1 || idx === 3; // ✅ Show thumbnails for 2nd and 4th card

          return (
            <Card
              key={section.id}
              sx={{
                minWidth: 280,
                maxWidth: 300,
                backgroundColor: "#fff",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 2,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                flexShrink: 0,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                sx={{ color: "#111", minHeight: 60 }}
              >
                {section.title}
              </Typography>

              {/* ✅ 2nd & 4th cards: Show 1 product with 4 thumbnails */}
              {useThumbnails && products[0] && products[0].thumbnails?.length >= 4 ? (
                <>
                  <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${products[0].image}`}
                    alt={products[0].name}
                    sx={{
                      height: 160,
                      objectFit: "contain",
                      mb: 1,
                      backgroundColor: "#f7f7f7",
                      borderRadius: 1,
                    }}
                  />

                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: "13px", minHeight: 48 }}
                  >
                    {products[0].name}
                  </Typography>

                  <Typography variant="body1" fontWeight="bold" color="#B12704">
                    ₹{products[0].price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    M.R.P: ₹{products[0].mrp}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-start"
                    sx={{ mt: 1 }}
                  >
                    {products[0].thumbnails.slice(0, 4).map((thumb, index) => (
                      <CardMedia
                        key={index}
                        component="img"
                        image={`data:image/jpeg;base64,${thumb.image}`}
                        alt={`thumb-${index}`}
                        sx={{
                          height: 50,
                          width: 50,
                          objectFit: "contain",
                          backgroundColor: "#f1f1f1",
                          border: "1px solid #ddd",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Stack>
                </>
              ) : (
                // ✅ 1st & 3rd cards: Show 4 different products
                <Box sx={{ flexDirection:"column",
                  columnCount:2,}}>
                  {products.slice(0, 4).map((product, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                       
                        mb: 1.5,
                        gap: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`data:image/jpeg;base64,${product.image}`}
                        alt={product.name}
                        sx={{
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          backgroundColor: "#f7f7f7",
                          borderRadius: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ fontSize: "13px" }}
                        >
                          {product.name?.slice(0, 28)}...
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="#B12704"
                        >
                          ₹{product.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              <Box mt={2}>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontWeight: 600,
                    color: "#007185",
                    fontSize: "14px",
                    display: "inline-block",
                    mt: 1,
                  }}
                >
                  See more
                </Link>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
