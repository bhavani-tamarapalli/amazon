// import React from 'react';
// import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import amazonLogo from "../assets/images/amazonlogo.png"

// export const Signin = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ bgcolor: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'start', pt: 8 }}>
//       <Box>
//         <Box sx={{ textAlign: 'center', mb: 3 }}>
//           <img src={amazonLogo} alt="Amazon" style={{ width: 100 }} />
//         </Box>
//         <Paper elevation={2} sx={{ p: 3, maxWidth: 350 }}>
//           <Typography variant="h6" mb={2}>Sign in or create account</Typography>
//           <Typography fontSize={14} mb={0.5}>Enter mobile number or email</Typography>
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             sx={{ mb: 2 }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             // onClick={handleContinue}
//             sx={{
//               bgcolor: '#f0c14b',
//               color: '#111',
//               fontWeight: 'bold',
//               '&:hover': {
//                 bgcolor: '#e2b33c'
//               }
//             }}
//           >
//             Continue
//           </Button>
//           <Typography fontSize={12} mt={2}>
//             By continuing, you agree to Amazon's{' '}
//             <Link href="#" underline="hover" fontSize={12}>Conditions of Use</Link> and{' '}
//             <Link href="#" underline="hover" fontSize={12}>Privacy Notice</Link>.
//           </Typography>
//           <Box mt={2}>
//             <Typography fontSize={12} fontWeight="bold">Buying for work?</Typography>
//             <Link href="#" underline="hover" fontSize={12}>
//               Create a free business account
//             </Link>
//           </Box>
//         </Paper>
//         <Box mt={3} textAlign="center">
//           <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>Conditions of Use</Link> |
//           <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>Privacy Notice</Link> |
//           <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>Help</Link>
//           <Typography fontSize={11} color="textSecondary" mt={1}>
//              1996–2025, Amazon.com, Inc. or its affiliates
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, TextField, Button, Typography, Paper, Link,
} from "@mui/material";
import amazonLogo from "../assets/images/amazonlogo.png";
import { useAuth } from "../context/AuthContext";

export const Signin = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    setError("");
    const endpoint = isRegister ? "/register" : "/login";

    try {
      const res = await fetch(`http://localhost:8000/api${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }

      dispatch({ type: "LOGIN", payload: data.user });
      navigate("/home");
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        pt: 8,
      }}
    >
      <Box>
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img src={amazonLogo} alt="Amazon" style={{ width: 100 }} />
        </Box>

        {/* Card */}
        <Paper elevation={2} sx={{ p: 3, maxWidth: 350 }}>
          <Typography variant="h6" mb={2}>
            {isRegister ? "Create account" : "Sign in"}
          </Typography>

          {/* Email */}
          <Typography fontSize={14} mb={0.5}>
            Email address
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <Typography fontSize={14} mb={0.5}>
            Password
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error */}
          {error && (
            <Typography color="error" fontSize={13} mb={1}>
              {error}
            </Typography>
          )}

          {/* Continue Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleContinue}
            sx={{
              bgcolor: "#f0c14b",
              color: "#111",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#e2b33c",
              },
            }}
          >
            Continue
          </Button>

          {/* Legal Text */}
          <Typography fontSize={12} mt={2}>
            By continuing, you agree to Amazon's{" "}
            <Link href="#" underline="hover" fontSize={12}>
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link href="#" underline="hover" fontSize={12}>
              Privacy Notice
            </Link>
            .
          </Typography>

          {/* Switch between Register/Login */}
          <Box mt={2}>
            <Typography fontSize={12} fontWeight="bold">
              {isRegister ? "Already have an account?" : "New to Amazon?"}
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Sign in" : "Create your Amazon account"}
            </Button>
          </Box>
        </Paper>

        {/* Footer */}
        <Box mt={3} textAlign="center">
          <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>
            Conditions of Use
          </Link>
          |
          <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>
            Privacy Notice
          </Link>
          |
          <Link href="#" underline="hover" fontSize={12} sx={{ mx: 1 }}>
            Help
          </Link>
          <Typography fontSize={11} color="textSecondary" mt={1}>
            © 1996–2025, Amazon.com, Inc. or its affiliates
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
