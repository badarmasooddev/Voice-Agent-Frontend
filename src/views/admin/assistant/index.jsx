
import { useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
//@project
import { AssistantList, NewAssistant, AssistantSidebar, AssistantTab } from '@/sections/assistant';

// @assets
import { IconPlus } from '@tabler/icons-react';

/***************************  Assistant  ***************************/

export default function Assistant() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* <Grid size={12}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6">Assistant</Typography>
          <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
            Add New
          </Button>
          <NewAssistant open={open} onClose={handleClose} />
        </Stack>
      </Grid> */}
      <Grid item xs={3}>
        <AssistantSidebar />
      </Grid>

      <Grid item xs={9}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            minHeight: '200px', // adjust if needed
            textAlign: 'center'
          }}
        >
          <Typography variant="h6">Select an Assistans to continue</Typography>
        </Box>
      </Grid>


    </Grid>
  );
}
