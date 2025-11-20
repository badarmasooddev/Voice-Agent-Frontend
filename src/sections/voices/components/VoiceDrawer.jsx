import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Drawer,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Snackbar,
  Alert,
  List,
  ListItem,
  Avatar,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createVoicePreview, saveVoicePreview } from "../../../api/assistantApi";
import { PlayArrow, Pause } from "@mui/icons-material";

const VoiceDrawer = ({ open, onClose, onVoiceCreated  }) => {
  const [voiceDescription, setVoiceDescription] = useState("");
  const [textContent, setTextContent] = useState("");
  const [generatedVoices, setGeneratedVoices] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceName, setVoiceName] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const generateVoiceMutation = useMutation({
    mutationFn: async (voiceData) => createVoicePreview(voiceData),
    onSuccess: (data) => {
      setGeneratedVoices(data);
      setToast({ open: true, message: "Voice created successfully!", severity: "success" });
      onVoiceCreated(); 
    },
    onError: (error) => {
      console.error("Error creating voice:", error);
      setToast({ open: true, message: "Failed to create voice", severity: "error" });
    },
  });

  const saveVoiceMutation = useMutation({
    mutationFn: async (voiceData) => saveVoicePreview(voiceData),
    onSuccess: () => {
      setToast({ open: true, message: "Voice saved successfully!", severity: "success" });
      onClose();
    },
    onError: (error) => {
      console.error("Error saving voice:", error);
      setToast({ open: true, message: "Failed to save voice", severity: "error" });
    },
  });

  const validateFields = () => {
    const newErrors = {};
  
    if (!voiceDescription.trim()) {
      newErrors.voiceDescription = "Voice Description is required";
    } else if (voiceDescription.length < 20) {
      newErrors.voiceDescription = "Voice Description must be at least 20 characters";
    }
  
    if (!textContent.trim()) {
      newErrors.textContent = "Text Content is required";
    } else if (textContent.length < 100) {
      newErrors.textContent = "Text Content must be at least 100 characters";
    } else if (textContent.length > 1000) {
      newErrors.textContent = "Text Content cannot exceed 1000 characters";
    }
  
    if (selectedVoice && !voiceName.trim()) {
      newErrors.voiceName = "Voice Name is required";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCreateVoice = () => {
    if (!validateFields()) return;
    generateVoiceMutation.mutate({ voice_description: voiceDescription, text: textContent });
  };

  const handlePlayPause = (audioBase64, voice) => {
    if (currentPlaying === voice.generated_voice_id) {
      audioInstance.pause();
      setCurrentPlaying(null);
      return;
    }

    if (audioInstance) audioInstance.pause();

    const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
    audio.play();
    setAudioInstance(audio);
    setCurrentPlaying(voice.generated_voice_id);

    audio.onended = () => setCurrentPlaying(null);
  };

  const handleVoiceSelect = (voice) => {
    setSelectedVoice(voice);
  };

  const handleSaveVoice = () => {
    if (!validateFields() || !selectedVoice) return;
  
    const payload = {
      voice_name: voiceName,
      voice_description: voiceDescription,
      generated_voice_id: selectedVoice.generated_voice_id,
    };  
    saveVoiceMutation.mutate(payload);
  };

  const handleCloseDrawer = () => {
    setVoiceDescription("");
    setTextContent("");
    setGeneratedVoices([]);
    setCurrentPlaying(null);
    setAudioInstance(null);
    setSelectedVoice(null);
    setVoiceName("");
    setErrors({});
    setToast({ open: false, message: "", severity: "success" });
  
    onClose();
  };
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer} 
      sx={{
        width: "420px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "420px",
          height: "100%",
          padding: "20px",
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Generate & Save Voice
        </Typography>
        <IconButton onClick={handleCloseDrawer}>
          <IconX />
        </IconButton>
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <InputLabel sx={{ fontWeight: 500, mt: 1 }}>Voice Description</InputLabel>
        <FormControl fullWidth error={Boolean(errors.voiceDescription)} sx={{ mb: 2 }}>
          <OutlinedInput
            value={voiceDescription}
            onChange={(e) => setVoiceDescription(e.target.value)}
            placeholder="Describe the voice (e.g., deep, raspy, British accent)"
            multiline
          />
          {errors.voiceDescription && <FormHelperText>{errors.voiceDescription}</FormHelperText>}
        </FormControl>

        <InputLabel sx={{ fontWeight: 500 }}>Text to Speak</InputLabel>
        <FormControl fullWidth error={Boolean(errors.textContent)}>
          <OutlinedInput
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter the text you want to convert to voice"
            multiline
            rows={6}
          />
          {errors.textContent && <FormHelperText>{errors.textContent}</FormHelperText>}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCreateVoice} disabled={generateVoiceMutation.isPending}>
            {generateVoiceMutation.isPending ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Generate Voice"}
          </Button>
        </Box>

        {generatedVoices.length > 0 && (
          <Box sx={{ mt: 4, bgcolor: "#FFF", p: 2, borderRadius: "8px", boxShadow: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Select Voice
            </Typography>
            <List>
              {generatedVoices.map((voice) => (
                <ListItem
                  key={voice.generated_voice_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    mb: 1,
                    p: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={selectedVoice?.generated_voice_id === voice.generated_voice_id} onChange={() => handleVoiceSelect(voice)} />
                  <Avatar onClick={() => handlePlayPause(voice.audio_base_64, voice)}>
                    {currentPlaying === voice.generated_voice_id ? <Pause /> : <PlayArrow />}
                  </Avatar>
                  <Typography>{voice.duration_secs.toFixed(2)} sec</Typography>
                </ListItem>
              ))}
            </List>

            {selectedVoice && (
              <Box sx={{ mt: 2 }}>
                <InputLabel sx={{ fontWeight: 500, mt: 1 }}>Voice Name</InputLabel>
                <FormControl fullWidth error={Boolean(errors.voiceName)} sx={{ mb: 2 }}>
                  <OutlinedInput
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    placeholder="Enter a name for this voice"
                  />
                  {errors.voiceName && <FormHelperText>{errors.voiceName}</FormHelperText>}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSaveVoice}
                  sx={{ mt: 2 }}
                  disabled={!voiceName.trim()}
                >
                  {saveVoiceMutation.isPending ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Save Voice"}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
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

    </Drawer>
  );
};

export default VoiceDrawer;
