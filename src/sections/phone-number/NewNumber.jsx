import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { searchTwilioNumbers, buyTwilioNumber, searchTelnyxNumbers, buyTelnyxNumber } from '@/api/phoneNumsApi';
import countries from '@/data/countries';

// @mui
import {
  Alert, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput,
  Select, MenuItem, ListItemText, Stack, Snackbar, Slide, CircularProgress, Box
} from '@mui/material';

// @third-party
import { useForm, Controller } from 'react-hook-form';

// @project
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';

export default function AddNewNumber({ open, onClose }) {
  const [snackbar, setSnackbar] = useState(null);
  const [provider, setProvider] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { countryCode: '', areaCode: '', capabilities: '' }
  });

  const handleCloseSnackbar = () => setSnackbar((prev) => prev && { ...prev, open: false });

  const handleClose = () => {
    reset();
    setSearchResults([]);
    setProvider('');
    onClose();
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    reset();
    setSearchResults([]);
  };

  const searchNumbers = async (data) => {
    try {
      setIsLoading(true);
      setSearchResults([]);
    
      let results = [];
  
      if (provider === 'twilio') {
        results = await searchTwilioNumbers(data);
      } else if (provider === 'telnyx') {
        results = await searchTelnyxNumbers(data.countryCode);
      }
  
      if (!results.length) {
        throw new Error('No numbers available for this region.');
      }
  
      setSearchResults(results);
    } catch (error) {
      console.error('Error:', error.message);
      setSnackbar({ open: true, message: 'No numbers available for this region.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  }; 

  const buyNumberMutation = useMutation({
    mutationFn: async (phoneNumber) => {
      return provider === 'twilio' ? buyTwilioNumber(phoneNumber) : buyTelnyxNumber(phoneNumber);
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: 'Number purchased successfully!', severity: 'success' });
      handleClose();
    },
    onError: () => {
      setSnackbar({ open: true, message: 'Failed to buy number', severity: 'error' });
    }
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        maxWidth={ModalSize.MD}
        header={{
          title: 'Buy a Phone Number',
          closeButton: true
        }}
        modalContent={
          <>
            <Stack sx={{ gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Select Provider of Your Choice</InputLabel>
                <Select value={provider} onChange={handleProviderChange}>
                  <MenuItem value="twilio">Twilio</MenuItem>
                  <MenuItem value="telnyx">Telnyx</MenuItem>
                </Select>
              </FormControl>

              {provider && (
                <form onSubmit={handleSubmit(searchNumbers)}>
                  <Stack sx={{ gap: 2 }}>
                    <Grid container spacing={1.5}>
                      <Grid item xs={6}>
                        <InputLabel>Country Code</InputLabel>
                        <FormControl fullWidth error={!!errors.countryCode}>
                          <Controller
                            name="countryCode"
                            control={control}
                            rules={{ required: 'Country code is required' }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                onChange={(e) => setValue('countryCode', e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  Select Country Code
                                </MenuItem>
                                {countries.map((country) => (
                                  <MenuItem key={country.countyCode} value={country.countyCode}>
                                    {country.name} ({country.dialCode})
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                          {errors.countryCode && <FormHelperText>{errors.countryCode.message}</FormHelperText>}
                        </FormControl>
                      </Grid>

                      {provider === 'twilio' && (
                        <Grid item xs={6}>
                          <InputLabel>Area Code (Optional)</InputLabel>
                          <OutlinedInput fullWidth {...register('areaCode')} />
                        </Grid>
                      )}

                      {provider === 'twilio' && (
                        <Grid item xs={12}>
                          <InputLabel>Capabilities (Optional)</InputLabel>
                          <OutlinedInput fullWidth {...register('capabilities')} />
                        </Grid>
                      )}
                    </Grid>
                    <Button type="submit" variant="contained" disabled={isLoading}>
                      {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Search Numbers'}
                    </Button>
                  </Stack>
                </form>
              )}

              {searchResults.length > 0 && (
                <Stack sx={{ gap: 2 }}>
                  <InputLabel>Available Numbers</InputLabel>
                  {searchResults.map((num) => (
                    <Stack key={num.phoneNumber} direction="row" justifyContent="space-between" sx={{ borderBottom: '1px solid gray', padding: 1 }}>
                      <ListItemText primary={`${num.phoneNumber} (${num.countryCode})`} />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => buyNumberMutation.mutate(num.phoneNumber)}
                        disabled={buyNumberMutation.isPending}
                      >
                        {buyNumberMutation.isPending ? <CircularProgress size={15} /> : 'Buy'}
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Stack>
          </>
        }
        footer={
          <Stack direction="row" sx={{ width: 1, justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
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
        <Alert severity={snackbar?.severity} variant="filled">
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

AddNewNumber.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
