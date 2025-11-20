import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  OutlinedInput,
  Box,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
  Slide,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { ModalSize } from "@/enum";
import Modal from "@/components/Modal";
import Contact from "@/components/Contact";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeCall } from "@/api/callAgentApi";
import { useConversation } from "@11labs/react";
import { Conversation } from "@11labs/client";
import {
  IconMicrophoneFilled,
  IconMicrophoneOff,
  IconVolumeOff,
  IconVolume,
} from "@tabler/icons-react";

const LiveCallModal = ({ open, onClose, agentId }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [conversation, setConversation] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  //   const conversation = useConversation();

  //   const { status, isSpeaking } = conversation;

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };
    if (open) {
      requestMicPermission();
    }
  }, [open]);
  const getElevenLabsSignedUrl = async (agentId) => {
    try {
      const requestHeaders = new Headers();
      requestHeaders.set(
        "xi-api-key",
        "sk_ccc8d0f2a017d27da6dde3c8672ec3abc4c8c723465c9a50"
      ); // Ensure you have this in your .env

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
        {
          method: "GET",
          headers: requestHeaders,
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching signed URL: ${response.statusText}`);
      }

      const body = await response.json();
      return body.signed_url; // Use this URL for further interactions
    } catch (error) {
      console.error("Failed to get signed URL:", error);
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
          alert("An error occurred during the conversation");
        },
        onModeChange: ({ mode }) => {
          setIsSpeaking(mode === "speaking");
        },
      });
      setConversation(conversation);
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };
  const handleCloseModel = async () => {
    if (open) {
      onClose()
      isConnected && await handleEndConversation()
    }
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModel}
        maxWidth={ModalSize.MD}
        header={{ title: "Make Call", closeButton: true }}
        modalContent={
          <Card sx={{ maxWidth: 500, mx: "auto" }}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Voice Chat
                  <IconButton
                    onClick={toggleMute}
                    disabled={isConnected}
                    color="default"
                  >
                    {isMuted ? <IconVolumeOff /> : <IconVolumeOff />}
                  </IconButton>
                </Typography>
              }
            />

            <CardContent>
              <div style={{ textAlign: "center" }}>
                {isConnected ? (
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleEndConversation}
                    startIcon={<IconMicrophoneOff />}
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
                  >
                    Start Conversation
                  </Button>
                )}

                <Typography variant="body2" sx={{ mt: 2 }}>
                  {isConnected &&
                    (isSpeaking ? "Agent is speaking..." : "Listening...")}
                  {errorMessage && (
                    <Typography color="error">{errorMessage}</Typography>
                  )}
                  {!hasPermission && (
                    <Typography color="warning">
                      Please allow microphone access to use voice chat
                    </Typography>
                  )}
                </Typography>
              </div>
            </CardContent>

            <CardActions sx={{ justifyContent: "center" }}></CardActions>
          </Card>
        }
        footer={
          <Stack
            direction="row"
            sx={{ width: 1, justifyContent: "space-between", gap: 2 }}
          >
            <Button variant="outlined" color="secondary" onClick={handleCloseModel}>
              Cancel
            </Button>
            {/* <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                            Call
                        </Button> */}
          </Stack>
        }
      />
      {/* <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
                open={snackbar?.open}
                autoHideDuration={2500}
                onClose={handleCloseSnackbar}
            >
                <Alert severity={snackbar?.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar?.message}
                </Alert>
            </Snackbar> */}
    </>
  );
};

export default LiveCallModal;
