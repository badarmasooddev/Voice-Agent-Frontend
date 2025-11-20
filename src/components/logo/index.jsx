import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI Components
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

// Project Imports
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from '@/config';
import { generateFocusStyle } from '@/utils/generateFocusStyle';

export default function LogoSection({ isIcon, sx, to }) {
  const theme = useTheme();

  return (
    <ButtonBase
      component={Link}
      to={to || APP_DEFAULT_PATH}
      disableRipple
      sx={{ ...sx, '&:focus-visible': generateFocusStyle(theme.palette.primary.main) }}
      aria-label="logo"
    >
      {isIcon ? <LogoIcon /> : <LogoMain />}
    </ButtonBase>
  );
}

LogoSection.propTypes = { isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.string };
