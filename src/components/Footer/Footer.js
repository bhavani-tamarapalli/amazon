import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Stack,
  Link,
} from "@mui/material";
import AmazonLogo from "../../assets/images/amazonlogo.png";

export const Footer = () => {
  const footerLinkStyle = {
    color: "#ddd",
    fontSize: "13px",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  };

  return (
    <Box sx={{ bgcolor: "#232F3E", color: "white", fontSize: "14px", mt: 2 }}>
      {/* Back to top */}
      <Box
        sx={{
          bgcolor: "#37475A",
          textAlign: "center",
          py: 1.5,
          cursor: "pointer",
          fontWeight: 500,
          fontSize: "13px",
          "&:hover": { opacity: 0.9 },
        }}
      >
        Back to top
      </Box>

      {/* Main Footer Links */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 5, px: 2 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "Get to Know Us",
              links: [
                "About Us",
                "Careers",
                "Press Releases",
                "Amazon Science",
              ],
            },
            {
              title: "Connect with Us",
              links: ["Facebook", "Twitter", "Instagram"],
            },
            {
              title: "Make Money with Us",
              links: [
                "Sell on Amazon",
                "Sell under Amazon Accelerator",
                "Protect and Build Your Brand",
                "Amazon Global Selling",
                "Become an Affiliate",
                "Fulfilment by Amazon",
                "Advertise Your Products",
                "Amazon Pay on Merchants",
              ],
            },
            {
              title: "Let Us Help You",
              links: [
                "Your Account",
                "Returns Centre",
                "100% Purchase Protection",
                "Amazon App Download",
                "Help",
              ],
            },
          ].map((column, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "white", fontSize: "14px" }}
              >
                {column.title}
              </Typography>
              <Stack spacing={0.7}>
                {column.links.map((link, idx) => (
                  <Link key={idx} sx={footerLinkStyle} underline="none">
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: "#3A4553" }} />

      {/* Logo + Language/Country */}
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          flexWrap="wrap"
        >
          <Box
            component="img"
            src={AmazonLogo}
            alt="Amazon Logo"
            height={30}
            sx={{ objectFit: "contain" }}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#ddd",
              borderColor: "#555",
              textTransform: "none",
              fontSize: "12px",
              px: 2,
            }}
          >
            English
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#ddd",
              borderColor: "#555",
              textTransform: "none",
              fontSize: "12px",
              px: 2,
            }}
          >
            India
          </Button>
        </Stack>
      </Box>

      {/* Sub Footer Links */}
      <Box
        sx={{
          bgcolor: "#131A22",
          py: 4,
          px: 2,
          textAlign: "center",
          color: "#ccc",
          fontSize: "12px",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ maxWidth: "1000px", mx: "auto" }}
        >
          {[
            "AbeBooks",
            "Amazon Web Services",
            "Audible",
            "Shopbop",
            "Amazon Business",
            "IMDb",
            "Prime Now",
            "Amazon Prime Music",
          ].map((item, index) => (
            <Grid item xs={6} sm={3} md={2} key={index}>
              <Typography
                sx={{ fontSize: "12px", color: "#999", cursor: "pointer" }}
              >
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Typography sx={{ mt: 2 }}>
          Conditions of Use & Sale | Privacy Notice | Interest-Based Ads
        </Typography>
        <Typography sx={{ mt: 1 }}>
          © 1996–2025, Amazon.com, Inc. or its affiliates
        </Typography>
      </Box>
    </Box>
  );
};
