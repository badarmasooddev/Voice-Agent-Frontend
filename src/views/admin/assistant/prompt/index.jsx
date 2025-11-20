import { useState } from 'react';
import { useParams } from 'react-router-dom';

// @mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { Prompt } from '@/sections/prompt';

// @assets
import { IconEdit, IconTemplate } from '@tabler/icons-react';

/***************************  Assistant Prompt Page  ***************************/

export default function AssistantPromptPage() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [openSample, setOpenSample] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // sample prompt
    const handleOpen_2 = () => setOpenSample(true);
    const handleClose_2 = () => setOpenSample(false);

    return (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid size={12}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Prompt</Typography>
                    <Stack direction="row" sx={{ gap: 2 }}>
                        <Button variant="contained" startIcon={<IconTemplate size={16} />} onClick={handleOpen_2}>
                            Sample Prompt
                        </Button>
                        <Button variant="contained" startIcon={<IconEdit size={16} />} onClick={handleOpen}>
                            Edit Prompt
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
            <Grid size={12}>
                <Prompt open={open} handleClose={handleClose} assistantId={id} Open={openSample} Close={handleClose_2} />
            </Grid>
        </Grid>
    );
}
