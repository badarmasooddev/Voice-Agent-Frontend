import React, { useState, useMemo } from 'react';
import { Box, Button, TextField, Typography, Avatar, InputAdornment } from '@mui/material';
import { IconUser, IconMail, IconPhoneCall } from '@tabler/icons-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { styled } from '@mui/system';

// Adjusted Mui Styled component to remove border from the phone input field
const StyledPhoneInput = styled(PhoneInput)({
  width: "100%",
  color: "#000",
  '& input': {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: "black",
    padding: "8px 0",
    '&::placeholder': {
      color: "#D2D1D1",
    },
  },
});

const CallForm = () => {
  const [phone, setPhone] = useState('');

  const memoizedPhoneInput = useMemo(() => (
    <StyledPhoneInput
      international
      defaultCountry="US"
      value={phone}
      onChange={setPhone}
      placeholder="Your number"
    />
  ), [phone]);

  return (
    <Box
      sx={{
        bgcolor: '#006397',
        p: 3,
        borderRadius: "10px",
        textAlign: 'center',
        boxShadow: 2,
        maxWidth: '21rem',
        height: "24.2rem",
        mt: {xs: "3rem"},
        ml: {xs: "2rem"},
      }}
    >
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Avatar
          alt="Demo Agent"
          src="/path-to-your-image/agent-image.png"
          sx={{
            width: 50,
            height: 50,
          }}
        />
        <Typography
          variant="h6"
          fontWeight="400px"
          sx={{ color: '#FFFFFF' }}
        >
          TEENA (DEMO AGENT)
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: "-4px",
          ml: 8,
          backgroundColor: "#FFFFFF",
          color: '#006397',
          fontWeight: '400px',
          border: "1px solid #006397",
          borderRadius: "20px",
          width: "fit-content",
          padding: "3px 20px"
        }}
      >
        Available
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          placeholder="Your name"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconUser stroke={2} style={{ color: '#006397', width: "1.5rem", height: "auto" }}/>
              </InputAdornment>
            ),
            style: { color: 'black' }
          }}
          sx={{
            mb: 1.5,
            padding: '10px 12px',
            backgroundColor: '#FFFFFF',
            borderRadius: "29px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '29px',
              boxShadow: "none !important",
              color: 'black',
              '& fieldset': { 
                borderColor: 'transparent !important',
              },
              '&:hover fieldset': {
                borderColor: 'transparent !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent !important',
              },
              '& input::placeholder': {
                color: '#D2D1D1'
              },
            },
          }}
        />
        <TextField
          placeholder="Your email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconMail stroke={2} style={{ color: '#006397', width: "1.5rem", height: "auto" }}/>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 1.5,
            padding: '10px 12px',
            backgroundColor: '#FFFFFF',
            borderRadius: "29px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '29px',
              boxShadow: "none !important",
              '& input::placeholder': {
                color: '#D2D1D1'
              },
              '& fieldset': { 
                borderColor: 'transparent !important',
              },
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: "29px",
            padding: '9px 12px',
            border: '1px solid transparent',
            mb: 0.5,
          }}
        >
          <IconPhoneCall stroke={2} style={{ color: '#006397' }} />
          {memoizedPhoneInput}
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            p: 1.4,
            bgcolor: '#000000',
            color: "#FFFFFF",
            borderRadius: "29px",
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#333333',
            },
          }}
        >
          Call me now
        </Button>
      </Box>
    </Box>
  );
};

export default CallForm;
