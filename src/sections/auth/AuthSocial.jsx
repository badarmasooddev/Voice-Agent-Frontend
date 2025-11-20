import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GetImagePath from "@/utils/GetImagePath";
import Snackbar from "@mui/material/Snackbar";
import Slide from '@mui/material/Slide';
import Alert from "@mui/material/Alert";
import { SocialTypes } from "@/enum";


import { useState, useEffect } from "react";
import { google_auth } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const authButtons = [
  {
    label: "Google",
    icon: "/assets/images/social/google.svg",
    title: "Sign In with Google",
  },
];

export default function AuthSocial({ type = SocialTypes.VERTICAL, buttonSx }) {
  const navigate = useNavigate()
  const [googleClient, setGoogleClient] = useState(GOOGLE_CLIENT_ID);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    // Load Google SDK
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    } else {
      initializeGoogle();
    }
  }, []);


  // alert message function
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };


  const initializeGoogle = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          if (response.credential) {
            try {
              const serverResponse = await google_auth(response.credential);
              if (serverResponse) {
                localStorage.setItem('auth-user', JSON.stringify(serverResponse));
                setSnackbar({ open: true, message: serverResponse.message, severity: "success" });
                navigate('/'); // navigate to home page after successful auth
              }
            } catch (error) {
              console.error("Google Auth API Error:", error);
              const errorMessage = error.response?.data?.message || error.message || "Google authentication failed!";
              setSnackbar({ open: true, message: errorMessage, severity: "error" });
            }
          }
        },
        ux_mode: "popup",
      });
      setGoogleClient(window.google.accounts.id);
    }
  };

  const handleGoogleauth = () => {
    if (!googleClient) {
      console.error("Google Client is not initialized");
      return;
    }
    googleClient.prompt();
  };

  return (
    <>
    <Stack
      direction={type === SocialTypes.VERTICAL ? "column" : "row"}
      sx={{ gap: 1 }}
    >
      {authButtons.map((item, index) => (
        <Button
          key={index}
          variant="outlined"
          fullWidth
          size="small"
          color="secondary"
          onClick={handleGoogleauth}
          sx={{
            ...(type === SocialTypes.HORIZONTAL && {
              ".MuiButton-startIcon": { m: 0 },
            }),
            ...buttonSx,
          }}
          startIcon={
            <CardMedia
              component="img"
              src={GetImagePath(item.icon)}
              sx={{ width: 16, height: 16 }}
              alt={item.label}
            />
          }
        >
          {type === SocialTypes.VERTICAL && (
            <Typography variant="caption1">{item.title}</Typography>
          )}
        </Button>
      ))}
    </Stack>
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        open={snackbar?.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar?.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
     </> 
  );
}

AuthSocial.propTypes = { type: PropTypes.any, buttonSx: PropTypes.any };
