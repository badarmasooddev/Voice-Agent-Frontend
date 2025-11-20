// @mui
import { alpha } from '@mui/material/styles';

// @project
import { ThemeMode } from './../config';

/***************************  UPDATED PALETTE  ***************************/

export default function palette(mode) {
  const textPrimary = '#1B1B1F'; // Dark gray text
  const textSecondary = '#46464F'; // Muted gray

  const secondaryMain = '#5A5C78'; // Muted blue

  const divider = '#E6E8EE'; // Light gray divider
  const background = '#FFFFFF'; // Light blue background

  const disabled = '#777680';
  const disabledBackground = '#E5E7ED';

  const lightPalette = {
    primary: {
      lighter: '#E8F4FC',
      light: '#F4FCFF',
      main: '#0077B6',
      dark: '#006397',
      darker: '#003B5C'
    },
    secondary: {
      lighter: '#E6E8EE',
      light: '#C3C4E4',
      main: secondaryMain, 
      dark: '#43455F', 
      darker: '#171A31'
    },
    error: {
      lighter: '#FFEDEA',
      light: '#FFDAD6',
      main: '#DE3730',
      dark: '#BA1A1A',
      darker: '#690005'
    },
    warning: {
      lighter: '#FFEEE1',
      light: '#FFDCBE',
      main: '#AE6600',
      dark: '#8B5000',
      darker: '#4A2800'
    },
    success: {
      lighter: '#C8FFC0',
      light: '#B6F2AF',
      main: '#22892F',
      dark: '#006E1C',
      darker: '#00390A'
    },
    info: {
      lighter: '#EBF8FF',
      light: '#D4F7FF',
      main: '#008394',
      dark: '#006876',
      darker: '#00363E'
    },
    grey: {
      50: '#F6F6F6',
      100: '#F4FCFF',
      200: divider,
      300: '#E5E7ED',
      400: disabledBackground,
      500: '#DBD9E0',
      600: '#C7C5D0',
      700: disabled,
      800: textSecondary,
      900: textPrimary
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: disabled
    },
    divider,
    background: {
      default: background
    },
    action: {
      hover: alpha(secondaryMain, 0.05),
      disabled: alpha(disabled, 0.6),
      disabledBackground: alpha(disabledBackground, 0.9)
    }
  };

  /***************************  DARK MODE (NEW)  ***************************/

  const darkBackground = '#101722'; // Darker blue-based background
  const darkSecondaryMain = '#3A3D57'; // Darker muted blue

  const textPrimaryDark = '#E1E3E8'; // Light gray text
  const textSecondaryDark = '#B0B2BE'; // Muted light gray

  const darkPalette = {
    primary: {
      lighter: '#0D3A5A',
      light: '#0A5172',
      main: '#0077B6',
      dark: '#006397',
      darker: '#003B5C'
    },
    secondary: {
      lighter: '#2A2C44',
      light: '#3A3D57',
      main: darkSecondaryMain,
      dark: '#23253B',
      darker: '#171A31'
    },
    error: {
      lighter: '#690005',
      light: '#BA1A1A',
      main: '#DE3730',
      dark: '#FFDAD6',
      darker: '#FFEDEA'
    },
    warning: {
      lighter: '#4A2800',
      light: '#8B5000',
      main: '#AE6600',
      dark: '#FFDCBE',
      darker: '#FFEEE1'
    },
    success: {
      lighter: '#00390A',
      light: '#006E1C',
      main: '#22892F',
      dark: '#B6F2AF',
      darker: '#C8FFC0'
    },
    info: {
      lighter: '#00363E',
      light: '#006876',
      main: '#008394',
      dark: '#D4F7FF',
      darker: '#EEFCFF'
    },
    grey: {
      50: '#141A24',
      100: '#19202B',
      200: '#202836',
      300: '#252D3E',
      400: '#2D3549',
      500: '#353F58',
      600: '#464C66',
      700: '#666A85',
      800: '#A0A2B5',
      900: textPrimaryDark
    },
    text: {
      primary: textPrimaryDark,
      secondary: textSecondaryDark,
      disabled: '#6C6D78'
    },
    divider: '#2D3549',
    background: {
      default: darkBackground
    },
    action: {
      hover: alpha(darkSecondaryMain, 0.05),
      disabled: alpha('#6C6D78', 0.6),
      disabledBackground: alpha('#2D3549', 0.9)
    }
  };
  
  return {
    mode,
    ...(mode === ThemeMode.DARK ? darkPalette : lightPalette)
  };
}
