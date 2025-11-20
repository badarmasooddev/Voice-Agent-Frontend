import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import {assistantIcon, leadsIcon, crmIcon, arrow_icon } from '../../../assets/images/icons/landingPageIcons';

const steps = [
  { label: "Create Assistant", icon: assistantIcon },
  { label: "Configure Leads & Campaigns", icon: leadsIcon },
  { label: "Appointments Made at the CRM", icon: crmIcon },
];

const Arrow = () => (
  <Box
    sx={{
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 2
    }}
  >
      <img src={arrow_icon} alt="arrow_icon" style={{ width: "100%", height: "100%" }} />
  </Box>
);

const IntegrationCart = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        mt: 4,
        flexDirection: isSmallScreen ? "column" : "row",
        gap: {xs: 3}
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: "7px",
                backgroundColor: "#DDF0FA",
                width: isSmallScreen ? "80vw" : "175px",
                height: "auto",
                minHeight: isSmallScreen ? "auto" : { lg: "9rem", sm: "10vh" },
                p: isSmallScreen ? 2 : 3,
                border: "1px solid #C6C6C6",
                fontFamily: "Poppins"
              }}
            >
              <img
                src={step.icon}
                alt={step.label}
                style={{ width: isSmallScreen ? "40px" : "30px", marginBottom: "12px" }}
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: "#333", fontSize: isSmallScreen ? "14px" : "13px" }}
              >
                {step.label}
              </Typography>
            </Box>
          </motion.div>
          {index < steps.length - 1 && !isSmallScreen && <Arrow />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default IntegrationCart;