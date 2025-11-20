import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CallMeForm from '../components/CallMeForm';
import hero from "./../../../assets/images/girl_voice/gir_voice_img.svg";
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 50 }}
        transition={{ duration: 1.7 }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            alignItems: 'center',
            justifyContent: "center",
            overflow: 'hidden',
          }}
        >
          <Grid item xs={12} md={7} >
            <Typography variant="h3" sx={{ color: '#111827', mb: 1.5, fontWeight: "bold", px: { xs: "20px" }, textAlign: "center" }}>
              Teraleads AI: Effortlessly Automate Calls
            </Typography>
            <Typography variant="h4" sx={{ mb: 2, color: '#111827', fontWeight: "bold", textAlign: "center" }}>
              Using Intelligent Phone Agents!
            </Typography>
            <Typography variant="body3" sx={{ mb: 4, color: '#4B5563', px: { xs: "2px" } }}>
              Streamline your communication process with TERALEADS AI. Our advanced phone agents handle calls seamlessly, saving time, enhancing customer interactions, and boosting your efficiency.
            </Typography>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }, justifyContent: "space-between", alignItems: 'center', width: '100%', mt: 10 }}>
            <Box
              sx={{
                position: 'relative',
                width: { xl: '80%', lg: '80%', md: '100vw', sm: '90vw', xs: '85vw' },
                height: { xl: 'auto', lg: 'auto', md: 'auto', sm: 'auto', xs: 'auto' },
                ml: { md: 10, xs: 5 },
                border: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!imageLoaded && <Box sx={{ display: "flex", justifyContent: "center", alignItem: "center", width: "50vw" }}>Loading image...</Box>}
              <motion.img
                src={hero}
                alt="Voice girl image"
                onLoad={handleImageLoad}
                style={{
                  width: '100%',
                  height: 'auto',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 1.7s'
                }}
              />
              {imageLoaded && (
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: { xl: 80, lg: 40, md: 20, sm: 10, xs: 10 },
                    color: '#000000',
                    padding: '5px 10px',
                    fontWeight: '400px',
                    fontFamily: "Poppins"
                  }}
                >
                  Hi, Teena
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: { md: '-3.5rem' } }}>
              <CallMeForm />
            </Box>
          </Box>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default HeroSection;