// @React imports
import React, { useState, useEffect } from 'react'


// @mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Alert, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import PageLoader from '../../../components/PageLoader';
import Slide from '@mui/material/Slide';


// @project
import SettingCard from '@/components/cards/SettingCard';
import ApiKeyCard from '../../onboarding/ApiKeyCard';
import ModalKey from './UpdateKeys';

// @thrid party
import { useForm } from "react-hook-form"; // Add this import
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"; // Add this import
import { updateUserConfigs, getUserConfigs } from "../../../api/authApi";

const AppSetting = () => {
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar((prev) => prev && { ...prev, open: false });
  };

  const listStyle = { p: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 1 };

  const primaryTypographyProps = { variant: 'body2', sx: { color: 'grey.700' } };
  const secondaryTypographyProps = {
    variant: 'body1',
    sx: { mt: 1, color: 'text.primary' }
  };


  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const storedAuthUser = localStorage.getItem("auth-user");
    if (storedAuthUser) {
      try {
        const parsedUser = JSON.parse(storedAuthUser);
        const userIdFromStorage = parsedUser?.data?.user?._id;
        if (userIdFromStorage) {
          setUserId(userIdFromStorage);
        }
      } catch (error) {
        console.error("Error parsing auth-user data:", error);
      }
    }
  }, []);

  const { data: userConfigs, isLoading: configLoading, isError: configError } = useQuery({
    queryKey: ["userConfig", userId],
    queryFn: () => getUserConfigs(userId),
    enabled: !!userId,
    onSuccess: (config) => {
      if (config?.configs) {
        setIsUpdate(true);
        Object.entries(config.configs).forEach(([key, value]) => setValue(key, value));
      }
    },
  });

  console.log("userConfigs", userConfigs);

  const mutation = useMutation({
    mutationFn: (configData) => updateUserConfigs(userId, configData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userConfig", userId]);
      setIsUpdate(true);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
    setSnackbar({ open: true, message: "Update Successfully", severity: 'success' });
  };

  useEffect(() => {
    if (userConfigs?.configs) {
      setIsUpdate(true);
    }
  }, [userConfigs]);

  useEffect(() => {
    if (isUpdate) {
      localStorage.setItem("configs-saved", JSON.stringify(true));
    }
  }, [isUpdate]);

  if (!userId) return <Alert severity="warning">User ID not found. Please log in.</Alert>;
  if (configLoading) return <PageLoader />;
  if (configError) return <Alert severity="error">Failed to load configurations.</Alert>;



  return (
    <>
      <SettingCard title="Update Your API Keys" caption="To continue using AI-driven features and seamless calling functionalities, please update your API keys.">
        <form onSubmit={handleSubmit(onSubmit)}> {/* Add form submission handling */}
          <List disablePadding>
            <ListItem sx={listStyle} divider>
              <ApiKeyCard
                title="OpenAI API Key"
                description="Enable AI functionalities."
                fieldName="openaiApiKey"
                register={register}
                error={errors.openaiApiKey}
                defaultValue={userConfigs?.configs?.openaiApiKey}
                showBorder={false}
                showContent={false}
              />
            </ListItem>
            {/* Repeat for other API keys */}
            <ListItem sx={listStyle} divider>
              <ApiKeyCard
                title="Twilio Account SID"
                description="Enable phone communication."
                fieldName="twilioAccountSid"
                register={register}
                error={errors.twilioAccountSid}
                defaultValue={userConfigs?.configs?.twilioAccountSid}
                showBorder={false}
                showContent={false}
              />
            </ListItem>
            <ListItem sx={listStyle} divider>
              <ApiKeyCard
                title="Twilio Auth Token"
                description="Secure Twilio communication."
                fieldName="twilioAuthToken"
                register={register}
                error={errors.twilioAuthToken}
                defaultValue={userConfigs?.configs?.twilioAuthToken}
                showBorder={false}
                showContent={false}
              />
            </ListItem>
            <ListItem sx={listStyle} divider>
              <ApiKeyCard
                title="Telnyx API Key"
                description="Enable Twilio Features"
                fieldName="telnyxapikey"
                register={register}
                error={errors.telnyxapikey}
                defaultValue={userConfigs?.configs?.telnyxapikey}
                showBorder={false}
                showContent={false}
              />
            </ListItem>
            <ListItem sx={listStyle} divider>
              <ApiKeyCard
                title="ElevenLabs API Key"
                description="Enable text-to-speech features."
                fieldName="elevenlabsApiKey"
                register={register}
                error={errors.elevenlabsApiKey}
                defaultValue={userConfigs?.configs?.elevenlabsApiKey}
                showBorder={false}
                showContent={false}
              />
            </ListItem>
            <ListItem sx={listStyle} divider>
                <ListItemText
                  {...{ primaryTypographyProps, secondaryTypographyProps }}
                />
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, ml: 'auto' }}>
                  <Button variant="contained" sx={{width: "8rem"}} type="submit">Update</Button>
                </Stack>
              </ListItem>
          </List>
        </form>
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
      </SettingCard>
    </>
  )
}

export default AppSetting