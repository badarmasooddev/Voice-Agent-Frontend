import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const FeatureCards = ({ feature }) => {
  const { title, description, icon } = feature;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        textAlign: "start",
        backgroundColor: "#E6E8EE",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        borderRight: "2px solid #C2C2C2",
        borderBottom: "2px solid #C2C2C2",
      }}
    >
      <Box
        sx={{
          width: "60px",
          height: "60px",
          backgroundColor: "#E5E7EB",
          display: "flex",
          borderTopLeftRadius: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={icon} alt={`${title} Icon`} style={{ width: "80%", height: "80%" }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "500",
          color: "#1A1C1E",
          fontSize: "1.1rem",
          mb: 2
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#78797A",
          lineHeight: 1.5,
          fontSize: "0.9rem",
          textAlign: "start"
        }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCards;