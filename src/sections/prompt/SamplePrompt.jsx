import React, { useState } from "react";
import {
    Drawer,
    Button,
    Box,
    Stack,
    IconButton,
    Typography,
    Snackbar,
    Alert,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { IconX, IconCopy } from "@tabler/icons-react";
import promptTemplates from "./sample_template.json";

export default function SamplePrompt({ Open, Close }) {
    const [selectedTemplate, setSelectedTemplate] = useState(promptTemplates[0]);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const handle_copy = () => {
        navigator.clipboard.writeText(selectedTemplate.content)
            .then(() => {
                setToast({ open: true, message: "Copied to clipboard!", severity: "success" });
            })
            .catch(() => {
                setToast({ open: true, message: "Failed to copy", severity: "error" });
            });
    };

    return (
        <Drawer
            anchor="right"
            open={Open}
            onClose={Close}
            sx={{
                width: "600px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "600px",
                    height: "100%",
                    padding: "20px",
                },
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
                <Typography variant="h6">Sample Prompt</Typography>
                <IconButton onClick={Close}>
                    <IconX />
                </IconButton>
            </Stack>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Select Template
                </Typography>
                <Select
                    value={selectedTemplate.id}
                    onChange={(event) => {
                        const selected = promptTemplates.find((t) => t.id === event.target.value);
                        setSelectedTemplate(selected);
                    }}
                >
                    {promptTemplates.map((template) => (
                        <MenuItem key={template.id} value={template.id}>
                            {template.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9", maxHeight: "60vh", overflowY: "auto" }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {selectedTemplate.name}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {selectedTemplate.content}
                </Typography>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button variant="outlined" color="secondary" onClick={Close}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handle_copy} startIcon={<IconCopy />}>
                    Copy
                </Button>
            </Stack>
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Drawer>
    );
}
