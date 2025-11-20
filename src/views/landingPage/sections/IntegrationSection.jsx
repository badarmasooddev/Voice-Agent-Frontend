import React from 'react'
import { Grid, Typography, Box } from "@mui/material";
import { motion, useInView } from 'framer-motion';
import IntegrationCart from '../components/IntegrationCart';


const IntegrationSection = () => {

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
              mb: 2,
              border: "1px solid",
              borderRadius: "50px",
              width: "fit-content",
              fontFamily: "Poppins",
            }}
          >
            Integrateate
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#1A1C1E",
              m: 1,
              fontWeight: 600,
              fontFamily: "Poppins",
              fontSize: { xl: "30px", lg: "25px", md: "20px", sm: "20px", xs: "20px" },
              width: { lg: "40rem", xl: "40rem", md: "auto", sm: "auto", xs: "auto" },
              lineHeight: { xl: "3.5rem", lg: "3rem", md: "1.8rem", sm: "1.8rem", xs: "1.8rem" }
            }}
          >
            Seamlessly Integrate Teraleads with Your Dental Practice Management System
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              mt: { xl: 0, lg: 4, xs: 4 },
              maxWidth: "800px",
              mx: "auto",
              color: "#78797A",
              lineHeight: 1.6,
              fontSize: "1rem",
            }}
          >
            Seamlessly boost your business productivity with our native api integrations to HubSpot, GoHighLevel, Zoho, and many more.
          </Typography>
          <Grid container justifyContent="center" sx={{ maxWidth: "1200px", padding: { xl: "5px 25px", lg: "5 25px", md: "5px 15px", sm: "5px 15px", xs: "5px 15px" } }}>
            <IntegrationCart/>
          </Grid>
          <Typography
            variant="subtitle1"
            sx={{
              p: "5px 20px",
              color: "#006397",
              fontWeight: 500,
              mt: 5,
              border: "1px solid",
              borderRadius: "50px",
              width: "fit-content",
              fontFamily: "Poppins",
            }}
          >
            Explore All Integration
          </Typography>
        </Box>
      </motion.div>
    </>
  )
}

export default IntegrationSection