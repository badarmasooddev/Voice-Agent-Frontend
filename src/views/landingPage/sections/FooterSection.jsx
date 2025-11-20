import React from "react";
import { Box, Typography } from "@mui/material";

const FooterSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#EBF8FF",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
        mt: 10,
        height: "10vh",
        flexDirection: "row",
        px: { xs: 1, md: 10 },
      }}
    >
      <Box sx={{ flex: 1, textAlign: "start", minWidth: "150px" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            color: "#212121",
          }}
        >
          © Copyright {new Date().getFullYear()}, All Rights.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          minWidth: "150px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 400,
            color: "#1A1C1E",
            fontSize: { md: "1.125rem", xs: "1rem" }
          }}
        >
          Privacy and Policy
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterSection;