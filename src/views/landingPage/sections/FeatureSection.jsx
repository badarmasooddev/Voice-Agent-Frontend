"use client"

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import FeatureCard from "../components/FeatureCard";
import { quick_image, growth_image, saving_money_image } from '../../../assets/images/icons/landingPageIcons';
import { motion, useInView } from 'framer-motion';


const features = [
  {
    title: "Human like Agents",
    description: "Set up AI voice assistants in minutes by integrating with your existing CRM for seamless AI Phone Calls.",
    icon: quick_image,
  },
  {
    title: "Campaigns Management",
    description: "Reduce costs by automating routine calls, allowing your team to focus on more important tasks.",
    icon: saving_money_image,
  },
  {
    title: "Information Extraction",
    description: "Reduce costs by automating routine calls, allowing your team to focus on more important tasks.",
    icon: growth_image,
  },
  {
    title: "Connect with CRMs",
    description: "Set up AI voice assistants in minutes by integrating with your existing CRM for seamless AI Phone Calls.",
    icon: quick_image,
  },
  {
    title: "Call Recordings/ Transcript",
    description: "Reduce costs by automating routine calls, allowing your team to focus on more important tasks.",
    icon: saving_money_image,
  },
  {
    title: "Upload your knowledge base",
    description: "Reduce costs by automating routine calls, allowing your team to focus on more important tasks.",
    icon: growth_image,
  },
];

const FeatureSection = () => {

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
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
        Featured
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#1A1C1E",
          m: 3,
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        Unveiling How TERALEADS Works
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
          padding : {xs: "0px 20px"}
        }}
      >
        TERALEADS simplifies lead generation with precision-integrated strategies
        and seamless automation. It empowers businesses with high-quality
        responses, driving conversions effortlessly. Discover the magic behind
        its innovative approach to maximizing your growth potential.
      </Typography>

      <Grid container justifyContent="center" sx={{ maxWidth: "1200px", padding: {xs: "15px"}}}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard feature={feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </motion.div>
  );
};

export default FeatureSection;
