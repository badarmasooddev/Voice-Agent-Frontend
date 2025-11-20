import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Paper,
  Drawer,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  List, ListItem, ListItemText, Stack
} from '@mui/material';
import { IconTrash, IconGridDots } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { updateElevenLabAssistant, getAssistant } from '@/api/assistantApi';

const ToolSelector = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTool, setSelectedTool] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toolType, setToolType] = useState('Client');
  const [waitForResponse, setWaitForResponse] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState('');

  const { data: response,} = useQuery({
    queryKey: ['assistants'],
    queryFn: getAssistant,
  });
  
  const assistants = response?.data || [];

  
  const open = Boolean(anchorEl);

  const initialParam = {
    dataType: 'String',
    identifier: '',
    required: true,
    valueType: 'LLM Prompt',
    description: '',
    variableName: '',
    constantValue: '',
  };
  
  const [parameters, setParameters] = useState([]);
  
  const handleAddParam = () => setParameters([...parameters, { ...initialParam }]);
  
  const handleParamChange = (index, key, value) => {
    const updated = [...parameters];
    updated[index][key] = value;
    setParameters(updated);
  };
  
  const handleDeleteParam = (index) => {
    const updated = [...parameters];
    updated.splice(index, 1);
    setParameters(updated);
  };

  const [transferRules, setTransferRules] = useState([
    { agent: '', condition: '' }
  ]);
  
  const handleAddRule = () => {
    setTransferRules([...transferRules, { agent: '', condition: '' }]);
  };
  
  const handleRuleChange = (index, key, value) => {
    const updated = [...transferRules];
    updated[index][key] = value;
    setTransferRules(updated);
  };
  
  const handleDeleteRule = (index) => {
    const updated = [...transferRules];
    updated.splice(index, 1);
    setTransferRules(updated);
  };  
  
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuSelect = (tool) => {
    setSelectedTool(tool);
    setAnchorEl(null);
    if (tool === 'Custom Tool' || tool === 'End Call' || tool ===  'Language Detection' || tool === 'Transfer to AI Agent') {
      setDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTool('');
  };

  const handleSubmitTool = async () => {
    const existingTools = [...(data?.conversation_config?.agent?.prompt?.tools || [])];  
    let newTool = null;
  
    if (selectedTool === 'End Call') {
      newTool = {
        type: 'system',
        name: 'end_call',
        description: '',
        params: { system_tool_type: 'end_call', description: '' }
      };
    }
  
    if (selectedTool === 'Language Detection') {
      newTool = {
        type: 'system',
        name: 'language_detection',
        description: '',
        params: { system_tool_type: 'language_detection' }
      };
    }
  
    if (selectedTool === 'Transfer to AI Agent') {
      newTool = {
        type: 'system',
        name: 'transfer_to_agent',
        description: '',
        params: {
          system_tool_type: 'transfer_to_agent',
          transfers: [
            {
              agent_id: selectedAssistant,
              condition: '',
            }
          ],
          rules: transferRules
        }
      };
    }
  
    if (selectedTool === 'Custom Tool') {
      const paramProps = {};
      const requiredFields = [];
  
      parameters.forEach((param) => {
        const key = param.identifier;
        paramProps[key] = {
          type: param.dataType.toLowerCase(),
          description: param.description,
          dynamic_variable: param.variableName || '',
          constant_value: param.constantValue || '',
        };
        if (param.required) requiredFields.push(key);
      });
  
      newTool = {
        type: toolType.toLowerCase(),
        name: 'custom_tool',
        description: '',
        parameters: {
          type: 'object',
          properties: paramProps,
          required: requiredFields,
          description: ''
        },
        expects_response: waitForResponse,
        response_timeout_secs: waitForResponse ? 30 : undefined,
        dynamic_variables: {
          dynamic_variable_placeholders: {}
        }
      };
    }
  
    const mergedToolsMap = new Map(existingTools.map(tool => [tool.name, tool]));
    if (newTool) {
      mergedToolsMap.set(newTool.name, newTool);
    }
    const mergedTools = Array.from(mergedToolsMap.values());
  
    const updateData = {
      conversation_config: {
        agent: {
          first_message: data.conversation_config.agent.first_message,
          prompt: {
            llm: data.conversation_config.agent.prompt.llm,
            temperature: data.conversation_config.agent.prompt.temperature,
            max_tokens: data.conversation_config.agent.prompt.max_tokens,
            tools: mergedTools,
          }
        },
        conversation: {
          client_events: data.conversation_config.conversation.client_events,
        }
      }
    };
  
    try {
      const agentId = data.agent_id;
      await updateElevenLabAssistant(agentId, updateData);
      console.log('Tool updated successfully');
      setDrawerOpen(false);
    } catch (error) {
      console.error('Failed to update tool:', error);
    }
  };
  
  const handleDeleteTool = (indexToRemove) => {
    setData((prev) => {
      const tools = [...(prev?.conversation_config?.agent?.prompt?.tools || [])];
      tools.splice(indexToRemove, 1);
      return {
        ...prev,
        conversation_config: {
          ...prev.conversation_config,
          agent: {
            ...prev.conversation_config.agent,
            prompt: {
              ...prev.conversation_config.agent.prompt,
              tools,
            },
          },
        },
      };
    });
  };
  
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box mb={2}>
        <Typography variant="h6" fontWeight="bold">Tools</Typography>
        <Typography variant="body2" color="text.secondary">
            Provide the agent with tools it can use to help users.
        </Typography>

        {(data?.conversation_config?.agent?.prompt?.tools || []).length > 0 && (
            <List sx={{ bgcolor: '#F4FCFF', borderRadius: 2, p: 2, mt: 2 }}>
            {data.conversation_config.agent.prompt.tools.map((tool, index) => (
                <ListItem
                key={index}
                sx={{
                    borderBottom:
                    index !== data.conversation_config.agent.prompt.tools.length - 1
                        ? '1px solid #E5E7EB'
                        : 'none',
                    py: 2,
                }}
                >
                <IconGridDots size={18} stroke={1.5} color="gray" style={{ marginRight: 10 }} />

                <ListItemText
                    primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight="bold">{tool.name}</Typography>
                        <Chip
                        label={tool.type}
                        size="small"
                        sx={{ bgcolor: '#E5E7EB', color: '#374151', fontSize: 12 }}
                        />
                    </Stack>
                    }
                />

                <Button onClick={() => handleDeleteTool(index)} edge="end">
                    <IconTrash size={18} stroke={1.5} color="black" />
                </Button>
                </ListItem>
            ))}
            </List>
        )}
        </Box>

        <Button
          variant="outlined"
          onClick={handleMenuClick}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Add tool
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {['Custom Tool', 'End Call', 'Language Detection', 'Transfer to AI Agent'].map((tool) => (
            <MenuItem key={tool} onClick={() => handleMenuSelect(tool)}>
              {tool}
            </MenuItem>
          ))}
        </Menu>
      </Paper>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 600, p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
            Add tool
            </Typography>

            {selectedTool === 'End Call' ? (
            <>
                <Typography fontWeight="bold" mb={0.5}>
                Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                Describe to the LLM how and when to use the tool.
                </Typography>

                <TextField
                fullWidth
                label="Name"
                size="small"
                defaultValue="end_call"
                disabled
                sx={{ mb: 2 }}
                />
                <TextField
                fullWidth
                multiline
                rows={3}
                label="Description (optional)"
                placeholder="Leave blank to use the default optimized LLM prompt."
                size="small"
                sx={{ mb: 4 }}
                />

                <Box display="flex" justifyContent="space-between">
                <Button onClick={handleCloseDrawer}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitTool}>Add tool</Button>
                </Box>
            </>
            ) : selectedTool === 'Language Detection' ? (
            <>
                <Typography fontWeight="bold" mb={0.5}>
                Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                Describe to the LLM how and when to use the tool.
                </Typography>

                <TextField
                fullWidth
                label="Name"
                size="small"
                defaultValue="language_detection"
                disabled
                sx={{ mb: 2 }}
                />
                <TextField
                fullWidth
                multiline
                rows={3}
                label="Description (optional)"
                placeholder="Leave blank to use the default optimized LLM prompt."
                size="small"
                sx={{ mb: 4 }}
                />

                <Box display="flex" justifyContent="space-between">
                <Button onClick={handleCloseDrawer}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitTool}>Add tool</Button>
                </Box>
            </>
            ) : selectedTool === 'Transfer to AI Agent' ? (
            <>
                <Box sx={{ mb: 4 }}>
                <Typography fontWeight="bold" mb={0.5}>
                    Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Describe to the LLM how and when to use the tool.
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    size="small"
                    defaultValue="transfer_to_agent"
                    disabled
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description (optional)"
                    placeholder="Leave blank to use the default optimized LLM prompt."
                    size="small"
                    sx={{ mb: 2 }}
                />
                </Box>

                <Box sx={{ background: '#f8f8f8', p: 2, borderRadius: 2, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box>
                    <Typography fontWeight="bold">Transfer Rules</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Define the conditions for transferring to different agents.
                    </Typography>
                    </Box>
                    <Button variant="outlined" size="small" onClick={handleAddRule}>
                    Add Rule
                    </Button>
                </Box>

                {transferRules.map((rule, i) => (
                    <Box
                    key={i}
                    sx={{
                        p: 2,
                        background: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        mb: 2,
                    }}
                    >
                    <TextField
                    select
                    fullWidth
                    label="Select Assistant"
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                    sx={{ mb: 2 }}
                    >
                    <MenuItem value="">Select an Assistant</MenuItem> 
                    {Array.isArray(assistants) && assistants.length > 0 ? (
                        assistants.map((assistant) => (
                        <MenuItem key={assistant.agentId} value={assistant.agentId}>
                            {assistant.name}
                        </MenuItem>
                        ))
                    ) : (
                        <MenuItem value="">No Assistants Available</MenuItem>
                    )}
                    </TextField>

                    <TextField
                        fullWidth
                        size="small"
                        label="Condition"
                        placeholder="Enter the condition for transferring to this agent"
                        value={rule.condition}
                        onChange={(e) => handleRuleChange(i, 'condition', e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() => handleDeleteRule(i)}
                        >
                        Delete
                        </Button>
                    </Box>
                    </Box>
                ))}
                </Box>

                <Box display="flex" justifyContent="space-between">
                <Button onClick={handleCloseDrawer}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitTool}>Add tool</Button>
                </Box>
            </>
            ):   
            (
            <>
                <Typography variant="subtitle2" mb={1}>
                Tool type
                </Typography>
                <ToggleButtonGroup
                fullWidth
                value={toolType}
                exclusive
                onChange={(e, val) => val && setToolType(val)}
                sx={{ mb: 1 }}
                >
                <ToggleButton value="Webhook">Webhook</ToggleButton>
                <ToggleButton value="Client">Client</ToggleButton>
                </ToggleButtonGroup>

                <Typography variant="body2" color="text.secondary" mb={3}>
                A client tool allows the agent to trigger an event on the client side containing
                information extracted from the call.
                </Typography>

                <Box sx={{ background: '#fafafa', p: 2, borderRadius: 2, mb: 3 }}>
                <Typography fontWeight="bold" mb={0.5}>
                    Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Describe to the LLM how and when to use the tool.
                </Typography>

                <TextField fullWidth label="Name" size="small" sx={{ mb: 2 }} />
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={waitForResponse}
                        onChange={(e) => setWaitForResponse(e.target.checked)}
                    />
                    }
                    label="Wait for response"
                />
                <Typography variant="caption" color="text.secondary">
                    Select this box to make the agent wait for the tool to finish executing before resuming
                    the conversation.
                </Typography>

                {waitForResponse && (
                    <TextField
                    type="number"
                    fullWidth
                    size="small"
                    label="Response Timeout (seconds)"
                    sx={{ mt: 2 }}
                    placeholder="e.g. 30"
                    inputProps={{ min: 1 }}
                    />
                )}
                </Box>


                <Box sx={{ background: '#fafafa', p: 2, borderRadius: 2, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography fontWeight="bold">Parameters</Typography>
                    <Button variant="outlined" size="small" onClick={handleAddParam}>
                    Add param
                    </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Define the parameters that will be sent with the event.
                </Typography>

                {parameters.map((param, i) => (
                    <Box
                    key={i}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        mb: 2,
                    }}
                    >
                    <Box display="flex" gap={1} mb={2}>
                        <TextField
                        select
                        size="small"
                        fullWidth
                        label="Data type"
                        value={param.dataType}
                        onChange={(e) => handleParamChange(i, 'dataType', e.target.value)}
                        SelectProps={{ native: true }}
                        >
                        <option value="String">String</option>
                        <option value="Number">Number</option>
                        <option value="Boolean">Boolean</option>
                        </TextField>
                        <TextField
                        size="small"
                        fullWidth
                        label="Identifier"
                        value={param.identifier}
                        onChange={(e) => handleParamChange(i, 'identifier', e.target.value)}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={param.required}
                            onChange={(e) => handleParamChange(i, 'required', e.target.checked)}
                        />
                        }
                        label="Required"
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        select
                        fullWidth
                        size="small"
                        label="Value Type"
                        value={param.valueType}
                        onChange={(e) => handleParamChange(i, 'valueType', e.target.value)}
                        SelectProps={{ native: true }}
                        sx={{ mb: 2 }}
                    >
                        <option value="LLM Prompt">LLM Prompt</option>
                        <option value="Dynamic Variable">Dynamic Variable</option>
                        <option value="Constant">Constant</option>
                    </TextField>

                    {param.valueType === 'LLM Prompt' && (
                        <TextField
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        label="Description"
                        value={param.description}
                        onChange={(e) => handleParamChange(i, 'description', e.target.value)}
                        helperText="This field will be passed to the LLM and should describe how to extract the data from the transcript."
                        />
                    )}

                    {param.valueType === 'Dynamic Variable' && (
                        <TextField
                        fullWidth
                        size="small"
                        label="Variable Name"
                        value={param.variableName}
                        onChange={(e) => handleParamChange(i, 'variableName', e.target.value)}
                        />
                    )}

                    {param.valueType === 'Constant' && (
                        <TextField
                        fullWidth
                        size="small"
                        label="Constant Value"
                        value={param.constantValue}
                        onChange={(e) => handleParamChange(i, 'constantValue', e.target.value)}
                        />
                    )}

                    <Button
                        variant="text"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteParam(i)}
                        sx={{ mt: 2 }}
                    >
                        Delete
                    </Button>
                    </Box>
                ))}
                </Box>

                <Box sx={{ background: '#fafafa', p: 2, borderRadius: 2, mb: 4 }}>
                <Typography fontWeight="bold">Dynamic Variables</Typography>
                <Typography variant="body2" color="text.secondary">
                    Variables in tool parameters will be replaced with actual values when the conversation
                    starts.{' '}
                    <Button variant="text" size="small">
                    Learn more
                    </Button>
                </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box display="flex" justifyContent="space-between">
                <Button onClick={handleCloseDrawer}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitTool}>Add tool</Button>
                </Box>
            </>
            )}
        </Box>
    </Drawer>

    </>
  );
};

export default ToolSelector;
