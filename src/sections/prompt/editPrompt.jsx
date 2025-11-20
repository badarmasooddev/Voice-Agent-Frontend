import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateElevenLabAssistantPrompt, updateAssistant } from '@/api/assistantApi';

// @mui
import { Drawer, Button, Box, Stack, IconButton, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

export default function EditPromptDrawer({ open, onClose, promptData, agentId, assistantId, refetch }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_message: promptData?.first_message || '',
            prompt: promptData?.prompt || '',
        },
    });

    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (promptData) {
            reset(promptData);
        }
    }, [promptData, reset]);

    const updateElevenLabsMutation = useMutation({
        mutationFn: (updatedData) => {
            if (!agentId) throw new Error("Agent ID is missing.");
            return updateElevenLabAssistantPrompt(agentId, updatedData);
        },
    });

    const updateBackendMutation = useMutation({
        mutationFn: (updatedData) => {
            if (!assistantId) throw new Error("Assistant ID is missing.");
            return updateAssistant(updatedData, assistantId);
        },
    });

    const isUpdating = updateElevenLabsMutation.isPending || updateBackendMutation.isPending;

    const onSubmit = async (data) => {
        try {
            const elevenLabsUpdateData = {
                first_message: data.first_message,
                prompt: data.prompt,
            };

            const backendUpdateData = {
                name: promptData?.name,
                agentPrompt: data.prompt,
                greeting: data.first_message,
            };

            await updateElevenLabsMutation.mutateAsync(elevenLabsUpdateData);
            await updateBackendMutation.mutateAsync(backendUpdateData);

            setToast({ open: true, message: "Prompt updated successfully!", severity: "success" });

            refetch();
            onClose();
        } catch (error) {
            console.error("Error updating assistant:", error.message);
            setToast({ open: true, message: "Failed to update prompt", severity: "error" });
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                width: '600px',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: '600px',
                    height: '100%',
                    padding: '20px',
                },
            }}
        >
            {/* Header */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
                <Typography variant="h6">Edit Prompt</Typography>
                <IconButton onClick={onClose} disabled={isUpdating}>
                    <IconX />
                </IconButton>
            </Stack>

            {updateElevenLabsMutation.isError || updateBackendMutation.isError ? (
                <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                    {updateElevenLabsMutation.error?.message || updateBackendMutation.error?.message || "Failed to update assistant."}
                </Typography>
            ) : null}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
                <Stack sx={{ gap: 2.5, height: '100%' }}>
                    {/* First Message Input */}
                    <Box>
                        <InputLabel>First Message</InputLabel>
                        <OutlinedInput
                            fullWidth
                            placeholder="Enter the first message..."
                            error={Boolean(errors.first_message)}
                            {...register('first_message', { required: 'First message is required' })}
                        />
                        {errors.first_message && (
                            <FormHelperText error>{errors.first_message.message}</FormHelperText>
                        )}
                    </Box>

                    {/* Prompt Input */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <InputLabel>Prompt</InputLabel>
                        <OutlinedInput
                            placeholder="Enter the prompt..."
                            multiline
                            minRows={35}
                            maxRows={35}
                            fullWidth
                            sx={{ flex: 1 }}
                            {...register('prompt', { required: 'Prompt is required' })}
                        />
                        {errors.prompt && <FormHelperText error>{errors.prompt.message}</FormHelperText>}
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" color="secondary" onClick={onClose} disabled={isUpdating}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={isUpdating}>
                            {isUpdating ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={20} color="inherit" />
                                    Updating...
                                </Box>
                            ) : "Save Changes"}
                        </Button>
                    </Stack>
                </Stack>
            </form>
            <Snackbar
            open={toast.open}
            autoHideDuration={4000}
            onClose={() => setToast({ ...toast, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
                {toast.message}
            </Alert>
        </Snackbar>
        </Drawer>
    );
}
