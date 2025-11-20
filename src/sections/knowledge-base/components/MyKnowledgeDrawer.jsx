import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Drawer,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  useTheme

} from "@mui/material";
import { IconX, IconCloudUpload } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createKnowledgeBase, getKnowlabseLinks } from "../../../api/knowledgeBaseApi";

const MyKnowledgeDrawer = ({ open, onClose }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("file");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [textName, setTextName] = useState("");
  const [textContent, setTextContent] = useState("");
  const [errors, setErrors] = useState({});
  const [links, setLinks] = useState()
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const mutation = useMutation({
    mutationFn: async (formData) => createKnowledgeBase(formData),
    onSuccess: (newKnowledgeBase) => {
      queryClient.setQueryData(["knowledgeBases"], (oldData) => {
        if (!oldData) return [newKnowledgeBase.data];
        return [...oldData, newKnowledgeBase.data];
      });

      queryClient.invalidateQueries(["knowledgeBases"]);
      setToast({ open: true, message: "Knowledge base created successfully!", severity: "success" });
      setLinks([])
      handleCancel();
    },
    onError: (error) => {
      console.error("Error creating knowledge base:", error);
      setToast({ open: true, message: "Failed to create knowledge base", severity: "error" });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: getKnowlabseLinks,
    onSuccess: (resp) => {
      console.log(resp)
      const filteredLinks = resp
        .filter(item => item.content.length > 100)
        .map(item => ({
          label: item.title,
          url: item.url,
          content: item.content
        }));

      setLinks(filteredLinks);
    }
  });

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const validateUrl = () => {
    if (!url.trim()) {
      setErrors((prev) => ({ ...prev, url: "Please enter a valid URL" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, url: null }));
    return true;
  };

  const validateTextFields = () => {
    let valid = true;
    const newErrors = {};
    if (!textName.trim()) {
      newErrors.textName = "Text Name is required";
      valid = false;
    }
    if (!textContent.trim()) {
      newErrors.textContent = "Text Content is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleCancel = () => {
    setActiveTab("file");
    setFile(null);
    setUrl("");
    setTextName("");
    setTextContent("");
    setErrors({});
    onClose();
  };

  const handleCreateKnowledgeBase = () => {
    let formData = new FormData();

    if (activeTab === "file" && file) {
      formData.append("type", "file");
      formData.append("name", file.name);
      formData.append("file", file);
    } else if (activeTab === "url" && validateUrl() && checkedLinks.length > 0) {
      const generateRandomString = () => Math.random().toString(36).substring(2, 8); // Generates a random 6-character string

      const selectedContent = links
        .filter((item) => checkedLinks.includes(item.url))
        .map((item) => item.content)
        .join(' ')

      const urlToText = (url) => {
        const baseName = new URL(url)
          .hostname
          .replace(/\.(com|net|org|io|co|in|edu|gov|uk|us)$/i, '')
          .replace(/^www\./, '')
          .replace(/[\W_]+/g, '-');

        return `${baseName}-${generateRandomString()}`; // Append random string
      };
      formData.append("type", "text");
      formData.append("name", urlToText(url));
      formData.append("content", selectedContent);
    } else if (activeTab === "url" && validateUrl()) {
      formData.append("type", "url");
      formData.append("name", url);
      formData.append("content", url);
    }
    else if (activeTab === "text" && validateTextFields()) {
      formData.append("type", "text");
      formData.append("name", textName);
      formData.append("content", textContent);
    } else {
      return;
    }

    mutation.mutate(formData);
  };
  const handleGetLink = () => {
    if (validateUrl()) {
      mutate(url)
    }
  }

  const [checkedLinks, setCheckedLinks] = useState([]);

  const handleChange = (url) => {
    setCheckedLinks((prev) =>
      prev.includes(url)
        ? prev.filter((link) => link !== url)
        : [...prev, url]
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
        <Typography variant="h6">Create Knowledge Base Document</Typography>
        <IconButton onClick={onClose}>
          <IconX />
        </IconButton>
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Tab Selection */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: theme.palette.mode === "dark" ? "#141415" : "#f5f5f5",
            borderRadius: 1,
            mb: 2,
            p: 1,
          }}
        >
          <Button
            fullWidth
            onClick={() => setActiveTab("file")}
            sx={{
              color: activeTab === "file" ? "#1976d2" : "#666",
              fontWeight: activeTab === "file" ? "bold" : "normal",
            }}
          >
            File
          </Button>
          <Button
            fullWidth
            onClick={() => setActiveTab("url")}
            sx={{
              color: activeTab === "url" ? "#1976d2" : "#666",
              fontWeight: activeTab === "url" ? "bold" : "normal",
            }}
          >
            URL
          </Button>
          <Button
            fullWidth
            onClick={() => setActiveTab("text")}
            sx={{
              color: activeTab === "text" ? "#1976d2" : "#666",
              fontWeight: activeTab === "text" ? "bold" : "normal",
            }}
          >
            Text
          </Button>
        </Box>

        {/* File Upload Section */}
        {activeTab === "file" && (
          <Box
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            sx={{
              border: "2px dashed #aaa",
              p: 4,
              textAlign: "center",
              borderRadius: 1,
              bgcolor: theme.palette.mode === "dark" ? "#141415" : "#f9f9f9",
              cursor: "pointer",
            }}
          >
            <IconCloudUpload stroke={2} style={{ fontSize: 40, color: "#77" }} />
            <Typography variant="body1" color="gray">
              Click or drag files to upload
            </Typography>
            <Typography variant="body2" color="gray">
              Maximum size: 21 MB. Supported types: pdf, txt, docx, html, epub.
            </Typography>
            <input
              type="file"
              accept=".pdf,.txt,.docx,.html,.epub"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button component="span" variant="contained" sx={{ mt: 2 }}>
                Choose File
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploaded: {file.name}
              </Typography>
            )}
          </Box>
        )}

        {/* URL Input Section */}
        {activeTab === "url" && (
          <Box>
            <InputLabel>Enter URL</InputLabel>
            <FormControl fullWidth error={Boolean(errors.url)}>
              <OutlinedInput
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                sx={{ bgcolor: theme.palette.mode === "dark" ? "#141415" : "#f5f5f5" }}
              />
              {errors.url && <FormHelperText>{errors.url}</FormHelperText>}
              <Button sx={{ mt: 2 }} variant="contained" loading={isPending} onClick={handleGetLink}>Get All pages</Button>
              {links && links.length > 0 &&
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={checkedLinks.length === links.length}
                        indeterminate={checkedLinks.length > 0 && checkedLinks.length < links.length}
                        onChange={() =>
                          setCheckedLinks(
                            checkedLinks.length === links.length ? [] : links.map((link) => link.url)
                          )
                        }
                      />
                    }
                    label={<Typography variant="body1">Select All</Typography>}
                  />

                  {links.map((link) => (
                    <FormControlLabel
                      key={link.url}
                      control={
                        <Checkbox
                          size="small"
                          checked={checkedLinks.includes(link.url)}
                          onChange={() => handleChange(link.url)}
                        />
                      }
                      label={<Typography variant="body2">{link.url}</Typography>}
                    />
                  ))}
                </Stack>
              }
            </FormControl>
          </Box>
        )}

        {/* Text Input Section */}
        {activeTab === "text" && (
          <Box>
            <InputLabel>Text Name</InputLabel>
            <FormControl fullWidth error={Boolean(errors.textName)} sx={{ mb: 2 }}>
              <OutlinedInput
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
                placeholder="Enter text name"
                sx={{ bgcolor: theme.palette.mode === "dark" ? "#141415" : "#f5f5f5" }}
              />
              {errors.textName && <FormHelperText>{errors.textName}</FormHelperText>}
            </FormControl>
            <InputLabel>Text Content</InputLabel>
            <FormControl fullWidth error={Boolean(errors.textContent)}>
              <OutlinedInput
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter text content"
                multiline
                rows={4}
                sx={{ bgcolor: theme.palette.mode === "dark" ? "#141415" : "#f5f5f5" }}
              />
              {errors.textContent && <FormHelperText>{errors.textContent}</FormHelperText>}
            </FormControl>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button sx={{ color: "#666", mr: 2 }} onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateKnowledgeBase} disabled={mutation.isPending}>
            {mutation.isLoading ? "Creating..." : "Create"}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Drawer >
  );
};

export default MyKnowledgeDrawer;
