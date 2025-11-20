import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import BottomAudioPlayer from "./BottomAudioPlayer";

const MAX_DESCRIPTION_LENGTH = 85;

const VoiceList = ({ voices = [] }) => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [audioInstance, setAudioInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (audioUrl, voiceId, voiceName) => {
    if (!audioUrl) return;

    if (currentPlaying === voiceId) {
      audioInstance.pause();
      setCurrentPlaying(null);
      setIsPlaying(false);
      return;
    }

    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null);
    }

    const audio = new Audio(audioUrl);
    audio.voiceName = voiceName;
    setAudioInstance(audio);
    setCurrentPlaying(voiceId);
    setIsPlaying(true);

    audio.addEventListener("loadedmetadata", () => audio.play());
    audio.onended = () => {
      setCurrentPlaying(null);
      setIsPlaying(false);
    };
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <>
      <Box p={2}>
        {voices.length > 0 ? (
          voices.map((voice) => {
            const sampleUrl = voice.preview_url;
            const isDisabled = !sampleUrl;

            return (
              <Box
                key={voice.voice_id}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                p={2}
                bgcolor="#F4FCFF"
                borderRadius={2}
                mb={2}
                width="100%"
              >
                <Tooltip title={isDisabled ? "Voice preview does not exist for this voice" : ""}>
                  <span>
                    <IconButton 
                      onClick={() => handlePlayPause(sampleUrl, voice.voice_id, voice.name)} 
                      disabled={isDisabled}
                    >
                      {currentPlaying === voice.voice_id ? <Pause /> : <PlayArrow />}
                    </IconButton>
                  </span>
                </Tooltip>

                <Box ml={1} flex="1">
                  <Typography variant="body2" fontWeight="bold">
                    {voice.name}
                  </Typography>
                  <Typography variant="body2" fontSize="12px" color="text.secondary">
                    {truncateText(voice.description || "No description available", MAX_DESCRIPTION_LENGTH)}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="body1" color="text.secondary">
            No voices available.
          </Typography>
        )}
      </Box>
      {audioInstance && (
        <BottomAudioPlayer
          currentAudio={audioInstance}
          isPlaying={isPlaying}
          onClose={() => setIsPlaying(false)}
        />
      )}
    </>
  );
};

export default VoiceList;
