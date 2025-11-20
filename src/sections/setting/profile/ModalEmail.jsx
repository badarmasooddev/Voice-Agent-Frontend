import { useState, useEffect } from 'react';

// @mui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import { emailSchema } from '@/utils/validationSchema';

// @assets
import { IconMail } from '@tabler/icons-react';

// api handler
import { updateEmail } from '../../../api/authApi';

/***************************   MODAL - EMAIL  ***************************/

export default function ModalEmail({ userId, userEmail}) {
  const [open, setOpen] = useState(false);
  

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset // Add reset function
  } = useForm({
    defaultValues: { newEmail: userEmail }
  });

  useEffect(() => {
    reset({ newEmail: userEmail });
  }, [userEmail, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await updateEmail(userId, data.newEmail); // Call updateEmail with userId and new email
      setOpen(false);
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };


  return (
    <>
      <Button onClick={() => setOpen(true)}>Update</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={ModalSize.MD}
        header={{ title: 'Email Address', subheader: 'Update your email address to keep your account up to date.' }}
        modalContent={
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <IconMail />
                </InputAdornment>
              }
              error={errors.newEmail && Boolean(errors.newEmail)}
              {...register('newEmail', emailSchema)}
              aria-describedby="outlined-email"
              inputProps={{ 'aria-label': 'email' }}
            />
            {errors.newEmail?.message && <FormHelperText error>{errors.newEmail?.message}</FormHelperText>}
          </form>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Update Email
            </Button>
          </Stack>
        }
      />
    </>
  );
}
