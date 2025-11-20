import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { saveIntegration, fetchHubSpotContacts, fetchZapierContacts, getUserIntegrations } from "../../api/crmApi";
import { getAssistant } from "../../api/assistantApi";
import {
  Button,
  Stack,
  OutlinedInput,
  Box,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const crmOptions = [
  { value: "hubspot", label: "HubSpot" },
  { value: "zapier", label: "Zapier" },
];

const crmFields = {
  hubspot: [
    { name: "clientId", label: "Client ID", type: "text" },
    { name: "clientSecret", label: "Client Secret", type: "text" },
    { name: "redirectUri", label: "Redirect URI", type: "text" },
  ],
  zapier: [{ name: "webhookUrl", label: "Zapier Webhook URL", type: "text" }],
};

const CrmIntegrationForm = ({ crmType }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [contacts, setContacts] = useState([]);
  const [fetchingContacts, setFetchingContacts] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [existingConfig, setExistingConfig] = useState(null);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      crmName: crmType || "",
      assistantId: "",
      config: {},
    },
  });

  const selectedCrm = watch("crmName");

  useEffect(() => {
    const fetchSavedConfig = async () => {
      try {
        const response = await getUserIntegrations();
        if (response?.data) {
          const savedConfig = response.data.find((config) => config.crmName === selectedCrm);
          if (savedConfig) {
            setExistingConfig(savedConfig);
            setValue("assistantId", savedConfig.assistantId);
            setValue("config", savedConfig.config);
          }
        }
      } catch (error) {
        console.error("Error fetching saved integrations:", error);
      }
    };

    if (selectedCrm) {
      fetchSavedConfig();
    }
  }, [selectedCrm, setValue]);

  useEffect(() => {
    if (crmType) {
      setValue("crmName", crmType.toLowerCase());
    }
  }, [crmType, setValue]);

  useEffect(() => {
    if (selectedCrm) {
      const defaultConfig = {};
      crmFields[selectedCrm]?.forEach((field) => {
        defaultConfig[field.name] = "";
      });
      setValue("config", defaultConfig);
    }
  }, [selectedCrm, setValue]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["assistants"],
    queryFn: async () => {
      try {
        const response = await getAssistant();
        return Array.isArray(response?.data) ? response.data.filter((assistant) => assistant.agentId) : [];
      } catch (error) {
        console.error("Error fetching assistants:", error);
        return [];
      }
    },
  });

  const assistants = data ?? [];

  const mutation = useMutation({
    mutationFn: saveIntegration,
    onSuccess: async (response) => {
      setSnackbar({ open: true, message: "CRM Integration Saved Successfully!", severity: "success" });

      if (response?.data?.redirectUrl) {
        window.open(response.data.redirectUrl, "_blank");
      } else {
        console.warn("No redirect URL received.");
      }

      setIsConnected(true);
    },
    onError: () => {
      setSnackbar({ open: true, message: "Error saving CRM integration!", severity: "error" });
    },
  });

  const fetchContacts = async () => {
    setFetchingContacts(true);
    try {
      let contactsResponse;
      
      if (selectedCrm === "hubspot") {
        contactsResponse = await fetchHubSpotContacts();
      } else if (selectedCrm === "zapier") {
        contactsResponse = await fetchZapierContacts();
      }
  
      setContacts(contactsResponse.data || []);
      setSnackbar({ open: true, message: "Contacts fetched successfully!", severity: "success" });
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setSnackbar({ open: true, message: "Failed to fetch contacts!", severity: "error" });
    } finally {
      setFetchingContacts(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const response = await mutation.mutateAsync({
        crmName: formData.crmName,
        assistantId: formData.assistantId,
        config: formData.config,
      });

      if (!response || !response.data) {
        console.warn("No response or data received from backend!");
        return;
      }
      
    } catch (error) {
      console.error("Error saving CRM integration:", error);
      setSnackbar({ open: true, message: "Error saving CRM integration!", severity: "error" });
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4, p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {selectedCrm ? `${selectedCrm} Integration` : "CRM Integration"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Box>
            <InputLabel>CRM</InputLabel>
            <Controller
              name="crmName"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("config", {});
                  }}
                >
                  {crmOptions.map((crm) => (
                    <MenuItem key={crm.value} value={crm.value}>
                      {crm.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>Select a CRM to integrate</FormHelperText>
          </Box>

          <Box>
            <InputLabel>Select Assistant</InputLabel>
            {isLoading ? (
              <Typography variant="body2">Loading assistants...</Typography>
            ) : error ? (
              <Typography variant="body2" color="error">
                Error fetching assistants
              </Typography>
            ) : (
              <Controller
                name="assistantId"
                control={control}
                render={({ field }) => (
                  <Select {...field} fullWidth displayEmpty>
                    <MenuItem value="" disabled>
                      Select an Assistant
                    </MenuItem>
                    {assistants.length > 0 ? (
                      assistants.map((assistant) => (
                        <MenuItem key={assistant._id} value={assistant._id}>
                          {assistant.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No assistants available</MenuItem>
                    )}
                  </Select>
                )}
              />
            )}
            <FormHelperText>Choose the assistant for CRM integration</FormHelperText>
          </Box>

          {selectedCrm && crmFields[selectedCrm] ? (
            crmFields[selectedCrm].map((field) => (
              <Box key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Controller
                  name={`config.${field.name}`}
                  control={control}
                  render={({ field: inputField }) => (
                    <OutlinedInput
                      type={field.type}
                      fullWidth
                      {...inputField}
                      value={inputField.value || ""}
                      onChange={(e) => inputField.onChange(e.target.value)}
                    />
                  )}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Please select a CRM to configure integration fields.
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={mutation.isLoading}>
            {existingConfig ? "Update Integration" : "Save Integration"}
          </Button>

          {isConnected && (
            <Button variant="outlined" color="secondary" fullWidth onClick={fetchContacts} disabled={fetchingContacts}>
              {fetchingContacts ? <CircularProgress size={24} /> : "Show Contacts"}
            </Button>
          )}
        </Stack>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Show Contacts */}
      {contacts.length > 0 && (
        <Box mt={4}>
            <Typography variant="h6">Fetched Contacts from {selectedCrm === "hubspot" ? "HubSpot" : "Zapier"}:</Typography>
            <List>
            {contacts.map((contact, index) => (
                <ListItem key={index}>
                <ListItemText
                    primary={`${contact.properties?.firstname || contact.firstName} ${contact.properties?.lastname || contact.lastName}`}
                    secondary={contact.properties?.email || contact.email || "No Email"}
                />
                </ListItem>
            ))}
            </List>
        </Box>
        )}
    </Box>
  );
};

export default CrmIntegrationForm;
