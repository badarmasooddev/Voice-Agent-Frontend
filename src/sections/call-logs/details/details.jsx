import React, { useCallback, useEffect, useState } from 'react';
import { Select, MenuItem, Drawer, Stack, IconButton, Typography, Tabs, Tab, Box, Chip, Divider, Button, CircularProgress } from '@mui/material';
import { IconX, IconDownload, IconCircleCheck, IconClock, IconCancel } from '@tabler/icons-react';
import { useTheme } from "@mui/material/styles";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {getElevenLabConversationDetails, getElevenLabConversationRecording, transcribeBlobRecording, transcribeDeepGramBlobRecording } from '@/api/callLogs';
import { analyzeSentiment, analyzePerformanceReview, analyzeObjectionHandling, analyzeCallOutcome } from '@/api/analysisApi';
import { getAssistantById } from '@/api/assistantApi';
import PageLoader from '@/components/PageLoader';

export default function DetailsLog({ open, onClose, selectedData }) {
    const { id: assistantId } = useParams();
    const theme = useTheme();
    const [tab, setTab] = useState('Overview');
    const [recordingUrl, setRecordingUrl] = useState(null);

    const [generatedTranscript, setGeneratedTranscript] = useState([]);
    const [loadingTranscript, setLoadingTranscript] = useState(false);

    const [sentiment, setSentiment] = useState(null);
    const [performanceReview, setPerformanceReview] = useState(null);
    const [objectionHandling, setObjectionHandling] = useState(null);
    const [callOutcome, setCallOutcome] = useState(null);
    const [isAnalysisFetched, setIsAnalysisFetched] = useState(false);
    const [transcriptionModel, setTranscriptionModel] = useState();

    const [isTranscriptGenerated, setIsTranscriptGenerated] = useState(false);

    const [loading, setLoading] = useState(false);

    const { data: conversationDetails } = useQuery({
        queryKey: ['conversationDetails', selectedData?.id],
        queryFn: () => getElevenLabConversationDetails(selectedData?.id),
        enabled: !!selectedData?.id,
    });

    const transcript = conversationDetails?.data?.transcript || [];
   
    useEffect(() => {
        const fetchAssistantData = async () => {
            if (assistantId) {
                try {
                    const assistantDetails = await getAssistantById(assistantId);
                    setTranscriptionModel(assistantDetails?.data?.transcriptionModel);
                } catch (error) {
                    console.error("Error fetching assistant details:", error);
                }
            }
        };
    
        fetchAssistantData();
    }, [assistantId]);

    useEffect(() => {
        if (selectedData?.id) {
            getElevenLabConversationRecording(selectedData.id)
                .then((data) => setRecordingUrl(data))
                .catch((error) => console.error("Error fetching recording:", error));
        }
    }, [selectedData?.id]);

    useEffect(() => {
        if (!open || !selectedData?.id) {
            setGeneratedTranscript([]);
            setIsTranscriptGenerated(false);
            setIsAnalysisFetched(false);
        }
    }, [open, selectedData?.id]);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleDownload = () => {
        if (recordingUrl) {
            const link = document.createElement("a");
            link.href = recordingUrl;
            link.download = `recording_${selectedData?.id}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const renderStatusChip = (status) => {
        switch (status) {
            case 'done':
                return <Chip label="Completed" color="success" icon={<IconCircleCheck />} />;
            case 'processing':
                return <Chip label="Processing" color="warning" icon={<IconClock />} />;
            case 'failed':
                return <Chip label="Failed" color="error" icon={<IconCancel />} />;
            default:
                return <Chip label="Unknown" color="default" />;
        }
    };

    const handleGenerateTranscript = async () => {
        if (!recordingUrl) return;
    
        setLoadingTranscript(true);
        setGeneratedTranscript([]);
    
        try {
            let response;
                
            if (transcriptionModel === "Deepgram") {
                response = await transcribeDeepGramBlobRecording(recordingUrl);
                const extractedTranscript = response?.data?.conversation?.conversations || [];
                if (extractedTranscript.length > 0) {
                    setGeneratedTranscript(extractedTranscript);
                    setIsTranscriptGenerated(true);
                } else {
                    console.error("No transcript data returned from DeepGram");
                    setGeneratedTranscript([]);
                }
            } else if (transcriptionModel === "Whisper") {
                response = await transcribeBlobRecording(recordingUrl);
                const extractedTranscript = response?.data?.conversations || [];
                if (extractedTranscript.length > 0) {
                    setGeneratedTranscript(extractedTranscript);
                    setIsTranscriptGenerated(true);
                } else {
                    console.error("No transcript data returned from Whisper");
                    setGeneratedTranscript([]);
                }
            } else {
                console.error("Unknown transcription model:", transcriptionModel);
            }
        } catch (error) {
            console.error("Error generating transcript:", error);
            setGeneratedTranscript([]);
        }
        
        setLoadingTranscript(false);
    };
      
    const handleDownloadTranscript = () => {
        if (transcript.length > 0) {
            const transcriptText = transcript.map(entry => `${entry.role.toUpperCase()}: ${entry.message}`).join("\n");
            const blob = new Blob([transcriptText], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `transcript_${selectedData?.id}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const computeConnectionDuration = () => {
        const durationSecs = conversationDetails?.data?.metadata?.call_duration_secs;
        if (!durationSecs) return "N/A";

        return `${Math.floor(durationSecs / 60)}m ${durationSecs % 60}s`;
    };

    const transcriptSummary = conversationDetails?.data?.analysis?.transcript_summary || "No summary available.";

    const dataCollectionResults = conversationDetails?.data?.analysis?.data_collection_results || {};
    const extractedData = Object.keys(dataCollectionResults).map((key) => ({
        name: key,
        value: dataCollectionResults[key]?.value || "N/A",
        rationale: dataCollectionResults[key]?.rationale || "No rationale provided.",
    }));

    const formatTime = (unixSecs) => {
        if (!unixSecs) return "N/A";
        return new Date(unixSecs * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const startTime = conversationDetails?.data?.metadata?.start_time_unix_secs;
    const durationSecs = conversationDetails?.data?.metadata?.call_duration_secs || 0;
    const endTime = startTime ? startTime + durationSecs : null;

    const convertBlobToMP3File = async (blobUrl) => {
        try {
            const response = await fetch(blobUrl);
            const blob = await response.blob();

            if (!blob.type.startsWith("audio/")) {
                throw new Error("Invalid audio file format. Please use a supported format.");
            }

            return new File([blob], "recording.mp3", { type: "audio/mpeg" });
        } catch (error) {
            console.error("Error converting blob to MP3 file:", error);
            throw error;
        }
    };

    const fetchAnalysisData = useCallback(async () => {
        if (isAnalysisFetched) return;

        setLoading(true);
        try {
            const mp3File = await convertBlobToMP3File(recordingUrl);

            const sentimentResult = await analyzeSentiment(mp3File);
            setSentiment(sentimentResult?.data);

            if (assistantId) {
                const assistantDetails = await getAssistantById(assistantId);
                const agentPrompt = assistantDetails?.data?.agentPrompt;
                const performanceReviewResult = await analyzePerformanceReview(mp3File, agentPrompt);
                setPerformanceReview(performanceReviewResult?.data);
                setTranscriptionModel(assistantDetails.data.transcriptionModel)
            }

            const objectionHandlingResult = await analyzeObjectionHandling(mp3File);
            setObjectionHandling(objectionHandlingResult?.data);

            const callOutcomeResult = await analyzeCallOutcome(mp3File);
            setCallOutcome(callOutcomeResult?.data);

            setIsAnalysisFetched(true);

        } catch (error) {
            console.error("Error fetching analysis data:", error);
        }
        setLoading(false);
    }, [recordingUrl, assistantId, isAnalysisFetched]);

    useEffect(() => {
        if (open && tab === "Analysis" && recordingUrl && !isAnalysisFetched) {
            fetchAnalysisData();
        }
    }, [open, tab, recordingUrl, isAnalysisFetched, fetchAnalysisData]);

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
                <Typography variant="h6">Call Details</Typography>
                <IconButton onClick={onClose}>
                    <IconX />
                </IconButton>
            </Stack>

            <Stack sx={{ gap: { xs: 2.5, md: 4 } }}>
                <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={handleChange} aria-label="call logs tabs">
                    <Tab label="Overview" value="Overview" />
                    <Tab label="Details" value="General" />
                    <Tab label="Transcript" value="Transcript" />
                    <Tab label="Recording" value="Recording" />
                    <Tab label="Analysis" value="Analysis" />
                </Tabs>
            </Stack>

            <Stack spacing={2} sx={{ p: 3 }}>
                {tab === "Overview" ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6">Transcript Summary</Typography>
                        <Typography variant="body2">{transcriptSummary}</Typography>
                        <Divider />
                        <Typography variant="h6">Data Collection</Typography>
                        {extractedData.length > 0 ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {extractedData.map((item, index) => (
                                    <Box key={index} sx={{ p: 1, borderRadius: 1, border: "1px solid #e0e0e0" }}>
                                        <Typography variant="body2"><strong>Name:</strong> {item.name}</Typography>
                                        <Typography variant="body2"><strong>Value:</strong> {item.value}</Typography>
                                        <Typography variant="body2"><strong>Rationale:</strong> {item.rationale}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography>No extracted data available.</Typography>
                        )}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Computed Connection Duration</Typography>
                        <Typography variant="body2">{computeConnectionDuration()}</Typography>
                    </Box>
                ) : tab === "General" ? (
                    selectedData ? (
                        <>
                            <Typography variant="body2"><strong>Agent Name:</strong> {selectedData.name}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>To:</strong> {selectedData.contactTo}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>From:</strong> {selectedData.contactFrom}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>Date:</strong> {selectedData.date}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>Start Time:</strong> {formatTime(startTime)}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>End Time:</strong> {formatTime(endTime)}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />

                            <Typography variant="body2"><strong>Status:</strong> {renderStatusChip(selectedData.status)}</Typography>
                            <Divider sx={{ mt: 2, mb: 1 }} />
                        </>
                    ) : (
                        <Typography>No details available.</Typography>
                    )
                ) :    tab === "Transcript" ? (
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box
                            sx={{
                                height: '400px',
                                overflowY: 'auto',
                                backgroundColor: '#f9f9f9',
                                padding: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Box sx={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
                                <IconButton
                                    onClick={handleDownloadTranscript}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        padding: "6px",
                                        "&:hover": { backgroundColor: theme.palette.primary.dark },
                                    }}
                                >
                                    <IconDownload size={18} />
                                </IconButton>
                            </Box>

                            {transcriptionModel && transcriptionModel !== "Elevenlabs" && !isTranscriptGenerated && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleGenerateTranscript}
                                        disabled={loadingTranscript || !recordingUrl}
                                        sx={{ marginTop: 6 }}
                                    >
                                        Generate Transcript
                                    </Button>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    height: "fit-content",
                                    overflowY: "auto",
                                    backgroundColor: "#f9f9f9",
                                    padding: "16px",
                                    borderRadius: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {loadingTranscript ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 6 }}>
                                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                                            Generating Transcript.
                                        </Typography>
                                    </Box>

                                ) : transcriptionModel === "Elevenlabs" && conversationDetails?.data?.transcript?.length > 0 ? (
                                    conversationDetails.data.transcript.map((entry, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                backgroundColor: entry.role === 'agent' ? "#EAEAEA" : "#5A41F5",
                                                color: entry.role === 'agent' ? "#000" : "#fff",
                                                padding: '12px 16px',
                                                borderRadius: entry.role === "agent" ? "18px 18px 18px 6px" : "18px 18px 6px 18px",
                                                maxWidth: "70%",
                                                alignSelf: entry.role === "agent" ? "flex-start" : "flex-end",
                                                border: "1px solid #ccc",
                                                marginBottom: "10px",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontSize: "14px", }}>
                                                {entry.message}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : generatedTranscript.length > 0 ? (
                                    generatedTranscript.map((entry, index) => {
                                        const isAgent = index % 2 === 0;
                                        return (
                                            <Box
                                                key={index}
                                                sx={{
                                                    backgroundColor: isAgent ? "#EAEAEA" : "#5A41F5",
                                                    color: isAgent ? "#000" : "#fff",
                                                    padding: '12px 16px',
                                                    borderRadius: isAgent ? "18px 18px 18px 6px" : "18px 18px 6px 18px",
                                                    maxWidth: "70%",
                                                    alignSelf: isAgent ? "flex-start" : "flex-end",
                                                    border: "1px solid #ccc",
                                                    marginBottom: "10px",
                                                    wordWrap: "break-word",
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                                                    {entry.text}
                                                </Typography>
                                            </Box>
                                        );
                                    })
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 6 }}>
                                        <Typography variant="body2" sx={{ fontSize: "14px" }}>
                                            No transcript available.
                                        </Typography>
                                    </Box>

                                )}
                            </Box>
                        </Box>
                    </Box>
                )
                : tab === "Analysis" ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "200px",
                                    textAlign: "center",
                                    marginTop: "250px",
                                }}
                            >
                                <Typography variant="subtitle" align="center" sx={{ mb: 2 }}>
                                    Hang tight, We are generating the Post Call Analysis for You.
                                </Typography>
                                <PageLoader />
                            </Box>
                        ) : (
                            <>
                                <Typography variant="body1"><strong>Sentiment Analysis</strong></Typography>
                                <Typography variant="body2"><strong>Sentiment:</strong> {sentiment ? sentiment.sentiment : "N/A"}</Typography>
                                <Typography variant="body2"><strong>Emotions:</strong> {sentiment ? sentiment.emotions.join(', ') : "N/A"}</Typography>

                                <Divider />

                                <Typography variant="body1"><strong>Performance Review</strong></Typography>
                                <Typography variant="body2"><strong>Followed Prompt:</strong> {performanceReview ? (performanceReview.followed_prompt ? "Yes" : "No") : "N/A"}</Typography>
                                <Typography variant="body2"><strong>Deviations:</strong> {performanceReview?.deviations?.length > 0 ? performanceReview.deviations.join(', ') : "None"}
                                </Typography>
                                <Typography variant="body2"><strong>Issues:</strong> {performanceReview?.issues?.length > 0 ? performanceReview.issues.join(', ')
                                    : "There were no issues found during performance review."}
                                </Typography>
                                <Typography variant="body2"><strong>Detected Pauses:</strong> {performanceReview?.detected_pauses?.length > 0
                                    ? performanceReview.detected_pauses.join(', ')
                                    : "There were no detected pauses found during performance review."}
                                </Typography>

                                <Divider />

                                <Typography variant="body1"><strong>Objection Handling</strong></Typography>
                                <Typography variant="body2"><strong>Objections Handled:</strong> {objectionHandling ? (objectionHandling.objections_handled ? "Yes" : "No") : "N/A"}</Typography>
                                <Typography variant="body2"><strong>Evaluation:</strong> {objectionHandling ? objectionHandling.evaluation : "N/A"}</Typography>

                                <Divider />

                                <Typography variant="body1"><strong>Call Outcome</strong></Typography>
                                <Typography variant="body2"><strong>Outcome:</strong> {callOutcome ? callOutcome.outcome : "N/A"}</Typography>
                                <Typography variant="body2"><strong>Reason:</strong> {callOutcome ? callOutcome.reason : "N/A"}</Typography>
                            </>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {recordingUrl ? (
                            <Box sx={{ position: 'relative', width: '100%', paddingX: 4, right: "2rem" }}>
                                <audio controls style={{ width: '100%' }}>
                                    <source src={recordingUrl} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <IconButton
                                    variant="contained"
                                    onClick={handleDownload}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '-20px',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.common.white,
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    <IconDownload />
                                </IconButton>
                            </Box>
                        ) : (
                            <Typography>No recording available.</Typography>
                        )}
                    </Box>
                )}
            </Stack>
        </Drawer>
    );
}
