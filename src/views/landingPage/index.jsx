import React from 'react'
import { Box } from '@mui/material'

// landing pages imports
import Navbar from './components/Navbar'
import HeroSection from "./sections/HeroSection"
import Features from "./sections/FeatureSection"
import DiscoverSection from './sections/DiscoverSection'
import IntegrationSection from './sections/IntegrationSection'
import CrmIntegration_Section from './sections/CrmIntegrationSection'
import TestimonialSection from './sections/TestimonialSection'
import ContactSection from './sections/ContactSection'
import FooterSection from './sections/FooterSection'


const Landing_page = () => {
  return (
    <>
    <Box sx={{backgroundColor: '#F2FAFE', minHeight: '100vh'}}>
    <Navbar/>
    <HeroSection/>
    <Features/>
    <DiscoverSection/>
    <IntegrationSection/>
    <CrmIntegration_Section/>
    <TestimonialSection/>
    <ContactSection/>
    <FooterSection/>
    </Box>
    </>
  )
}

export default Landing_page