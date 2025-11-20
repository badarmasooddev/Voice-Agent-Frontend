import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { IconFolderUp } from '@tabler/icons-react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageLoader from '@/components/PageLoader';
import MyKnowledgeDrawer from './components/MyKnowledgeDrawer';
import ShowKnowledge from './components/ShowKnowledge';
import { getKnowledgeBaseList } from "../../api/knowledgeBaseApi";

const CreateKnowledge = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient(); 

  const { data: knowledgeBases = [], isLoading, error } = useQuery({
    queryKey: ["knowledgeBases"],
    queryFn: async () => {
      const response = await getKnowledgeBaseList();
      console.log("get Kb data>>", response.data);
      if (response.status === "success" && response.data?.documents) {
        return response.data.documents;
      }
      throw new Error("Invalid API response format");
    },
    staleTime: 0,
    cacheTime: 0,
    retry: 2,
  });

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries(["knowledgeBases"]); // Force re-fetch
  };

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography color="error">Failed to load knowledge bases.</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (knowledgeBases.length > 0) {
    return (
      <>
        <ShowKnowledge knowledgeBases={knowledgeBases} onDeleteSuccess={handleDeleteSuccess} />
        <MyKnowledgeDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
      </>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f9fafb"
    >
      <Box
        width={60}
        height={60}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        bgcolor="#f3f4f6"
        mb={2}
      >
        <IconFolderUp stroke={2} style={{ fontSize: "2rem", color: '#333' }} />
      </Box>
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        Start Building Your Knowledge Base
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        Centralize your information and resources
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#1f2937",
          color: "#fff",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": { bgcolor: "#111827" },
        }}
        onClick={handleOpenDrawer}
      >
        Get Started
      </Button>
      
      <MyKnowledgeDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
    </Box>
  );
};

export default CreateKnowledge;