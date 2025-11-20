import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Button, IconButton} from '@mui/material';
import { IconCloudPlus, IconFile, IconLink, IconChevronRight, IconChevronDown, IconTrash } from '@tabler/icons-react';
import MyKnowledgeDrawer from './MyKnowledgeDrawer';
import DocumentPreview from './DocumentPreview';
import { useTheme } from '@mui/material/styles';


import DialogDelete from '../../../components/dialog/DialogDelete';
import {getKnowledgeBaseList, deleteKnowledgeBase  } from "../../../api/knowledgeBaseApi";

const ShowKnowledge = ({ knowledgeBases, onDeleteSuccess}) => { 
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedKnowledge, setSelectedKnowledge] = useState(null);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [knowledgeBase, setKnowledgeBase] = useState([]);

    useEffect(() => {
        setKnowledgeBase(knowledgeBases);
    }, [knowledgeBases]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [docToDelete, setDocToDelete] = useState(null);
    const handleExpand = (doc) => {
        setExpanded((prev) => ({
            ...prev,
            [doc.id]: !prev[doc.id],
        }));
        if (!expanded[doc.id]) {
            setSelectedKnowledge(doc);
            setSelectedDocumentId(doc.id);
        } else {
            setSelectedKnowledge(null);
            setSelectedDocumentId(null);
        }
    };

    const handleCloseDrawer = () => setIsDrawerOpen(false);


            const handleDelete = async (docId) => {
                try {
                    const response = await deleteKnowledgeBase(docId);
                    console.log("Delete API Response:", response);
                    setKnowledgeBase((prev) => prev.filter((doc) => doc.id !== docId));
                    onDeleteSuccess()
                    setIsDialogOpen(false);
                } catch (error) {
                    console.error("Error deleting document:", error);
                }
            };
        

    const handleOpenDialog = (doc) => {
        setDocToDelete(doc);
        setIsDialogOpen(true);
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                    Knowledge Bases
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<IconCloudPlus stroke={2} />}
                    onClick={() => setIsDrawerOpen(true)}
                    sx={{
                        textTransform: "none",
                        bgcolor: theme.palette.mode === "dark" ? "#3333" : "#f3f4f6",
                        border: theme.palette.mode === "dark" ? "1px solid #ffff" : "",
                        color: theme.palette.mode === "dark" ? "white" : "black",
                        "&:hover": { bgcolor: theme.palette.mode === "dark" ? "" : "#e5e7eb" },
                    }}
                >
                    New
                </Button>
            </Box>

            {knowledgeBases.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
                    No knowledge bases available.
                </Typography>
            ) : (
                <List sx={{ mt: 2 }}>
                    {knowledgeBases.map((doc, index) => (
                        <ListItem
                            key={doc.id || index}
                            sx={{
                                bgcolor: theme.palette.mode === "dark" ? "#141415" : "#F4FCFF",
                                borderRadius: 1,
                                mb: 1,
                                transition: "background-color 0.2s ease-in-out",
                                "&:hover": { bgcolor: theme.palette.mode === "dark" ? "#3c3c3c" : "#E8F4FC" },
                            }}
                        >
                            <ListItemIcon>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        bgcolor: theme.palette.mode === "dark" ? "#3c3c3c" : "#E8F4FC",
                                    }}
                                >
                                    {doc.type === "file" ? (
                                        <IconFile size={24} color={theme.palette.text.primary} />
                                    ) : (
                                        <IconLink size={24} color={theme.palette.text.primary} />
                                    )}
                                </Box>
                            </ListItemIcon>
                            <ListItemText
                                sx={{ ml: 1.5 }}
                                primary={
                                    <Typography variant="body2" fontWeight="bold">
                                        {doc.name}
                                    </Typography>
                                }
                            />
                            <IconButton
                                color={theme.palette.mode === "dark" ? "#3c3c3c" : "#E8F4FC"}
                                onClick={() => handleExpand(doc)}
                                size="small"
                                aria-label="expand"
                            >
                                {expanded[doc.id] ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
                            </IconButton>
                            <IconButton
                                color={theme.palette.mode === "dark" ? "#3c3c3c" : "#E8F4FC"}
                                sx={{cursor: "pointer"}}
                                onClick={() => handleOpenDialog(doc)}
                            >
                                <IconTrash size={18}/>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}

            {selectedKnowledge && selectedDocumentId && (
                <DocumentPreview 
                    documentId={selectedDocumentId} 
                    onClose={() => {
                        setSelectedKnowledge(null);
                        setSelectedDocumentId(null);
                        setExpanded((prev) => ({ ...prev, [selectedDocumentId]: false }));
                    }} 
                />
            )}
            <MyKnowledgeDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
            <DialogDelete
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onDelete={() => handleDelete(docToDelete.id)}
            />
        </>
    );
};

export default ShowKnowledge;
