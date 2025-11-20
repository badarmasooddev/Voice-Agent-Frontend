import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// @mui
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageLoader from '@/components/PageLoader';

// @project
import EditPromptDrawer from './editPrompt';
import SamplePrompt from './SamplePrompt';
import { getAssistantById, getElevenLabAssistant } from '@/api/assistantApi';

export default function Prompt({ open, handleClose, Open, Close }) {
    const { id: assistantId } = useParams();

    const { data: assistantData, isLoading: isAssistantLoading, isError: isAssistantError } = useQuery({
        queryKey: ['assistant', assistantId],
        queryFn: () => getAssistantById(assistantId),
        enabled: !!assistantId,
    });

    const agentId = assistantData?.data.agentId;

    const { data: agentData, isLoading: isAgentLoading, isError: isAgentError, refetch } = useQuery({
        queryKey: ['elevenLabAssistant', agentId],
        queryFn: () => getElevenLabAssistant(agentId),
        enabled: !!agentId,
    });

    const firstMessage = agentData?.data?.conversation_config?.agent?.first_message || "Loading...";
    const prompt = agentData?.data?.conversation_config?.agent?.prompt?.prompt || "Loading...";

    return (
        <>
            {(isAssistantLoading || isAgentLoading) ? (
                <PageLoader />
            ) : (isAssistantError || isAgentError) ? (
                <Typography color="error">Failed to load assistant or agent details.</Typography>
            ) : (
                <Stack sx={{ gap: 2.5, height: '100%' }}>
                    <Box>
                        <InputLabel>First Message</InputLabel>
                        <OutlinedInput fullWidth value={firstMessage} disabled />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel>Prompt</InputLabel>
                        <OutlinedInput
                            value={prompt}
                            multiline
                            minRows={30}
                            maxRows={30}
                            fullWidth
                            disabled
                        />
                    </Box>
                </Stack>
            )}

            <EditPromptDrawer
                open={open}
                onClose={handleClose}
                assistantId={assistantId}
                agentId={agentId}
                promptData={{ _id: assistantData?.data?._id, name: assistantData?.data?.name, first_message: firstMessage, prompt }}
                refetch={refetch}
            />
            <SamplePrompt
                Open={Open}
                Close={Close}
            />
        </>
    );
}
