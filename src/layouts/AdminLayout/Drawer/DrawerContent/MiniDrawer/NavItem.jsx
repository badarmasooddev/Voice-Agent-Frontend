import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// MUI Components
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Project Imports
import { handlerActiveItem, useGetMenuMaster } from '@/states/menu';
import DynamicIcon from '@/components/DynamicIcon';
import { ThemeMode } from '@/config';

export default function NavItem({ item, level = 0, onSelect  }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const openItem = menuMaster.openedItem;

  // Active menu item on page load
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === item.url) handlerActiveItem(item.id);
  }, [location.pathname, item.id]);

  const isSelected = openItem === item.id;
  const iconColor = isSelected && theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.text.primary;

  
  const listItemAvatarStyle = {
    p: 0,
    my: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'default',
    '&:hover, &:focus': { bgcolor: 'transparent', '& .MuiListItemAvatar-root': { bgcolor: 'action.hover' } },
    '&.Mui-selected': {
      bgcolor: 'transparent',
      '& .MuiListItemAvatar-root': { bgcolor: 'primary.lighter', ...theme.applyStyles('dark', { bgcolor: 'primary.main' }) },
      '&:hover, &:focus': { bgcolor: 'transparent', '& .MuiListItemAvatar-root': { bgcolor: 'primary.light' } }
    }
  };

  const listItemStyle = {
    color: 'text.primary',
    '&.Mui-selected': {
      color: 'primary.main',
      bgcolor: 'transparent',
      ...theme.applyStyles('dark', { color: 'primary.light' }),
      '&:hover': { bgcolor: 'action.hover' },
      '&.Mui-focusVisible': { bgcolor: 'action.focus' },
      '& .MuiTypography-root': { fontWeight: 600 }
    }
  };

  return (
    <ListItemButton
      id={`${item.id}-btn`}
      selected={isSelected}
      disabled={item.disabled}
      disableRipple={level === 0}
      component={Link}
      to={item.url}
      {...(item?.target && { target: '_blank' })}
      sx={{
        ...(level === 0 ? listItemAvatarStyle : listItemStyle),
        ...(item.id === 'Call Logs' && { borderBottom: '1px solid #ddd' }),
      }}
    >
      {level === 0 && (
        <ButtonBase
          tabIndex={-1}
          sx={{ borderRadius: 2 }}
          aria-label="list-button"
        >
          <ListItemAvatar
            sx={{
              minWidth: 32,
              width: 44,
              height: 44,
              borderRadius: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <DynamicIcon name={item.icon} size={22} stroke={1.5} color={iconColor} />
            </ListItemIcon>
          </ListItemAvatar>
        </ButtonBase>
      )}
      {level > 0 && <ListItemText primary={item.title} />}
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.object.isRequired, level: PropTypes.number };
