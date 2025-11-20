import { useState } from 'react';
import { Button, Typography, Box, Modal, Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import { IconPhone } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import countryCodes from '../../utils/country_codes';

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [assistantPhoneNumber, setAssistantPhoneNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const handlePhoneNumberChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, '');
    if (field === 'phone') {
      setPhoneNumber(value);
    } else if (field === 'assistant') {
      setAssistantPhoneNumber(value);
    }
  };

  return (
    <Box
      sx={{
        width: '280px',
        minHeight: '100vh',
        borderRight: '2px solid #ddd',
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#f9f9f9',
        position: 'relative',
        left: '-50px',
        top: '-25px',
      }}
    >
      <Typography 
        variant="subtitle2" 
        sx={{ cursor: 'pointer', color: '#555', fontWeight: 500 }}
        onClick={() => navigate(`/assistant`)}
      >
        ← Back to Assistants
      </Typography>

      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="h6" fontSize={'16px'} fontWeight={600}>My Outbound Assistant</Typography>
        <Typography variant="body2" color="textSecondary" fontSize={'13px'}>No number • ID: ...100</Typography>
        <Button
          variant="contained"
          startIcon={<IconPhone size={16} />}
          fullWidth
          sx={{ mt: 2, backgroundColor: '#1a1a2e', color: '#fff', borderRadius: '8px' }}
          onClick={() => setOpenModal(true)}
        >
          Test Assistant
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {["dashboard", "prompt", "calllogs"].map((tab) => (
            <Button
            key={tab}
            fullWidth
            onClick={() => setSelectedTab(tab)}
            variant="contained"
            sx={{
                borderRadius: "8px",
                color: "black",
                textTransform: "none",
                backgroundColor: selectedTab === tab ? "#E8E6FF" : "transparent",
                border: selectedTab === tab ? "none" : "1px solid #ddd",
                "&:hover": {
                backgroundColor: selectedTab === tab ? "#D6D3FF" : "#f0f0f0",
                },
            }}
            >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
        ))}
        </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
        <Typography variant="h6">Test your assistant</Typography>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Assistant Number"
            value={assistantPhoneNumber}
            onChange={(e) => handlePhoneNumberChange(e, 'assistant')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    sx={{ minWidth: 150, left: '-10px' }}
                  >
                    {countryCodes.map((country) => (
                      <MenuItem key={country.key} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e, 'phone')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    sx={{ minWidth: 150, left: '-10px' }}
                  >
                    {countryCodes.map((country) => (
                      <MenuItem key={country.key} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
            variant="contained"
            startIcon={<IconPhone size={16} />}
            fullWidth
            disabled={!phoneNumber}
            sx={{ backgroundColor: '#1a1a2e', color: '#fff' }}
          >
            Call Me
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
