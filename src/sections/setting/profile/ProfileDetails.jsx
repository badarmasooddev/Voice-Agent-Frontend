import { useEffect, useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// @project
import ModalEmail from './ModalEmail';
import ModalPhoneNumber from './ModalPhoneNumber';
import ModalPassword from './ModalPassword';
import ProfileAvatar from './ProfileAvatar';

import SettingCard from '@/components/cards/SettingCard';
import DialogLogout from '@/components/dialog/DialogLogout';
import DialogDelete from '@/components/dialog/DialogDelete';
import PageLoader from '../../../components/PageLoader';
// @assets
import { IconCheck } from '@tabler/icons-react';

// @api handler
import {  getUser_details, logoutUser, delete_account } from '../../../api/authApi';
import { useNavigate } from 'react-router-dom';

/***************************   PROFILE - DETAILS  ***************************/

export default function SettingDetailsCard({ loading, setLoading }) {
  const navigate = useNavigate();
  const listStyle = { p: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 };

  const primaryTypographyProps = { variant: 'body2', sx: { color: 'grey.700' } };
  const secondaryTypographyProps = {
    variant: 'body1',
    sx: { mt: 1, color: 'text.primary' }
  };

  // Dialog Logout handle
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleDialogLogoutOpen = () => {
    setOpenLogoutDialog(true);
  };
  const authUser = JSON.parse(localStorage.getItem("auth-user"));
 useEffect(() => {
   const fetchUserData = async () => {
     try {
       console.log("google auth user", authUser);
       const userId = authUser?.data?.user?._id || authUser?.user?._id;
        console.log("user id>>", userId);
      if (userId) {
        const response = await getUser_details(userId);
        console.log("api data of the user", response);
        setUserData(response);
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };
  fetchUserData();
}, []);

  const handleDialogLogoutClose = () => {
    setOpenLogoutDialog(false);
  };


  const handleDialogLogout = async () => {
    try {
      setLoading(true)
      await logoutUser();
      localStorage.removeItem("auth-user");
      setOpenLogoutDialog(false);
      setTimeout(() => {
        navigate("/auth/login");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Dialog Delete handle
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDialogDeleteOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDialogDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDialogDelete = async () => {
    try {
      setLoading(true);
      const userId = userData?.userDetails._id;
      if (userId) {
        await delete_account(userId);
        localStorage.removeItem("auth-user");
        setOpenDeleteDialog(false);
        setTimeout(() => {
          navigate("/auth/login");
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setLoading(false);
    }
  };

  return (
    <>
    {loading ? 
      <PageLoader /> 
      :(
      <SettingCard title="Details" caption="Manage your personal details and preferences.">
      <List disablePadding>
        <ListItem sx={listStyle} divider>
          <ProfileAvatar userName={userData?.userDetails.name} />
        </ListItem>
        <ListItem sx={listStyle} divider>
          <Grid container columnSpacing={2} rowSpacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={(userData?.userDetails.name.charAt(0).toUpperCase() + userData?.userDetails.name.slice(1)) || "Erika"}
                fullWidth
                aria-describedby="outlined-name"
                inputProps={{ 'aria-label': 'name' }}
                placeholder="ex. Jone"
                sx={{width: "25rem"}}
              />
            </Grid>
            {/* <Grid size={12}>
              <FormHelperText sx={{ mt: 0 }}>Use your name as they appear on your government-issued ID.</FormHelperText>
            </Grid> */}
          </Grid>
        </ListItem>
        <ListItem sx={listStyle} divider>
          <ListItemText
            primary="Email Address"
            secondary={userData?.userDetails.email || "Erika"}
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, ml: 'auto' }}>
            <Chip label="Verified" variant="text" avatar={<IconCheck />} color="success" />
            {/* <ModalEmail userId={userData?.userDetails._id} userEmail={userData?.userDetails.email} /> */}
          </Stack>
        </ListItem>
        {/* <ListItem sx={listStyle} divider>
          <ListItemText
            primary="Phone Number (optional)"
            secondary="No phone number"
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <ModalPhoneNumber />
        </ListItem> */}
        {authUser?.data?.user?._id && (
              <ListItem sx={listStyle} divider>
                <ListItemText
                  primary="Change Password"
                  secondary="Change the passwords for your Account Security"
                  {...{ primaryTypographyProps, secondaryTypographyProps }}
                />
                <ModalPassword userId={userData?.userDetails._id} />
              </ListItem>
            )}
        <ListItem sx={listStyle} divider>
          <ListItemText primary="Logout" secondary="Logout options here" {...{ primaryTypographyProps, secondaryTypographyProps }} />
          <Button onClick={handleDialogLogoutOpen} sx={{ ml: 'auto' }}>
            Logout
          </Button>
          <DialogLogout
            open={openLogoutDialog}
            title="Logout"
            heading={`Are you sure you want to logout of ${userData?.userDetails.name}?`}
            onClose={handleDialogLogoutClose}
            onLogout={handleDialogLogout}
          />
        </ListItem>
        <ListItem sx={listStyle}>
          <ListItemText
            primary="Delete Account"
            secondary="No longer use of this Account?"
            {...{ primaryTypographyProps, secondaryTypographyProps }}
          />
          <Button color="error" onClick={handleDialogDeleteOpen} sx={{ ml: 'auto' }}>
            Delete Account
          </Button>
          <DialogDelete
            open={openDeleteDialog}
            title="Delete Account"
            heading="Are you sure you want to Delete Your Account?"
            description="After deleting your account there is no way to recover your data back."
            onClose={handleDialogDeleteClose}
            onDelete={handleDialogDelete}
          />
        </ListItem>
      </List>
    </SettingCard>
    )}
    </>
  );
}
