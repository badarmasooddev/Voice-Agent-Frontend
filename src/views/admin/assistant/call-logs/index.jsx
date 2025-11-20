
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//@project
import { CallLogs } from '@/sections/call-logs';

// @assets
import { IconPlus } from '@tabler/icons-react';

/***************************  Assistant  ***************************/

export default function CallLog() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid size={12}>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h6">Call Logs</Typography>
                    {/* <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
                        Add New
                    </Button> */}
                    {/* <NewAssistant open={open} onClose={handleClose} /> */}
                </Stack>
            </Grid>
            <Grid size={12}>
                <CallLogs assistantId={id}/>
            </Grid>
        </Grid>
    );
}
