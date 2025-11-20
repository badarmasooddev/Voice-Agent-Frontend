import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import menuItems from '@/menu';
import NavGroup from './NavGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowBack } from '@tabler/icons-react';
import { useGlobalState } from '../../../../../contexts/GlobalStateContext';
import assistantmenu from '../../../../../menu/assistantmenu';

export default function MiniDrawer() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const { showAssistantMenu, setShowAssistantMenu } = useGlobalState();

  const handleSelect = (itemId) => {
    setSelectedItem(itemId === 'assistant' ? itemId : null);
  };

  const handleBackToAssistant = () => {
    setShowAssistantMenu(false);
    navigate('/assistant');
  };

  // Update assistantmenu URLs with the assistant ID
  const updatedAssistantMenu = {
  ...assistantmenu,
  children: assistantmenu?.children?.map(item => ({
    ...item,
    url: item.url?.includes(':id') ? item.url.replace(':id', localStorage.getItem('assistantId')) : item.url
    }))
  };  

  const navGroups = menuItems.items.map((item, index) => {
    if (selectedItem && item.id !== 'assistant') return null;
    switch (item.type) {
      case 'group':
        return <NavGroup key={index} item={item} onSelect={handleSelect} />;
      default:
        return (
          <Typography key={index} variant="h6" color="error" align="center">
            Error
          </Typography>
        );
    }
  });

  return (
    <Box sx={{ transition: 'all 0.3s ease-in-out' }}>
      {showAssistantMenu ? (
        <>
          <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center", gap: 2, mt: 3 }} onClick={handleBackToAssistant}>
            <IconArrowBack stroke={2} />
          </Box>
          <NavGroup item={updatedAssistantMenu} onSelect={handleSelect} />
        </>
      ) : (
        <Typography
          variant="body2"
          sx={{ mt: 2, color: 'primary.secondary', mx: "auto" }}
        >
          {!selectedItem ? navGroups : selectedItem}
        </Typography>
      )}
    </Box>
  );
}