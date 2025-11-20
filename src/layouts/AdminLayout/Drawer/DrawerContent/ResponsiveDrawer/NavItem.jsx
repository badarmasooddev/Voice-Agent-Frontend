import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// MUI Components
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Project Imports
import { handlerActiveItem, handlerDrawerOpen, useGetMenuMaster } from '@/states/menu';
import DynamicIcon from '@/components/DynamicIcon';
import { ThemeMode } from '@/config';

export default function NavItem({ item, level = 0 }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const openItem = menuMaster.openedItem;

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  // Get current path
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === item.url) handlerActiveItem(item.id);
  }, [location.pathname, item.id]);

  const iconColor =
    openItem === item.id && theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.text.primary;

  const itemHandler = () => {
    if (downMD) handlerDrawerOpen(false);
  };

  return (
    <ListItemButton
      id={`${item.id}-btn`}
      component={Link}
      to={item.url}
      {...(item?.target && { target: '_blank' })}
      selected={openItem === item.id}
      disabled={item.disabled}
      onClick={itemHandler}
      sx={{
        color: 'text.primary',
        ...(level === 0 && { my: 0.25, '&.Mui-selected.Mui-focusVisible': { bgcolor: 'primary.light' } }),
        ...(level > 0 && {
          '&.Mui-selected': {
            color: 'primary.main',
            bgcolor: 'transparent',
            ...theme.applyStyles('dark', { color: 'primary.light' }),
            '&:hover': { bgcolor: 'action.hover' },
            '&.Mui-focusVisible': { bgcolor: 'action.focus' },
            '& .MuiTypography-root': { fontWeight: 600 }
          }
        }),
        // Add border-bottom for Call Logs
        ...(item.id === 'Call Logs' && {
          borderBottom: '1px solid #ddd'
        })
      }}
    >
      {level === 0 && (
        <ListItemIcon>
          <DynamicIcon name={item.icon} color={iconColor} size={18} stroke={1.5} />
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} sx={{ mb: '-1px' }} />
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.object.isRequired, level: PropTypes.number };