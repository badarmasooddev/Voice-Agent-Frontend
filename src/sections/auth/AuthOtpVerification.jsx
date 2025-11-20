'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router for navigation

// @mui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

// @third-party
import { useForm } from 'react-hook-form';

// @project
import CodeVerification from '@/components/CodeVerification';
import axios from '@/utils/axios';

const verificationTypes = {
  signup: 'signup',
  email_change: 'email_change'
};

/***************************  AUTH - OTP VERIFICATION  ***************************/

export default function AuthOtpVerification({ email, verify }) {
  const navigate = useNavigate(); // Using react-router's useNavigate hook

  const [isProcessing, setIsProcessing] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Initialize react-hook-form
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const onSubmit = (formData) => {
    setIsProcessing(true);
    setOtpError('');

    const type = verificationTypes[verify] ?? verificationTypes.signup;
    const payload = { email, otp: formData.otp, type };

    axios
      .post('/api/auth/verifyOtp', payload)
      .then(() => {
        setIsProcessing(false);
        navigate('/auth/login'); // Using react-router's navigate function
      })
      .catch((response) => {
        setIsProcessing(false);
        setOtpError(response.error || 'Something went wrong');
      });

    // Reset focus after submission
    const activeElement = document.activeElement;
    activeElement?.blur(); // Blurring the currently focused element
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputLabel>Verification Code</InputLabel>
      <CodeVerification control={control} />
      {errors.otp?.message && <FormHelperText error>{errors.otp?.message}</FormHelperText>}

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isProcessing}
        endIcon={isProcessing && <CircularProgress color="secondary" size={16} />}
        sx={{ minWidth: 120, mt: { xs: 2, sm: 4 }, '& .MuiButton-endIcon': { ml: 1 } }}
      >
        Verify Code
      </Button>
      {otpError && (
        <Alert sx={{ mt: 2 }} severity="error" variant="filled" icon={false}>
          {otpError}
        </Alert>
      )}
    </form>
  );
}

AuthOtpVerification.propTypes = { email: PropTypes.any, verify: PropTypes.any };
