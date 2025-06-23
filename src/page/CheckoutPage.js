import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Divider,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

export const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [netBank, setNetBank] = useState("");

  if (!product) {
    return (
      <Box p={4}>
        <Typography>No product selected. Go back to shop.</Typography>
        <Button onClick={() => navigate("/home")}>Back to Home</Button>
      </Box>
    );
  }

  const imageUrl = product.image
    ? `data:image/jpeg;base64,${product.image}`
    : "";

  const totalPrice = product.price;

  return (
    <Box display="flex" p={4} gap={4} flexWrap="wrap">
      {/* LEFT SECTION */}
      <Box flex={2} minWidth={300}>
        {/* Delivery Address */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight="bold">Delivering to Tamarapalli Bhavani</Typography>
          <Typography fontSize={14}>
            18-5-12/2, Aryapuram, Lingampeta 3rd street Rajahmundry, RAJAHMUNDRY, ANDHRA PRADESH, 533101, India
          </Typography>
          <Button variant="text" sx={{ mt: 1 }}>Change</Button>
        </Paper>

        {/* Product Review */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight="bold" mb={2}>Review Product</Typography>
          <Box display="flex" gap={2}>
            <img
              src={imageUrl}
              alt={product.name}
              style={{ width: 150, height: 200, objectFit: "cover", borderRadius: 8 }}
            />
            <Box>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ₹{product.price}</Typography>
              <Typography>Color: {product.color}</Typography>
              <Typography>Size: {product.size_options}</Typography>
              <Typography>Description: {product.description}</Typography>
            </Box>
          </Box>
        </Paper>

        {/* Payment Method */}
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight="bold" mb={2}>Payment method</Typography>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField size="small" placeholder="Enter Code" />
            <Button variant="outlined">Apply</Button>
          </Box>

          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label="Amazon Pay UPI - Union Bank of India **2212"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit or debit card (Visa, MasterCard, RuPay, Amex)"
            />
            <FormControlLabel value="netbank" control={<Radio />} label="Net Banking" />
            {paymentMethod === "netbank" && (
              <FormControl size="small" fullWidth sx={{ my: 1 }}>
                <Select value={netBank} onChange={(e) => setNetBank(e.target.value)} displayEmpty>
                  <MenuItem value="">Choose an Option</MenuItem>
                  <MenuItem value="sbi">SBI</MenuItem>
                  <MenuItem value="hdfc">HDFC</MenuItem>
                  <MenuItem value="icici">ICICI</MenuItem>
                </Select>
              </FormControl>
            )}
            <FormControlLabel value="other_upi" control={<Radio />} label="Other UPI Apps" />
            <FormControlLabel value="emi" control={<Radio />} label="EMI Unavailable" disabled />
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery / Pay on Delivery (Cash, UPI and Cards accepted)"
            />
          </RadioGroup>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: "#f0c14b", color: "#111", fontWeight: "bold" }}
          >
            Use this payment method
          </Button>
        </Paper>

        {/* Info */}
        <Paper sx={{ mt: 3, p: 2 }}>
          <Typography fontSize={13}>
            When your order is placed, you’ll receive an e-mail acknowledging it. For Pay on Delivery (POD),
            you can pay using cash/card/net banking when the item is delivered.
          </Typography>
          <Box mt={1}>
            <Button variant="text" size="small" onClick={() => navigate("/cart")}>
              Back to cart
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* RIGHT SECTION: Order Summary */}
      <Box flex={1} minWidth={260}>
        <Paper sx={{ p: 2 }}>
          <Typography fontWeight="bold" mb={1}>Order Summary</Typography>
          <Typography fontSize={14}>Items: ₹{product.price}</Typography>
          <Typography fontSize={14}>Delivery: ₹0</Typography>
          <Typography fontSize={14}>Total: ₹{product.price}</Typography>
          <Typography fontSize={14}>Promotion Applied: ₹0</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography fontWeight="bold">Order Total: ₹{product.price}</Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#f0c14b", color: "#111", fontWeight: "bold" }}
          >
            Use this payment method
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
