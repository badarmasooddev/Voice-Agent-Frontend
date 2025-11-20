import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { IconStarFilled } from '@tabler/icons-react';

// TestimonialCart Component
const TestimonialCart = ({ name, role, testimonial }) => {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        backgroundColor: "#F6F6F6",
        maxWidth: "380px",
        textAlign: "start",
        mb: 1,
      }}
    >
      {/* Star Ratings */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          fontSize: "1.8rem"
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>
            <IconStarFilled stroke={2} style={{color: "#6AA4C2" }}/>
          </span>
        ))}
      </Box>
      {/* Testimonial Text */}
      <Typography
        variant="body2"
        sx={{
          color: "#78797A",
          mb: 1,
          fontSize: "0.95rem",
          lineHeight: 1.6,
          fontWeight: "400px"
        }}
      >
        {testimonial}
      </Typography>
      {/* Name and Role */}
      <Typography
        variant="h6"
        sx={{
          color: "#6AA4C2",
          fontWeight: "bold",
          fontSize: "1rem",
          fontFamily: "Poppins"
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#78797A",
          fontSize: "0.875rem",
        }}
      >
        {role}
      </Typography>
    </Box>
  );
};

export default TestimonialCart;