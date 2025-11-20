import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  useTheme
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAssistant } from '@/api/assistantApi';
import AddNewAssistant from './NewAssistant';

import { IconUser, IconVocabulary, IconSearch } from '@tabler/icons-react';

const AssistantSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeAssistantId = location.pathname.split('/').pop();

  const { data: assistants = [], isLoading, isError } = useQuery({
    queryKey: ['assistants'],
    queryFn: getAssistant,
    select: (res) => {
      return [...res.data].sort((a, b) => {
        const dateA = new Date(a.created || a.createdAt || a.timestamp || 0).getTime();
        const dateB = new Date(b.created || b.createdAt || b.timestamp || 0).getTime();
        return dateB - dateA;
      });
    }
  });

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssistantClick = (_id) => {
    navigate(`/assistant/configure/${_id}`);
  };

  const handleCreateAssistantClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: isDarkMode ? theme.palette.background.default : '#FFFFFF',
        color: isDarkMode ? theme.palette.text.primary : 'black',
        p: 4,
        pt:6,
        borderRight: `1px solid ${isDarkMode ? theme.palette.divider : '#E2E8F0'}`,
        ml: "-2rem",
        mt: "-2rem"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <IconUser stroke={1} />
          <Typography variant="primary">Assistants</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            border: `1px solid ${isDarkMode ? theme.palette.grey[400] : '#ECECEE'}`,
            bgcolor: isDarkMode ? theme.palette.grey[300] : '#ECECEE',
            borderRadius: "12px",
            px: "10px",
            py: "5px"
          }}
        >
          <IconVocabulary stroke={1} style={{ width: "20px" }} />
          <Typography variant="primary" sx={{ fontSize: "0.9em" }}>Docs</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mb: 2,
          bgcolor: isDarkMode ? theme.palette.primary.main : 'primary',
          '&:hover': { bgcolor: isDarkMode ? theme.palette.primary.dark : 'secondary' }
        }}
        onClick={handleCreateAssistantClick}
      >
        + Create Assistant
      </Button>

      <TextField
        placeholder="Search Assistants"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch />
            </InputAdornment>
          ),
        }}
        sx={{
          input: { color: isDarkMode ? theme.palette.text.primary : 'black' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: isDarkMode ? theme.palette.grey[400] : '#cbd5e1' },
            '&:hover fieldset': { borderColor: isDarkMode ? theme.palette.grey[500] : '#94a3b8' },
          },
          mb: 2,
        }}
      />

      <List>
        {isLoading ? (
          <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', mt: 2 }}>Loading...</Typography>
        ) : isError ? (
          <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', mt: 2, color: 'red' }}>
            Failed to load assistants
          </Typography>
        ) : filteredAssistants.length > 0 ? (
          filteredAssistants.map((assistant) => (
            <ListItem
              key={assistant.id}
              sx={{
                bgcolor: isDarkMode ? theme.palette.background.default : '#ffffff',
                borderRadius: 1,
              }}
              onClick={() => handleAssistantClick(assistant._id)}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      bgcolor: assistant._id === activeAssistantId ? (isDarkMode ? theme.palette.action.hover : '#EBF6F5') : 'transparent',
                      color: isDarkMode ? theme.palette.text.primary : "black",
                      py: 1,
                      px: 1,
                      textAlign: 'left',
                      borderRadius: '8px',
                      '&:hover': { backgroundColor: isDarkMode ? theme.palette.action.hover : '#F4F4F5', cursor: 'pointer' }
                    }}
                  >
                    {assistant.name}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: isDarkMode ? theme.palette.text.secondary : '#6b7280', fontSize: '0.75rem' }}>
                    {assistant.createdBy}
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', mt: 2 }}>
            No assistant name found
          </Typography>
        )}
      </List>

      <AddNewAssistant
        open={isModalOpen}
        onClose={handleCloseModal}
        formData={null}
        setData={null}
      />
    </Box>
  );
};

export default AssistantSidebar;
