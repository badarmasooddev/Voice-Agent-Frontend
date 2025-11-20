import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Project
import branding from "@/branding.json";

/***************************  AUTH - COPYRIGHT  ***************************/

export default function Copyright() {
  const copyrightSX = { display: { xs: "none", sm: "flex" } };
  return (
    <Stack sx={{ gap: 1, width: "fit-content", mx: "auto" }}>
      <Stack direction="row" sx={{ justifyContent: "center", gap: { xs: 1, sm: 1.5 }, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary" sx={copyrightSX}>
          © 2025 {branding.brandName}
        </Typography>
        <Divider orientation="vertical" flexItem sx={copyrightSX} />
        <Link to="/privacy-policy" style={linkStyle}>
          Privacy Policy
        </Link>
        <Divider orientation="vertical" flexItem />
        <Link to="/terms-and-conditions" style={linkStyle}>
          Terms & Conditions
        </Link>
      </Stack>

      <Box sx={{ textAlign: "center", display: { xs: "block", sm: "none" } }}>
        <Divider sx={{ marginBottom: 1 }} />
        <Typography variant="caption" color="text.secondary">
          © 2025 {branding.brandName}
        </Typography>
      </Box>
    </Stack>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "0.75rem",
  "&:hover": { color: "#1976d2" },
};
