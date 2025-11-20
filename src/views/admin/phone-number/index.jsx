
import { useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//@project
import { NumberList, NewNumber } from '@/sections/phone-number';

// @assets
import { IconPlus } from '@tabler/icons-react';

/***************************  PhoneNumber  ***************************/

export default function PhoneNumber() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Phone Number</Typography>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
            Add New
          </Button>
          <NewNumber open={open} onClose={handleClose} />
        </Stack>
      </Grid>
      <Grid size={12}>
        <NumberList />
      </Grid>
    </Grid>
  );
}
