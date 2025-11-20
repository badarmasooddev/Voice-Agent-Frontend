import PropTypes from 'prop-types';
// @next
// import NextLink from 'next/link';

// @mui
import Button from '@mui/material/Button';

/***************************  NAVBAR - PRIMARY BUTTON  ***************************/

export default function NavbarButton({ sx, children, ...rest }) {
  return (
    <Button
      variant="contained"
      size="small"
      sx={sx}
      {...rest}
      {...(rest?.href)}
      rel="noopener noreferrer"
      aria-label="nav-primary-btn"
    >
      {children || 'Primary Button'}
    </Button>
  );
}

NavbarButton.propTypes = { sx: PropTypes.any, children: PropTypes.any, rest: PropTypes.any };