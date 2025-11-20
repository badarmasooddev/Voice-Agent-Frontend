import React, { useState, useEffect } from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography, Chip, Select, MenuItem 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconPlus, IconTrash, IconGridDots, IconTable, IconX } from '@tabler/icons-react';
import { updateElevenLabAssistant } from '@/api/assistantApi';

const DataCollection = ({ data }) => {
  const agentId = data.agent_id;  
  const dataCollectionFromAPI = data?.platform_settings?.data_collection || {};

  const formattedDataCollection = Object.entries(dataCollectionFromAPI).map(([key, value]) => ({
    text: key,
    type: value?.type || 'unknown',
    description: value?.description || 'No description available',
  }));

  const [items, setItems] = useState(formattedDataCollection);
  const [originalItems, setOriginalItems] = useState(formattedDataCollection);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newItem, setNewItem] = useState({ text: '', type: 'String', description: '' });
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(formattedDataCollection);
    setOriginalItems(formattedDataCollection);
  }, [data]);

  useEffect(() => {
    setIsModified(JSON.stringify(items) !== JSON.stringify(originalItems));
  }, [items, originalItems]);

  const handleAddItem = () => {
    if (newItem.text.trim() && newItem.type.trim() && newItem.description.trim()) {
      setItems([...items, newItem]);
      setNewItem({ text: '', type: 'String', description: '' });
      setOpenDrawer(false);
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
  
      const existingConfig = data?.conversation_config || {};
  
      const updatedDataCollection = items.reduce((acc, item) => {
        acc[item.text] = { 
          type: item.type.toLowerCase(),
          description: item.description 
        };
        return acc;
      }, {});
  
      const updatePayload = {
        name: data?.name || "Assistant",
        conversation_config: {
          agent: {
            first_message: existingConfig.agent?.first_message || "Hello! How can I assist?",
            prompt: {
              llm: existingConfig.agent?.prompt?.llm || "gpt-4",
              temperature: existingConfig.agent?.prompt?.temperature ?? 0.7,
              knowledge_base: existingConfig.agent?.prompt?.knowledge_base || [],
            },
          },
          tts: {
            model_id: existingConfig.tts?.model_id || "eleven_flash_v2",
          },
        },
        platform_settings: {
          data_collection: updatedDataCollection,
        },
      };
  
      await updateElevenLabAssistant(agentId, updatePayload);

      setOriginalItems(items);
      setIsModified(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update assistant:", error);
      setLoading(false);
    }
  };
  
  return (
      <Accordion defaultExpanded>
        <AccordionSummary sx={{ backgroundColor: '#f5f5f5'}} expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography fontWeight="bold">Analysis</Typography>
            <Typography variant="body2" color="text.secondary">
              Define and manage custom data collection specifications.
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1}}>Data Collection</Typography>
                <Typography variant="body2" color="text.secondary">
                  Define custom data specifications to extract from conversation transcripts.
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<IconPlus size={16} />} onClick={() => setOpenDrawer(true)}>
                Add item
              </Button>
            </Stack>

            <List sx={{ bgcolor: '#F4FCFF', borderRadius: 2, p: 2 }}>
              {items.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #E5E7EB', py: 2 }}>
                  <IconGridDots size={18} stroke={1.5} color="gray" style={{ marginRight: 10 }} />
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight="bold">{item.text}</Typography>
                        <Chip label={item.type} size="small" sx={{ bgcolor: '#E5E7EB', color: '#374151', fontSize: 12 }} />
                      </Stack>
                    }
                    secondary={<Typography variant="body2" fontSize={'12px'} color="text.secondary">{item.description}</Typography>}
                  />
                  <IconButton onClick={() => handleDeleteItem(index)} edge="end">
                    <IconTrash size={18} stroke={1.5} color="black" />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            {isModified && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSaveChanges}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Items"}
                </Button>
              </Box>
            )}

            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <Box sx={{ width: 500, p: 3, position: 'relative' }}>
                <IconButton 
                  onClick={() => setOpenDrawer(false)}
                  sx={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <IconX size={20} stroke={1.5} />
                </IconButton>

                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3, mb: 5 }}>
                  <IconTable size={24} stroke={1.5} />
                  <Typography variant="h6" fontWeight="bold">Add data collection item</Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="bold">Data type</Typography>
                    <Select
                      fullWidth
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value="String">String</MenuItem>
                      <MenuItem value="Number">Number</MenuItem>
                      <MenuItem value="Boolean">Boolean</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="bold">Identifier</Typography>
                    <TextField 
                      fullWidth
                      placeholder="Enter identifier"
                      value={newItem.text}
                      onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Stack>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" fontWeight="bold">Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="This field will be passed to the LLM and should describe in detail how to extract the data from the transcript."
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <Button variant="outlined" onClick={() => setOpenDrawer(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={handleAddItem}>Add item</Button>
                </Stack>
              </Box>
            </Drawer>
          </Box>
        </AccordionDetails>
      </Accordion>
  );
};

export default DataCollection;
