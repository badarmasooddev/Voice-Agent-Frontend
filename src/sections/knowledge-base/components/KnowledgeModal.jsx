import React, { useState } from "react";
import Modal from "@/components/Modal";
import { Box, Typography, TextField, Button, } from "@mui/material";
import { useGlobalState } from '../../../contexts/GlobalStateContext';

const ModalContent = ({ handleClose }) => {
    const [query, setQuery] = useState("");
    const { addKnowledgeBase } = useGlobalState();

    const handleCreate = () => {
        if (query) {
            addKnowledgeBase({ name: query, documentsCount: 0 });
            handleClose();
        }
    };

    return (
        <Box>
            <Typography variant="body2" mt={2} mb={1}>
                Name
            </Typography>
            <TextField
                fullWidth
                placeholder="Ex: Insight Engine"
                variant="outlined"
                size="small"
                onChange={(e) => setQuery(e.target.value)}
            />
            <Typography variant="body2" mt={2} mb={1}>
                When should the assistant search the knowledge base?
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Ex.: user asks how many properties you have in the city"
                variant="outlined"
                size="small"
                error={!query}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        bgcolor: query ? "inherit" : "#fef2f2",
                    },
                }}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button onClick={handleClose} sx={{ mr: 2 }} variant="outlined">
                    Cancel
                </Button>
                <Button variant="contained" disabled={!query} onClick={handleCreate}>
                    Create
                </Button>
            </Box>
        </Box>
    );
};

const KnowledgeBaseModal = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose} header={{ title: "New Knowledge Base", closeButton: true }} modalContent={<ModalContent handleClose={handleClose} />}>
        </Modal>
    );
};

export default KnowledgeBaseModal;