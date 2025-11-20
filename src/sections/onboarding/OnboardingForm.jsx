import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Box, CircularProgress, Alert, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLoader from '@/components/PageLoader';
import ApiKeyCard from "./ApiKeyCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserConfigs, getUserConfigs } from "../../api/authApi";

const OnboardingForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const mutation = useMutation({
    mutationFn: (configData) => updateUserConfigs(userId, configData),
    onSuccess: () => {
      queryClient.invalidateQueries(["userConfig", userId]);
      setIsUpdate(true);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
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
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {mutation.isError && <Alert severity="error">Failed to save API keys.</Alert>}
        {mutation.isSuccess && <Alert severity="success">API keys updated successfully!</Alert>}

        <ApiKeyCard
          title="OpenAI API Key"
          description="Enable AI functionalities."
          fieldName="openaiApiKey"
          register={register}
          error={errors.openaiApiKey}
          defaultValue={userConfigs?.configs?.openaiApiKey}
          showBorder={true}
          showContent={true}
          ShowPadding={true}
        />
        <ApiKeyCard
          title="Twilio Account SID"
          description="Enable phone communication."
          fieldName="twilioAccountSid"
          register={register}
          error={errors.twilioAccountSid}
          defaultValue={userConfigs?.configs?.twilioAccountSid}
          showBorder={true}
          showContent={true}
          ShowPadding={true}
        />
        <ApiKeyCard
          title="Twilio Auth Token"
          description="Secure Twilio communication."
          fieldName="twilioAuthToken"
          register={register}
          error={errors.twilioAuthToken}
          defaultValue={userConfigs?.configs?.twilioAuthToken}
          showBorder={true}
          showContent={true}
          ShowPadding={true}
        />
        <ApiKeyCard
          title="Telnyx API Key"
          description="Enable Telnyx Features."
          fieldName="telnyxapikey"
          register={register}
          error={errors.telnyxapikey}
          defaultValue={userConfigs?.configs?.telnyxapikey}
          showBorder={true}
          showContent={true}
          ShowPadding={true}
        />
        <ApiKeyCard
          title="ElevenLabs API Key"
          description="Enable text-to-speech features."
          fieldName="elevenlabsApiKey"
          register={register}
          error={errors.elevenlabsApiKey}
          defaultValue={userConfigs?.configs?.elevenlabsApiKey}
          showBorder={true}
          showContent={true}
          ShowPadding={true}
        />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              width: "200px",
              padding: "12px",
              backgroundColor: "#0077B6",
              "&:hover": { backgroundColor: "#46464F" },
              borderRadius: "8px",
              fontSize: "12px",
            }}
            disabled={mutation.isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {mutation.isLoading ? "Saving..." : isUpdate ? "Update API Keys" : "Save API Keys"}
          </Button>

          {isUpdate && (
            <Button
              variant="contained"
              color="success"
              sx={{
                mt: 2,
                width: "400px",
                padding: "12px",
                backgroundColor: "#0077B6",
                "&:hover": { backgroundColor: "#46464F" },
                borderRadius: "8px",
                fontSize: "12px",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Let's Get Onboard
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default OnboardingForm;
