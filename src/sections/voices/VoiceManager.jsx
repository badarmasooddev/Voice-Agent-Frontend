import React, { useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IconCloudPlus } from "@tabler/icons-react";
import { getElevenLabVoices } from "../../api/assistantApi";
import PageLoader from "@/components/PageLoader";
import VoiceList from "./components/VoicesList";
import VoiceDrawer from "./components/VoiceDrawer";

const VoiceManager = () => {
  const { data: voices = [], isLoading, error, refetch } = useQuery({
    queryKey: ["elevenLabVoices"],
    queryFn: getElevenLabVoices,
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortedVoices = useMemo(() => {
    return [...voices].sort((a, b) => b.created_at_unix - a.created_at_unix);
  }, [voices]);

  const handleNewVoice = () => {
    refetch();
  };

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography color="error">Failed to load voices.</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">Available Voices</Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<IconCloudPlus stroke={2} />}
          color="primary"
          onClick={() => setDrawerOpen(true)}
          sx={{
            textTransform: "none",
            mr: "15px",
            bgcolor: "#f3f4f6",
            color: "black",
            "&:hover": { bgcolor: "#e5e7eb" },
          }}
        >
          Add a Voice
        </Button>
      </Box>

      <VoiceList voices={sortedVoices} />
      <VoiceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onVoiceCreated={handleNewVoice} />
    </Box>
  );
};

export default VoiceManager;
