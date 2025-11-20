import { useState } from 'react';
import { Button, Stack, OutlinedInput, Box, InputLabel, FormHelperText, Snackbar,Alert ,Slide} from '@mui/material';
import { ModalSize } from '@/enum';
import Modal from '@/components/Modal';
import Contact from '@/components/Contact';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { makeCall } from '@/api/callAgentApi';

const CallModal = ({ open, onClose, callId, assistantPhone }) => {
  const [snackbar, setSnackbar] = useState(null);

  const { register, handleSubmit, watch, control, setValue, formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      dialcode: '',
      contact: ''
    }
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => prev && { ...prev, open: false });
  };
  const callMutation = useMutation({
    mutationKey: ['make-call'],
    mutationFn: makeCall,
    onSuccess: () => {
      setSnackbar({ open: true, message: 'Call Initiated!', severity: 'success' });
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Failed to make Call', severity: 'error' });
    }
  });
  const onSubmit = (data) => {
    console.log('Form Submitted', data);
    const fullPhoneNumber = `${data.dialcode}${data.contact}`;
    console.log(fullPhoneNumber);
    callMutation.mutate({ to: fullPhoneNumber, from: assistantPhone, recipientName: data.name, assistantId: callId });

  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        maxWidth={ModalSize.MD}
        header={{ title: 'Make Call', closeButton: true }}
        modalContent={
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 2.5 }}>
              <Box>
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  placeholder="ex. John"
                  error={errors.name && Boolean(errors.name)}
                  {...register('name')}
                />
                {errors.name?.message && <FormHelperText error>{errors.name?.message}</FormHelperText>}
              </Box>
              <Box>
                <InputLabel>Number</InputLabel>
                <Contact
                  helpText="Contact number"
                  fullWidth
                  control={control}
                  dialCode={watch('dialcode')}
                  onCountryChange={(data) => setValue('dialcode', data.dialCode)}
                />
                {errors.contact?.message && <FormHelperText error>{errors.contact?.message}</FormHelperText>}

              </Box>
            </Stack>
          </form >
        }
        footer={
          < Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Call
            </Button>
          </Stack >
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
      </Snackbar></>
  );
};

export default CallModal;
