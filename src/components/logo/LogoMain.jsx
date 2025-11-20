import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

// Import SVG properly for Vite (Vite supports direct imports for SVGs)
import TeraleadLogo from "/assets/images/logo/logo-1.png"; 
import TeraleadLogo_white from "/assets/images/logo/white-teraleads-logo.png"; 
import branding from '@/branding.json';

export default function LogoMain() {
  const theme = useTheme();
  const logoMainPath = branding.logo.main;
  const isDarkMode = theme.palette.mode === 'dark'; 

  return logoMainPath ? (
    <CardMedia
      component="img"
      src={logoMainPath}
      alt="logo"
      sx={{ width: { xs: 112, lg: 140 } }}
    />
  ) : (
    <Box sx={{ width: { xs: 112, lg: 140 }, height: { xs: 22, lg: 26 }, display: 'flex', alignItems: 'center' }}>
    <img src={isDarkMode ? TeraleadLogo_white : TeraleadLogo} alt="logo" width="100%" height="100%" />
</Box>
  );
}
