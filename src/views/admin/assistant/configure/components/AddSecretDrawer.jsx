import { useState } from "react";
import {
  Drawer,
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { IconX, IconLock } from "@tabler/icons-react";
import { createSecret } from "@/api/assistantApi";

export default function AddSecretDrawer({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState({ name: false, value: false });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !value.trim()) {
      setError({
        name: !name.trim(),
        value: !value.trim(),
      });
      return;
    }

    setLoading(true);

    try {
      const newSecret = await createSecret(name, value);
      onSave(newSecret);
      setName("");
      setValue("");
      onClose();
    } catch (error) {
      console.error("Error saving secret:", error);
      alert("Failed to save secret. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconLock size={22} color="gray" />
          <Typography variant="h6" fontWeight="bold">Add Secret</Typography>
          <IconX size={20} onClick={onClose} style={{ cursor: "pointer", marginLeft: "auto" }} />
        </Stack>

        <Typography variant="body2" mt={1} mb={2} color="text.secondary">
          Securely store a value that can be used by tools. Once added, the value cannot be retrieved.
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error.name}
              helperText={error.name ? "Name is required" : ""}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">Value</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              margin="dense"
              multiline
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={error.value}
              helperText={error.value ? "Value is required" : ""}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save Secret"}
        </Button>
      </Box>
    </Drawer>
  );
}
