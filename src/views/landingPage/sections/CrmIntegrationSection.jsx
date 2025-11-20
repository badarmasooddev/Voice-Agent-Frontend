import React from 'react'
import { Grid, Typography, Box } from "@mui/material";
import { motion, useInView } from 'framer-motion';
import {zoho_logo, hubspot_logo, zapier_logo, highlevel_logo } from '../../../assets/images/icons/landingPageIcons';

const CrmIntegration_Section = () => {

  const logos = [
    { src: zoho_logo, alt: "Zoho Logo" },
    { src: hubspot_logo, alt: "HubSpot Logo" },
    { src: zapier_logo, alt: "Zapier Logo" },
    { src: highlevel_logo, alt: "HighLevel Logo" }
  ];

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.7 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              p: "5px 20px",
              color: "#006397",
              fontWeight: 500,
              mb: 4,
              border: "1px solid",
              borderRadius: "50px",
              width: "fit-content",
              fontFamily: "Poppins",
            }}
          >
            CRM Integration
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#1A1C1E",
              m: 1,
              fontWeight: 600,
              fontFamily: "Poppins",
              fontSize: { xl: "30px", lg: "30px", md: "20px", sm: "20px", xs: "20px" },
              width: { lg: "40rem", xl: "40rem", md: "auto", sm: "auto", xs: "auto" },
              lineHeight: { xl: "3.5rem", lg: "3.4rem", md: "1.8rem", sm: "1.8rem", xs: "1.8rem" }
            }}
          >
            Connect your CRMs with API keys or Webhooks for Real time booking
          </Typography>
          <Grid container justifyContent="center" alignItems={"center"} sx={{ maxWidth: "1200px", }}>
            {logos.map((logo, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.4 }}
            >
              <Grid item xs={12} sm={10} md={10} sx={{mx: 3, padding: "10px",mt:5 }} key={index}>
                <img src={logo.src} alt={logo.alt} style={{ maxWidth: "100%", height: "auto" }} />
              </Grid>
            </motion.div>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </>
  )
}

export default CrmIntegration_Section