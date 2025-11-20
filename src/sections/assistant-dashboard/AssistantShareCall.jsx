import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Snackbar,
} from '@mui/material';

// @table react icon
import {
  IconMicrophoneFilled,
  IconMicrophoneOff,
  IconVolumeOff,
  IconVolume,
  IconLinkPlus,
} from '@tabler/icons-react';

// @projects
import { Conversation } from '@11labs/client';
import AiVideo from "../../assets/ai-voice-video/ai-voice.mp4";

const AssistantShareCall = () => {
  const { agent_id: agentId } = useParams();

  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [conversation, setConversation] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage('Microphone access denied');
        console.error('Error accessing microphone:', error);
      }
    };
    requestMicPermission();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isSpeaking) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isSpeaking]);

  const getElevenLabsSignedUrl = async (agentId) => {
    try {
      const requestHeaders = new Headers();
      requestHeaders.set('xi-api-key', 'sk_ccc8d0f2a017d27da6dde3c8672ec3abc4c8c723465c9a50');

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
        { method: 'GET', headers: requestHeaders }
      );

      if (!response.ok) {
        throw new Error(`Error fetching signed URL: ${response.statusText}`);
      }

      const body = await response.json();
      return body.signed_url;
    } catch (error) {
      console.error('Failed to get signed URL:', error);
      return null;
    }
  };

  const handleStartConversation = async () => {
    const urlAgent = await getElevenLabsSignedUrl(agentId);
    try {
      const conversation = await Conversation.startSession({
        signedUrl: urlAgent,
        onConnect: () => {
          setIsConnected(true);
          setIsSpeaking(true);
        },
        onDisconnect: () => {
          setIsConnected(false);
          setIsSpeaking(false);
        },
        onError: (error) => {
          console.log(error);
          alert('An error occurred during the conversation');
        },
        onModeChange: ({ mode }) => {
          setIsSpeaking(mode === 'speaking');
        },
      });
      setConversation(conversation);
    } catch (error) {
      setErrorMessage('Failed to start conversation');
      console.error('Error starting conversation:', error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage('Failed to end conversation');
      console.error('Error ending conversation:', error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage('Failed to change volume');
      console.error('Error changing volume:', error);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          mx: 'auto',
          my: 10,
          borderRadius: 4,
          boxShadow: 4,
          p: 2,
          backgroundColor: '#fdfdfd',
        }}
      >
        <CardHeader
          title={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Teralead AI Assistant</Typography>
              <IconButton onClick={toggleMute} disabled={!isConnected}>
                {isMuted ? <IconVolumeOff /> : <IconVolume />}
              </IconButton>
            </Box>
          }
        />

        <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Interact with your AI assistant in real time using your voice. Click below to begin the conversation.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <video
              ref={videoRef}
              src={AiVideo}
              width="100%"
              height="auto"
              muted
              loop
              autoPlay
              style={{ borderRadius: '16px', maxHeight: 280, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
          </Box>

          {isConnected ? (
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleEndConversation}
              startIcon={<IconMicrophoneOff />}
              sx={{ mt: 1, fontWeight: 'bold' }}
            >
              End Conversation
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleStartConversation}
              disabled={!hasPermission}
              startIcon={<IconMicrophoneFilled />}
              sx={{ mt: 1, fontWeight: 'bold' }}
            >
              Start Conversation
            </Button>
          )}

          <Typography variant="body2" mt={3} color="text.primary">
            {isConnected
              ? isSpeaking
                ? '🗣️ Agent is speaking...'
                : '🎧 Listening...'
              : 'Click the button above to start your conversation.'}
          </Typography>

          {errorMessage && (
            <Typography color="error" mt={1}>
              {errorMessage}
            </Typography>
          )}

          {!hasPermission && (
            <Typography color="warning.main" mt={1}>
              🚫 Please allow microphone access to use voice chat
            </Typography>
          )}
        </CardContent>
      </Card>


      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default AssistantShareCall;
