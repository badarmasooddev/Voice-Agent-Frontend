import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Stack,
  Divider,
  Slider,
  Snackbar,
  Alert,
  CircularProgress,
  Button
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from "@tanstack/react-query";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { getElevenLabAllVoices, updateElevenLabAssistantVoice } from "@/api/assistantApi";

export default function Voice({ data, onSubmit }) {
  const [language, setLanguage] = useState("English");
  const [selectedVoice, setSelectedVoice] = useState("");

  const [maxDuration, setMaxDuration] = useState(60);

  const [optimize_streaming_latency, setStreamingLatency] = useState(3);
  const [stability, setStability] = useState(0.5);
  const [speed, setSpeed] = useState(1.0);
  const [similarity_boost, setSimilarity] = useState(0.5);
  const [loadingVoiceId, setLoadingVoiceId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const {
    handleSubmit,
    reset,
  } = useForm();

  const { data: voices = [], isLoading, error } = useQuery({
    queryKey: ["voices"],
    queryFn: getElevenLabAllVoices,
  });

  if (error) {
    console.error("Error fetching voices:", error);
  }

  useEffect(() => {
    if (data) {
      setSelectedVoice(data.conversation_config.tts.voice_id || "");
      setLanguage(data.conversation_config.agent.language || "English");
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setSelectedVoice(data.conversation_config.tts.voice_id || "");
      setLanguage(data.conversation_config.agent.language || "English");
      setStreamingLatency(data.conversation_config.tts.optimize_streaming_latency || 3);
      setStability(data.conversation_config.tts.stability || 0.5);
      setSpeed(data.conversation_config.tts.speed || 1.0);
      setSimilarity(data.conversation_config.tts.similarity_boost || 0.5);
      setMaxDuration(data.conversation_config.conversation.max_duration_seconds || 60);

      reset({
        voice_id: data.conversation_config.tts.voice_id || "",
        language: data.conversation_config.agent.language || "English",
        optimize_streaming_latency: data.conversation_config.tts.optimize_streaming_latency || 3,
        stability: data.conversation_config.tts.stability || 0.5,
        speed: data.conversation_config.tts.speed || 1.0,
        similarity_boost: data.conversation_config.tts.similarity_boosts || 0.5,
        max_duration: data.conversation_config.conversation.max_duration_seconds || 60,
      });
    }
  }, [data, reset]);

  const playSound = async (url, voiceId) => {
    setLoadingVoiceId(voiceId);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => setLoadingVoiceId(null);
  };

  const handleFormSubmit = async () => {
    setSaving(true);
    const agentLanguage = language || data?.conversation_config?.agent?.language || "en";
    const modelId = agentLanguage === "en" ? "eleven_turbo_v2_5" : "eleven_flash_v2_5";

    const updateData = {
      conversation_config: {
        tts: {
          model_id: modelId,
          voice_id: selectedVoice,
          language: agentLanguage,
          optimize_streaming_latency: optimize_streaming_latency ?? 3,
          stability: stability ?? 0.5,
          speed: speed ?? 1.0,
          similarity_boost: similarity_boost ?? 0.8,
        },
        conversation: { max_duration_seconds: maxDuration ?? 300 },
        agent: { language: agentLanguage },
      }
    };
    try {
      await updateElevenLabAssistantVoice(data.agent_id, updateData);
      if (onSubmit) onSubmit(updateData);
      setToast({ open: true, message: "Settings updated successfully!", severity: "success" });
    } catch (error) {
      console.error("Error updating assistant:", error);
      setToast({ open: true, message: "Failed to update settings.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={8}>
          <Accordion defaultExpanded>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography fontWeight="bold">Voice Configurations</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure the language and voice settings for your assistant.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Language Setting */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Language</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    The language your assistant understands and speaks.
                  </Typography>
                  <FormControl fullWidth>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="ar">Arabic</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="hi">Hindi</MenuItem>
                      <MenuItem value="zh">Chinese</MenuItem>
                      <MenuItem value="ru">Russian</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Voice Setting */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Voice</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select the assistant’s voice.
                  </Typography>
                  <FormControl fullWidth>
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                        {voices.map((voice) => (
                          <MenuItem key={voice.voice_id} value={voice.voice_id}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                playSound(voice.preview_url, voice.voice_id);
                              }}
                              disabled={!voice.preview_url || loadingVoiceId === voice.voice_id}
                            >
                              {loadingVoiceId === voice.voice_id ? <CircularProgress size={18} /> : <IconPlayerPlayFilled />}
                            </IconButton>
                            {voice.name} - {voice.labels?.accent || "Neutral"} ({voice.labels?.gender || "Unknown"})
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Divider />

          <Accordion defaultExpanded>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography fontWeight="bold">Advanced Configurations</Typography>
                <Typography variant="body2" color="text.secondary">
                  Fine-tune your assistant's behavior and performance.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Max Conversation Duration */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Max Conversation Duration</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    The maximum number of seconds that a conversation can last.
                  </Typography>
                  <TextField
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{
                      maxWidth: "120px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                {/* Optimize Streaming Latency */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Optimize Streaming Latency</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Adjust latency for speed vs. quality trade-off.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Slider
                      value={optimize_streaming_latency}
                      step={1}
                      min={0}
                      max={4}
                      onChange={(e, newValue) => setStreamingLatency(newValue)}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography mt={0.8} variant="body2" color="textSecondary">
                      {optimize_streaming_latency.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Stability */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Stability</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Higher values ensure consistency; lower values add expressiveness but may cause instability.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Slider
                      value={stability}
                      step={0.05}
                      min={0}
                      max={1}
                      onChange={(e, newValue) => setStability(newValue)}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography mt={0.8} variant="body2" color="textSecondary">
                      {stability.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Speed */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Speed</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Controls speech rate; values above 1.0 speed up, below 1.0 slow down.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Slider
                      value={speed}
                      step={0.01}
                      min={0.7}
                      max={1.2}
                      onChange={(e, newValue) => setSpeed(newValue)}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography mt={0.8} variant="body2" color="textSecondary">
                      {speed.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Similarity */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Similarity</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Higher values improve clarity but may introduce artifacts.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Slider
                      value={similarity_boost}
                      step={0.05}
                      min={0}
                      max={1}
                      onChange={(e, newValue) => setSimilarity(newValue)}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography mt={0.8} variant="body2" color="textSecondary">
                      {similarity_boost.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Divider />

          <Button onClick={handleFormSubmit} variant="contained" color="primary">
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const SettingRow = ({ title, description, children }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 400 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </Box>
    <Box sx={{ flex: 1.5 }}>{children}</Box>
    <Divider />
  </Stack>
);
