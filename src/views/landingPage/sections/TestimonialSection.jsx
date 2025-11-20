"use client"
import React from 'react'
import { Grid, Typography, Box } from "@mui/material";
import TestimonialCart from './TestimonialCart';
import { motion, useInView } from 'framer-motion';

const TestimonialSection = () => {

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true })

  const testimonials = [
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Mike Torello",
      role: "Executive Engineer",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
  ];

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
            Testimonials
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#1A1C1E",
              m: 3,
              fontWeight: "600px",
              fontFamily: "Poppins",
            }}
          >
            What Our Clients Are Saying
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
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.
          </Typography>
          <Grid container justifyContent="center" spacing={1} sx={{ maxWidth: "1000px", px: "20px" }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TestimonialCart
                  name={testimonial.name}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </>
  );
};

export default TestimonialSection