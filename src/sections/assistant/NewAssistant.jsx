import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createElevenLabAssistant } from '@/api/assistantApi';
import { getAllPhoneNumber } from '@/api/phoneNumsApi';

// @mui
import {
  Alert, Avatar, Button, FormControl, FormHelperText, Grid, InputLabel,
  OutlinedInput, Select, MenuItem, ListItemText, Stack, Snackbar, Slide,
  CircularProgress, Box
} from '@mui/material';

// @third-party
import { useForm, Controller } from 'react-hook-form';

// @project
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { assistantNameSchema } from '@/utils/validationSchema';
import { update_assistant } from '@/api/assistantApi';
import { Description } from '@mui/icons-material';

export default function AddNewAssistant({ open, onClose, formData, setData }) {
  const [snackbar, setSnackbar] = useState(null);

  const { data: phoneNumbers = [], isLoading } = useQuery({
    queryKey: ['phoneNumbers'],
    queryFn: async () => {
      try {
        const phoneNumbers = await getAllPhoneNumber();
        console.log("Fetched phone numbers:", phoneNumbers);
        return phoneNumbers;
      } catch (error) {
        console.error("Fetching phone numbers failed:", error);
        throw error;
      }
    }
  });

  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(phoneNumbers.number);

  useEffect(() => {
    if (phoneNumbers.length > 0 && formData) {
      setSelectedPhoneNumber(formData.phoneNumber[0].number);
    }
  }, [phoneNumbers, formData]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => prev && { ...prev, open: false });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      assistantName: "",
      phoneNumber: "",
      callMode: "Outbound"
    }
  });

  const createAssistantMutation = useMutation({
    mutationFn: async (data) => {
      return createElevenLabAssistant({
        name: data.assistantName,
        phoneNumber: [data.phoneNumber]
      });
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: 'Assistant created successfully!', severity: 'success' });
      reset();
      onClose();
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Failed to create assistant', severity: 'error' });
    }
  });

  const onSubmit = async (data) => {
    if (formData) {
      const phoneNumberId = phoneNumbers.find(num => num.number === data.phoneNumber)?._id;
      try {
        await update_assistant(
          { name: data.assistantName, phoneNumber: [phoneNumberId] },
          formData._id
        );
        setData((prevData) =>
          prevData.map((item) =>
            item._id === formData._id
              ? { ...item, name: data.assistantName, phoneNumber: [{ number: data.phoneNumber }] }
              : item
          )
        );

        setSnackbar({ open: true, message: 'Assistant updated successfully!', severity: 'success' });
        onClose();
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to update assistant', severity: 'error' });
      }
    } else {
      createAssistantMutation.mutate(data);
    }
  };

  const isCreating = createAssistantMutation.isPending;

  useEffect(() => {
    if (formData) {
      reset({
        assistantName: formData.name || "",
        callMode: formData.callMode || 'Outbound',
        phoneNumber: formData.phoneNumber?.[0]?.number || "",
      });
    }
  }, [formData, reset]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        maxWidth={ModalSize.MD}
        header={{
          title: formData ? 'Edit Assistant' : 'Create Assistant',
          closeButton: true
        }}
        modalContent={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack sx={{ gap: 3 }}>
                <Stack sx={{ gap: 2 }}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="ex. John"
                        defaultValue={formData?.name || ""}
                        error={errors.assistantName && Boolean(errors.assistantName)}
                        {...register('assistantName', assistantNameSchema)}
                      />
                      {errors.assistantName?.message && <FormHelperText error>{errors.assistantName?.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Call Mode</InputLabel>
                      <FormControl fullWidth error={Boolean(errors.callMode)}>
                        <Controller
                          name="callMode"
                          control={control}
                          defaultValue={formData?.callMode || 'outbound'}
                          rules={{ required: "Call mode is required" }}
                          render={({ field }) => (
                            <Select {...field}>
                              <MenuItem value="outbound">Outbound</MenuItem>
                              <MenuItem value="inbound">Inbound</MenuItem>
                            </Select>
                          )}
                        />
                        {errors.callMode && <FormHelperText>{errors.callMode.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel>Phone Number</InputLabel>
                      <FormControl fullWidth error={Boolean(errors.phoneNumber)}>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          placeholder={selectedPhoneNumber || formData?.phoneNumber}
                          defaultValue={selectedPhoneNumber}
                          rules={{ required: "Phone number is required" }}
                          render={({ field }) => (
                            <Select {...field} sx={{ width: '100%' }} disabled={isLoading}>
                              {isLoading ? (
                                <MenuItem disabled>
                                  <ListItemText>Loading...</ListItemText>
                                </MenuItem>
                              ) : (
                                phoneNumbers.map((num) => (
                                  <MenuItem key={num._id} value={num.number}>
                                    <ListItemText>{num.number} - ({num.region}) - ({num.provider})</ListItemText>
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          )}
                        />
                        {errors.phoneNumber && <FormHelperText>{errors.phoneNumber.message}</FormHelperText>}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </form>
          </>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isCreating}>
              {isCreating ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Creating...
                </Box>
              ) : formData ? 'Update Assistant' : 'Create Assistant'}
            </Button>
          </Stack>
        }
      />
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

AddNewAssistant.propTypes = { open: PropTypes.any, onClose: PropTypes.any, formData: PropTypes.any };
