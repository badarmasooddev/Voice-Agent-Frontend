'use client';
import PropTypes from 'prop-types';

// @next
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import Contact from '@/components/Contact';
import axios from '@/utils/axios';
import { emailSchema, passwordSchema, FullNameSchema } from '@/utils/validationSchema';
import { register as registerUser } from '@/api/authApi';

// @icons
import { IconEye, IconEyeOff } from '@tabler/icons-react';

/***************************  AUTH - REGISTER  ***************************/

export default function AuthRegister({ inputSx }) {
  const navigate = useNavigate();

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { dialcode: '+1' } });

  const password = useRef({});
  password.current = watch('password', '');

  // Handle form submission
  const onSubmit = (formData) => {
    const payload = {
      name: formData.name, // Use single name field
      email: formData.email,
      password: formData.password
    };
    setIsProcessing(true);
    setRegisterError('');
    registerUser(payload.name, payload.email, payload.password)
      .then(() => {
        setIsProcessing(false);
        navigate('/auth/login');
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error.response && error.response.data && error.response.data.message) {
          setRegisterError(error.response.data.message);
        } else {
          setRegisterError('Registration failed');
        }
      });
  };

  const commonIconProps = { size: 16, color: theme.palette.grey[700] };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container rowSpacing={2.5} columnSpacing={1.5}>
      <Grid size={12}>
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          {...register('name', FullNameSchema )} // Register single name field
          placeholder="Enter your name"
          fullWidth
          error={Boolean(errors.name)}
          sx={{ ...inputSx }}
        />
        {errors.name?.message && <FormHelperText error>{errors.name?.message}</FormHelperText>}
      </Grid>
        <Grid size={12}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            {...register('email', emailSchema)}
            placeholder="info@trixlyai.com"
            fullWidth
            error={Boolean(errors.email)}
            sx={{ ...inputSx }}
          />
          {errors.email?.message && <FormHelperText error>{errors.email?.message}</FormHelperText>}
        </Grid>
        <Grid size={12}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            {...register('password', passwordSchema)}
            type={isOpen ? 'text' : 'password'}
            placeholder="Enter password"
            fullWidth
            autoComplete="new-password"
            error={Boolean(errors.password)}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
              </InputAdornment>
            }
            sx={inputSx}
          />
          {errors.password?.message && <FormHelperText error>{errors.password?.message}</FormHelperText>}
        </Grid>
        <Grid size={12}>
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            {...register('confirmPassword', { validate: (value) => value === password.current || 'The passwords do not match' })}
            type={isConfirmOpen ? 'text' : 'password'}
            placeholder="Enter confirm password"
            fullWidth
            error={Boolean(errors.confirmPassword)}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                onClick={() => setIsConfirmOpen(!isConfirmOpen)}
              >
                {isConfirmOpen ? <IconEye {...commonIconProps} /> : <IconEyeOff {...commonIconProps} />}
              </InputAdornment>
            }
            sx={inputSx}
          />
          {errors.confirmPassword?.message && <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isProcessing}
        endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
        sx={{ minWidth: 120, mt: { xs: 2, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 } }}
      >
        Sign Up
      </Button>
      {registerError && (
        <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
          {registerError}
        </Alert>
      )}
    </form>
  );
}

AuthRegister.propTypes = { inputSx: PropTypes.any };
