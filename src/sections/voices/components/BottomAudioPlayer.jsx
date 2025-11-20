import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Slider } from "@mui/material";
import { PlayArrow, Pause, Replay10, Download, ExpandLess } from "@mui/icons-material";

const BottomAudioPlayer = ({ currentAudio, isPlaying, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!currentAudio) return;

    const updateProgress = () => setProgress(currentAudio.currentTime);
    const updateDuration = () => setDuration(currentAudio.duration);

    currentAudio.addEventListener("timeupdate", updateProgress);
    currentAudio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      currentAudio.removeEventListener("timeupdate", updateProgress);
      currentAudio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentAudio]);

  useEffect(() => {
    if (isPlaying) setExpanded(true);
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (!currentAudio) return;
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  };

  if (!expanded) return null;

  return (
        <Box
        position="fixed"
        bottom={0}
        right="400px"
        transform="translateX(-50%)"
        width="100vw"
        maxWidth="600px"
        bgcolor="white"
        boxShadow={2}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        zIndex={1000}
        >
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1}>
        <Box>
          <Typography fontWeight="bold" fontSize="14px">
            {currentAudio?.voiceName || "Voice Preview"}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Default voice preview
          </Typography>
        </Box>
        <IconButton onClick={() => { setExpanded(false); onClose(); }} size="small">
          <ExpandLess fontSize="small" />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} pt={1}>
        <Typography variant="caption">{Math.round(progress)}s</Typography>
        <Slider
          value={progress}
          min={0}
          max={duration}
          onChange={(_, value) => (currentAudio.currentTime = value)}
          sx={{ flex: 1, mx: 1 }}
        />
        <Typography variant="caption">{Math.round(duration)}s</Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => (currentAudio.currentTime -= 10)} size="small">
            <Replay10 fontSize="small" />
          </IconButton>
          <IconButton onClick={togglePlayPause} size="small">
            {currentAudio?.paused ? <PlayArrow fontSize="small" /> : <Pause fontSize="small" />}
          </IconButton>
          <IconButton href={currentAudio?.src} download size="small">
            <Download fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomAudioPlayer;
