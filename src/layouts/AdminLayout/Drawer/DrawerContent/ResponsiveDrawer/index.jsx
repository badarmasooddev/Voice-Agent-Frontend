// @mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// @project
import menuItems from '@/menu';
import NavGroup from './NavGroup';
import assistantmenu from '../../../../../menu/assistantmenu';
import { useGlobalState } from '../../../../../contexts/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import { IconArrowBack } from '@tabler/icons-react';

/***************************  DRAWER CONTENT - RESPONSIVE DRAWER  ***************************/

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showAssistantMenu, setShowAssistantMenu } = useGlobalState();

  const handleBackToAssistant = () => {
    setShowAssistantMenu(false);
    navigate('/assistant');
  };

  const updatedAssistantMenu = {
    ...assistantmenu,
    children: assistantmenu?.children?.map(item => {
      return {
        ...item,
        url: item.url?.includes(':id') ? item.url.replace(':id', localStorage.getItem('assistantId')) : item.url
      };
    })
  };

  const navGroups = menuItems.items.map((item, index) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={index} item={item} />;
      default:
        return (
          <Typography key={index} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box sx={{ transition: 'all 0.3s ease-in-out' }}>
      {showAssistantMenu ? (
        <>
          <Box
            sx={{ mt: 2, display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: "12px !important", pb: 1 }}
            onClick={handleBackToAssistant}
          >
            <IconArrowBack stroke={2} />
            <Typography variant="body1" color="black" sx={{ ml: 1, color: theme.palette.text.primary,
              '&:hover': {
                bgcolor: theme.palette.action.hover
              } }}>
              Back to assistant
            </Typography>
          </Box>
          <NavGroup item={updatedAssistantMenu} />
        </>
      ) : (
        <Box sx={{ mt: 2 }}>
          {navGroups}
        </Box>
      )}
    </Box>
  );
}
