import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { service_support_image } from '../../../assets/images/icons/landingPageIcons';
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.7 }}
    >
      <Box
        sx={{
          backgroundColor: "#E8F4FC",
          mx: { xs: 2, sm: 4, md: 10 },
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { md: "row" },
          flexWrap: "wrap",
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 3, sm: 6, md: 10 },
          textAlign: { xs: "center", md: "left" },
          height: "100vh",
          maxHeight: { xs: "83vh", sm: "26rem", lg: "30.8rem" }
        }}
      >
        {/* Left Side */}
        <Box sx={{ flex: 1, minWidth: "300px", textAlign: { xs: "center", md: "start" }, mt: { md: -25 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              p: "2px 20px",
              color: "#006397",
              fontWeight: 500,
              mb: 2,
              border: "1px solid",
              borderRadius: "50px",
              width: "fit-content",
              mx: { xs: "auto", md: "unset" },
              fontFamily: "Poppins",
            }}
          >
            Contact us
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#212121",
              fontWeight: "600",
              marginBottom: "1rem",
              fontSize: { xs: "1.8rem", sm: "1.5rem", md: "1.4rem" },
            }}
          >
            Let's Connect With Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              marginBottom: "1.5rem",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              px: { xs: 2, md: 0 },
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#006397",
              color: "#FFF",
              padding: { xs: "0.6rem 2rem", sm: "0.75rem 3rem" },
              border: "1px solid #006397",
              borderRadius: "45px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Contact us
          </Button>
        </Box>
        {/* Right Side */}
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: "2rem", md: "0" },
          }}
        >
          <img
            src={service_support_image}
            alt="Contact Us Illustration"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default ContactSection;