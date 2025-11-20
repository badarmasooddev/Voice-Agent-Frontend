import { Link } from "react-router-dom";

// MUI
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Project
import AuthLogin from "@/sections/auth/AuthLogin";
import AuthSocial from "@/sections/auth/AuthSocial";
import Copyright from "@/sections/auth/Copyright";

/***************************  AUTH - LOGIN  ***************************/

export default function Login() {
  return (
    <Stack sx={{ height: 1, alignItems: "center", justifyContent: "space-between", gap: 3 }}>
      <Box sx={{ width: 1, maxWidth: 458 }}>
        <Stack sx={{ gap: { xs: 1, sm: 1.5 }, textAlign: "center", mb: { xs: 3, sm: 8 } }}>
          <Typography variant="h1">Sign In</Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Select the method of login.
          </Typography>
        </Stack>

        {/* Social login buttons */}
        <AuthSocial />

        <Divider sx={{ my: { xs: 4, sm: 5 } }}>
          <Typography variant="body2" color="text.secondary">
            or continue with email
          </Typography>
        </Divider>

        {/* Login form */}
        <AuthLogin />

        <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, sm: 3 } }}>
          Don’t have an account?{" "}
          <Link to="/auth/register" style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Copyright section */}
      <Copyright />
    </Stack>
  );
}
