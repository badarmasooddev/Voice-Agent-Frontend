import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import PageLoader from '@/components/PageLoader';
import { useQuery } from "@tanstack/react-query";
import { getKnowledgeBaseById } from "../../../api/knowledgeBaseApi";

const DocumentPreview = ({ documentId, onClose }) => {
    const { data: documentData, error, isLoading } = useQuery({
        queryKey: ["knowledgeBase", documentId],
        queryFn: () => getKnowledgeBaseById(documentId),
        enabled: !!documentId,  
    });

    if (isLoading) {
        return (
        <PageLoader />
      );
    }

    if (error) {
        return (
            <Drawer anchor="right" open={true} onClose={onClose}>
                <Box sx={{ width: 600, p: 3 }}>
                    <Typography variant="h6">Error loading document</Typography>
                </Box>
            </Drawer>
        );
    }

    const extractedHtml = documentData?.data?.extracted_inner_html;
    const documentName = documentData?.data?.name;
    const documentIdText = documentData?.data?.id;

    return (
        <Drawer anchor="right" open={true} onClose={onClose}>
            <Box sx={{ width: 600, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                    <Box>
                        <Typography variant="h6">{documentName}</Typography>
                        <Typography variant="body2" color="textSecondary">{documentIdText}</Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <IconX />
                    </IconButton>
                </Box>

                <Box sx={{ display: "flex", gap: 2, px: 2, borderBottom: "2px solid #ddd" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold", borderBottom: "2px solid black", pb: 1 }}>
                        Content
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Extracted content
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        The following text will be passed to the LLM model for reference during the conversation.
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: "#f8f9fa",
                            padding: 2,
                            borderRadius: "5px",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "14px",
                            lineHeight: "1.6",
                            border: "1px solid #ddd",
                            maxHeight: "400px",
                            overflowY: "auto",
                        }}
                    >
                        <Typography variant="body2" component="div">
                            <div dangerouslySetInnerHTML={{ __html: extractedHtml }} />
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default DocumentPreview;
