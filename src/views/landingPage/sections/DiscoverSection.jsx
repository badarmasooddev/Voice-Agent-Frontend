import React from 'react'
import { Grid, Typography, Box } from "@mui/material";
import { dashboard_image } from '../../../assets/images/icons/landingPageIcons';
import { motion, useInView } from 'framer-motion';


const DiscoverSection = () => {

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
              p: "3px 25px",
              color: "#006397",
              fontWeight: 500,
              mb: 2,
              border: "1px solid",
              borderRadius: "50px",
              width: "fit-content",
              fontFamily: "Poppins",
            }}
          >
            Discover
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#1A1C1E",
              m: 3,
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            TeraLead Dental Marketing Assistant Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              color: "#78797A",
              lineHeight: 1.6,
              fontSize: "1rem",
              padding: { xs: "10px" }
            }}
          >
            TeraLead's Dental Marketing Assistant Dashboard empowers your practice with actionable insights and enhanced performance tracking. Easily monitor key metrics like the Number of Calls and Connectivity Rate under Assistant Analytics. Gain a deeper understanding of outcomes through visual analytics, including a Call Outcomes Pie Chart and an Assistant Call Graph that tracks performance trends over time.
          </Typography>
          <Grid container justifyContent="center" sx={{ bgcolor: "#D2E8F3", maxWidth: { xs: "90vw", md: "48vw" }, borderRadius: "10px", padding: { xl: "15px 15px", lg: "15px 15px", md: "10px 10px", sm: "15px 15px", xs: "10px 10px" }, boxShadow: '0px 4px 4.7px rgba(0, 0, 0, 0.25), 3px 3px 4.7px rgba(0, 0, 0, 0.25), -3px 4px 4.7px rgba(0, 0, 0, 0.25)' }}>
            <img src={dashboard_image} alt="dashboard image" style={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Box>
      </motion.div>
    </>
  )
}

export default DiscoverSection