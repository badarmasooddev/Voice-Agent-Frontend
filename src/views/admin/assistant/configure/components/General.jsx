import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  Slider,
  CircularProgress,
  Snackbar,
  Alert,
  OutlinedInput,
  FormHelperText,
  Stack,
  Divider,
  Chip,
  Switch,
  IconButton,
  Tabs, Tab,
} from "@mui/material";
import { IconChevronDown, IconLock, IconTrash, IconBrain, IconMicrophone, IconTools, IconChartDots, IconSettings, IconTextRecognition, IconMessage, IconLayoutGrid } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getKnowledgeBaseList } from "@/api/knowledgeBaseApi";
import { updateElevenLabAssistant, updateAssistant, getSecrets, deleteSecret, getAssistant } from "@/api/assistantApi";
import AddSecretDrawer from "./AddSecretDrawer";
import Voice from './Voice'
import DataExtraction from './DataExtraction';
import CallLogs from '../../call-logs/index'
import Dashboard from '../../../assistant-dashboard/analytics'
import CustomTool from './customTool'

export default function General({ data, onSubmit }) {
  const { id: assistantId } = useParams();
  const queryClient = useQueryClient();
  const [voiceEngine, setVoiceEngine] = useState("1.0");
  const [aiModel, setAiModel] = useState("gpt-4o");
  const [clientEvents, setClientEvents] = useState([]);
  const [temperature, setTemperature] = useState(0.7);
  const [maxToken, setMaxToken] = useState(-1);
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
  const [useRag, setUseRag] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [_secrets, setSecrets] = useState([]);

  const [serverUrl, setServerUrl] = useState("");
  const [modelId, setModelId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [transcriptionModel, setTranscriptionModel] = useState('Elevenlabs');
  const [language, setLanguage] = useState('en');
  const [languageModel, setLanguageModel] = useState('nova-3');
  const [voiceMailProvider, setvoiceMailProvider] = useState('twilio');
  const [provider, setProvider] = useState("");
  const PROVIDER_MODELS = {
    openai: [
      { value: "gpt-4o-mini", label: "GPT-4o Mini" },
      { value: "gpt-4o", label: "GPT-4o" },
      { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    ],
    google: [
      { value: "gemini-1.0-pro", label: "Gemini 1.0 Pro" },
      { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
      { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
      { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
      { value: "gemini-2.0-flash-001", label: "Gemini 2.0 Flash 1" },
      { value: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite" },
    ],
    anthropic: [
      { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
      { value: "claude-3-5-sonnet-v1", label: "Claude 3.5 Sonnet V1" },
      { value: "claude-3-7-sonnet", label: "Claude 3.7 Sonnet" },
      { value: "claude-3-haiku", label: "Claude 3 Haiku" },
    ],
    xai: [
      { value: "grok-beta", label: "Grok Beta" },
    ],
    custom: [
      { value: "custom-llm", label: "Custom LLM" },
    ],
    deepseek: [
      { value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", label: "DeepSeek R1 distill qwen 32b" },
      { value: "@cf/deepseek-ai/deepseek-math-7b-instruct", label: "DeepSeek math 7b" },

    ],
    meta: [
      { value: '@cf/meta/llama-3-8b-instruct', label: 'llama-3 8b instruct' },
      { value: '@cf/meta/llama-4-scout-17b-16e-instruct', label: 'llama-4-scout 17 instruct' }
    ],
    mistral: [
      { value: '@cf/mistral/mistral-7b-instruct-v0.1', label: 'Mistral-7b' },
      { value: '@cf/mistralai/mistral-small-3.1-24b-instruct', label: 'Mistrall small' }
    ],
    // grok: [
    //   { value: 'allam-2-7b', label: 'Allam-2 7b' }
    // ],
    qwen: [
      { value: '@cf/qwen/qwen1.5-1.8b-chat', label: 'Qwen 1.5' }
    ]
  };

  useEffect(() => {
    if (!aiModel) return;
    if (aiModel.startsWith("gpt-")) setProvider("openai");
    else if (aiModel.startsWith("gemini-")) setProvider("google");
    else if (aiModel.startsWith("claude-")) setProvider("anthropic");
    else if (aiModel.startsWith("grok-")) setProvider("xai");
    else if (aiModel === "custom-llm") setProvider("custom");
    else if (aiModel.startsWith("@cf/deepseek-")) setProvider("deepseek");
    else if (aiModel.startsWith("@cf/meta")) setProvider("meta");
    else if (aiModel.startsWith("@cf/mistral")) setProvider("mistral");
    else if (aiModel.startsWith("@cf/qwen")) setProvider("qwen");
    // else if(aiModel === '')
  }, [aiModel]);

  const DEEPSEEK_LLM = {
    url: "https://api.cloudflare.com/client/v4/accounts/42dad9561a56c1d01f2d9bef61c99d13/ai/v1",
    model_id: "deepseek-model-v1",
    api_key: "BWOoIfc0yG4lF20hctE3",
  };

  const [tab, setTab] = useState('Dashboard');

  const generalRef = useRef(null);
  const transcriberRef = useRef(null);
  const modelRef = useRef(null);
  const analysisRef = useRef(null);
  const advancedRef = useRef(null);
  const toolsRef = useRef(null);
  const voiceRef = useRef(null);
  const callLogsRef = useRef(null);
  const dashboardsRef = useRef(null);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    switch (newValue) {
      case 'Dashboard':
        dashboardsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'General':
        generalRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Transcriber':
        transcriberRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Voice':
        voiceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Model':
        modelRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Analysis':
        analysisRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Advanced':
        advancedRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Tools':
        toolsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'CallLogs':
        callLogsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const { data: knowledgeBases, isLoading } = useQuery({
    queryKey: ["knowledgeBases"],
    queryFn: getKnowledgeBaseList,
    select: (res) => res.data.documents,
  });

  const { data: secretsData } = useQuery({
    queryKey: ["secrets"],
    queryFn: getSecrets,
    select: (res) => res.data.secrets,
  });

  useEffect(() => {
    if (data) {
      console.log("-------------------------------------------------------------------------", data.conversation_config.agent.prompt.custom_llm?.model_id)
      setVoiceEngine(data.conversation_config.tts.model_id || "1.0");
      setAiModel(data.conversation_config.agent.prompt.llm || "gpt-4o");
      setTemperature(data.conversation_config.agent.prompt.temperature || 0.7);
      setMaxToken(data.conversation_config.agent.prompt.max_tokens || -1);
      if (data.conversation_config.agent.prompt.custom_llm?.url === 'https://api.cloudflare.com/client/v4/accounts/42dad9561a56c1d01f2d9bef61c99d13/ai/v1') {
        setAiModel(data.conversation_config.agent.prompt.custom_llm?.model_id)
      }
      else {
        setServerUrl(data.conversation_config.agent.prompt.custom_llm?.url || "");
        setModelId(data.conversation_config.agent.prompt.custom_llm?.model_id || "");
        setApiKey(data.conversation_config.agent.prompt.custom_llm?.api_key?.secret_id || "");
      }


      setClientEvents(data.conversation_config.conversation.client_events || []);

      const existingKBs = data.conversation_config.agent.prompt.knowledge_base?.map(kb => kb.id) || [];
      setSelectedKnowledgeBases(existingKBs);

      setUseRag(data.conversation_config.agent.prompt.rag.enabled || false);

      reset({
        assistant_name: data.name || "",
        first_message: data.conversation_config.agent.first_message || "",
        system_prompt: data.conversation_config.agent.prompt.prompt || "",
      });
      setTranscriptionModel(data.transcriptionModel || 'Elevenlabs')
    }
  }, [data, reset]);

  const handleSelectKnowledgeBase = (event) => {
    const value = event.target.value;
    setSelectedKnowledgeBases(typeof value === "string" ? value.split(",") : value);
  };

  const handleRemoveKnowledgeBase = (kbId) => {
    setSelectedKnowledgeBases((prev) => prev.filter(id => id !== kbId));
  };

  const handleSelectClientEvents = (event) => {
    const value = event.target.value;
    setClientEvents(typeof value === "string" ? value.split(",") : value);
  };

  const handleRemoveClientEvent = (eventId) => {
    setClientEvents((prev) => prev.filter(id => id !== eventId));
  };

  const handleFormSubmit = async (formData) => {
    setSaving(true);
    const updateData = {
      name: formData.assistant_name,
      conversation_config: {
        agent: {
          first_message: formData.first_message,
          prompt: {
            prompt: formData.prompt,
            llm: ["deepseek", "grok", "meta", 'mistral', 'qwen'].includes(provider) ? "custom-llm" : aiModel,
            temperature: temperature,
            max_tokens: maxToken,
            rag: {
              enabled: useRag,
              embedding_model: data.conversation_config.agent.prompt.rag?.embedding_model || "e5_mistral_7b_instruct",
              max_vector_distance: data.conversation_config.agent.prompt.rag?.max_vector_distance || 0.6,
              max_documents_length: data.conversation_config.agent.prompt.rag?.max_documents_length || 50000,
            },
            knowledge_base: selectedKnowledgeBases.map(id => ({
              id,
              type: "file",
              usage_mode: "auto"
            })),
            custom_llm: ["deepseek", "grok", "meta", 'mistral', 'qwen'].includes(provider) ? {
              url: DEEPSEEK_LLM.url,
              model_id: aiModel,
              api_key: { secret_id: DEEPSEEK_LLM.api_key }
            } : {
              url: serverUrl,
              model_id: modelId,
              api_key: {
                secret_id: apiKey,
              }
            },
          },
        },
        tts: {
          model_id: voiceEngine,
        },
        conversation: {
          client_events: clientEvents,
        }
      },
    };

    try {
      await updateElevenLabAssistant(data.agent_id, updateData);
      await updateAssistant({ name: formData.assistant_name, transcriptionModel: transcriptionModel }, assistantId);
      setToast({ open: true, message: "Settings updated successfully!", severity: "success" });
      if (onSubmit) onSubmit(updateData);
    } catch (error) {
      console.error("Error updating assistant:", error);
      setToast({ open: true, message: "Failed to update settings", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecret = (newSecret) => {
    setSecrets((prevSecrets) => [...prevSecrets, newSecret]);
    queryClient.invalidateQueries(["secrets"]);
    setToast({ open: true, message: "Secret added successfully!", severity: "success" });
  };

  const deleteSecretMutation = useMutation({
    mutationFn: async (secretId) => {
      if (!secretId) {
        throw new Error("Secret ID is required for deletion.");
      }
      return deleteSecret(secretId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["secrets"]);
      setToast({ open: true, message: "Secret deleted successfully!", severity: "success" });
    },
    onError: (error) => {
      console.error("Failed to delete secret:", error);
      setToast({ open: true, message: "Failed to delete secret", severity: "error" });
    }
  });

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={5}>
          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="setting tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="Dashboard"
              value="Dashboard"
              icon={<IconLayoutGrid size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="General"
              value="General"
              icon={<IconSettings size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Model"
              value="Model"
              icon={<IconBrain size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Transcriber"
              value="Transcriber"
              icon={<IconTextRecognition size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Voice"
              value="Voice"
              icon={<IconMicrophone size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Tools"
              value="Tools"
              icon={<IconTools size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Analysis"
              value="Analysis"
              icon={<IconChartDots size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="Advanced"
              value="Advanced"
              icon={<IconSettings size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
            <Tab
              label="CallLogs"
              value="CallLogs"
              icon={<IconMessage size={18} />}
              sx={{ fontSize: '0.8rem' }}
            />
          </Tabs>

          <Divider />

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconLayoutGrid size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Dashboard
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={dashboardsRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Dashboard</Typography>
                <Typography variant="body2" color="text.secondary">Dashboard for your Assistant.</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Dashboard data={data} />
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconSettings size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                General
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={generalRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">General</Typography>
                <Typography variant="body2" color="text.secondary">
                  Basic settings for your assistant.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Assistant Name */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Assistant Name</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Set the name of your assistant.
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    placeholder="Enter assistant name..."
                    {...register("assistant_name", { required: "Assistant name is required" })}
                  />
                  {errors.assistant_name && (
                    <FormHelperText error>{errors.assistant_name.message}</FormHelperText>
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconSettings size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Model
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={modelRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Model</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure how your assistant thinks and responds.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={4}>

                {/* First Message */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>First Message</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Set the assistant’s first response.
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    placeholder="Enter the first message..."
                    {...register("first_message", { required: "First message is required" })}
                  />
                  {errors.first_message && (
                    <FormHelperText error>{errors.first_message.message}</FormHelperText>
                  )}
                </Box>

                {/* System Prompt */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>System Prompt</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Set the assistant’s System Prompt.
                  </Typography>
                  <OutlinedInput
                    fullWidth
                    placeholder="Enter the system Prompt..."
                    multiline
                    minRows={10}
                    maxRows={10}
                    {...register("system_prompt", { required: "System Prompt is required" })}
                  />
                  {errors.system_prompt && (
                    <FormHelperText error>{errors.system_prompt.message}</FormHelperText>
                  )}
                </Box>

                <Box>
                  <Typography fontWeight="bold" gutterBottom>LLM Provider</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Choose your preferred LLM provider.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={provider}
                      onChange={(e) => {
                        const newProvider = e.target.value;
                        setProvider(newProvider);
                        const defaultModel = PROVIDER_MODELS[newProvider]?.[0]?.value || "";
                        setAiModel(defaultModel);
                        if (newProvider !== "custom" && newProvider !== "deepseek") {
                          setServerUrl("");
                          setModelId("");
                          setApiKey("");
                        }
                      }}
                    >
                      <MenuItem value="openai">OpenAI</MenuItem>
                      <MenuItem value="google">Google</MenuItem>
                      <MenuItem value="anthropic">Anthropic</MenuItem>
                      <MenuItem value="xai">xAI</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                      <MenuItem value="deepseek">DeepSeek</MenuItem>
                      <MenuItem value="meta">Meta</MenuItem>
                      <MenuItem value="mistral">Mistral</MenuItem>
                      <MenuItem value="qwen">qwen</MenuItem>

                    </Select>
                  </FormControl>
                </Box>

                {/* LLM */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>LLM</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select which provider and model to use for the LLM.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={aiModel}
                      onChange={(e) => {
                        const selectedModel = e.target.value;
                        setAiModel(selectedModel);
                        if (selectedModel !== "custom-llm" && selectedModel !== "deepseek-llm") {
                          setServerUrl("");
                          setModelId("");
                          setApiKey("");
                        }
                      }}
                    >
                      {(PROVIDER_MODELS[provider] || []).map(({ value, label }) => (
                        <MenuItem key={value} value={value}>{label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {aiModel === "custom-llm" && (
                    <Box mt={2} p={2} borderRadius={2} border="1px solid #e0e0e0">
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">Server URL</Typography>
                        <Box
                          sx={{
                            mt: 1,
                            p: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="https://example.com/webhook"
                            value={serverUrl}
                            onChange={(e) => setServerUrl(e.target.value)}
                            style={{
                              border: "none",
                              outline: "none",
                              flex: 1,
                              padding: "8px",
                              fontSize: "14px",
                            }}
                          />
                        </Box>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        The server is expected to match the OpenAI API format.
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">Model ID</Typography>
                        <Box
                          sx={{
                            mt: 1,
                            p: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Enter Model ID"
                            value={modelId}
                            onChange={(e) => setModelId(e.target.value)}
                            style={{
                              border: "none",
                              outline: "none",
                              flex: 1,
                              padding: "8px",
                              fontSize: "14px",
                            }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">API Key</Typography>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                          <Select value={apiKey} onChange={(e) => setApiKey(e.target.value)} disabled={isLoading}>
                            <MenuItem value="">None</MenuItem>
                            {secretsData?.map((secret) => (
                              <MenuItem key={secret.secret_id} value={secret.secret_id}>
                                {secret.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        We strongly suggest using an API key to authenticate with your LLM server.
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Temperature */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Temperature</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Control response randomness.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Slider
                      value={temperature}
                      step={0.05}
                      min={0}
                      max={1}
                      onChange={(e, newValue) => setTemperature(newValue)}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {temperature.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Max Token */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Limit Token Usage</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Set the maximum tokens. If above 0, a limit applies.
                  </Typography>
                  <TextField
                    value={maxToken}
                    onChange={(e) => setMaxToken(e.target.value)}
                    type="number"
                    variant="outlined"
                    sx={{
                      maxWidth: "120px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                {/* Knowledge Base */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Knowledge Base</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select one or multiple knowledge bases.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={selectedKnowledgeBases}
                      onChange={handleSelectKnowledgeBase}
                      input={<OutlinedInput />}
                      displayEmpty
                      renderValue={(selected) =>
                        selected.length > 0 ? (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((id) => {
                              const kb = knowledgeBases?.find((kb) => kb.id === id);
                              return kb ? (
                                <Chip
                                  key={id}
                                  label={kb.name}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onDelete={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemoveKnowledgeBase(id);
                                  }}
                                />
                              ) : null;
                            })}
                          </Box>
                        ) : (
                          "Select knowledge bases"
                        )
                      }
                    >
                      {isLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={24} />
                        </MenuItem>
                      ) : knowledgeBases?.length > 0 ? (
                        knowledgeBases.map((kb) => (
                          <MenuItem key={kb.id} value={kb.id}>
                            {selectedKnowledgeBases.includes(kb.id) ? "✔ " : ""}
                            {kb.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No knowledge bases available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconTextRecognition size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Transcribe
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={transcriberRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Transcriber</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure which model to use for transcription.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Transcription Model */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Transcription Model</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select which provider and model to use for the Transcription.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={transcriptionModel}
                      onChange={(e) => setTranscriptionModel(e.target.value)}
                    >
                      <MenuItem value="Elevenlabs">Elevenlabs</MenuItem>
                      <MenuItem value="Deepgram">Deepgram</MenuItem>
                      <MenuItem value="Whisper">Whisper</MenuItem>
                      <MenuItem value="assemblyai">Assembly Ai</MenuItem>
                      <MenuItem value="speechmatics">Speechmatics</MenuItem>
                      <MenuItem value="openai">Open Ai</MenuItem>

                    </Select>
                  </FormControl>
                </Box>
                {/* Language */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Language</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Select which Language to use for the Transcription.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="en-US">United States English</MenuItem>
                      <MenuItem value="multi">Multilingual</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Model */}
                {/* <Box>
                <Typography fontWeight="bold" gutterBottom>Model</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Select which model to use for the Transcription.
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={languageModel}
                    onChange={(e) => setLanguageModel(e.target.value)}
                  >
                    <MenuItem value="nova-3">Nova-3</MenuItem>
                    <MenuItem value="nova-3-general">Nova-3 General</MenuItem>
                    <MenuItem value="nova-3-medical">Nova-3 Medical</MenuItem>
                  </Select>
                </FormControl>
              </Box> */}

              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconMicrophone size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Voice
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={voiceRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Voice Settings</Typography>
                <Typography variant="body2" color="text.secondary">Configure the voice for your assistant.</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Voice data={data} />
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconTools size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Tools
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={toolsRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Tools</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure client events.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Client Events */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Client Events</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Choose the client events.
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={clientEvents}
                      onChange={handleSelectClientEvents}
                      input={<OutlinedInput />}
                      displayEmpty
                      renderValue={(selected) =>
                        selected.length > 0 ? (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((id) => (
                              <Chip
                                key={id}
                                label={id}
                                onMouseDown={(e) => e.stopPropagation()}
                                onDelete={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveClientEvent(id);
                                }}
                              />
                            ))}
                          </Box>
                        ) : (
                          "Select client events"
                        )
                      }
                    >
                      <MenuItem value="agent_response">Agent Response</MenuItem>
                      <MenuItem value="agent_response_correction">Agent Response Correction</MenuItem>
                      <MenuItem value="asr_initiation_metadata">Asr Initiation Metadata</MenuItem>
                      <MenuItem value="audio">Audio</MenuItem>
                      <MenuItem value="client_tool_call">Client Tool Call</MenuItem>
                      <MenuItem value="conversation_initiation_metadata">Conversation Initiation Metadata</MenuItem>
                      <MenuItem value="internal_tentative_agent_response">Internal Tentative Agent Response</MenuItem>
                      <MenuItem value="internal_turn_probability">Internal Turn Probability</MenuItem>
                      <MenuItem value="internal_vad_score">Internal Vad Score</MenuItem>
                      <MenuItem value="interruption">Interruption</MenuItem>
                      <MenuItem value="ping">Ping</MenuItem>
                      <MenuItem value="user_transcript">User Transcript</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </AccordionDetails>

            <Accordion defaultExpanded ref={toolsRef}>
              <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
                <Box>
                  <Typography fontWeight="bold">Custom Tools</Typography>
                  <Typography variant="body2" color="text.secondary">Configure the custom tools for your assistant.</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <CustomTool data={data} />
              </AccordionDetails>
            </Accordion>

          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconChartDots size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Analysis
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={analysisRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Analysis</Typography>
                <Typography variant="body2" color="text.secondary">  Enable multiple Analysis Functionalities.</Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">  Enable RAG functionality.</Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                <Switch checked={useRag} onChange={() => setUseRag(!useRag)} />
              </Box>
            </AccordionDetails>

            <Accordion defaultExpanded ref={analysisRef}>
              <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
                <Box>
                  <Typography fontWeight="bold">Data Extraction</Typography>
                  <Typography variant="body2" color="text.secondary">  Define and manage custom data collection specifications.</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <DataExtraction data={data} />
              </AccordionDetails>
            </Accordion>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconSettings size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Advanced
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={advancedRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Advanced</Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage sensitive secrets and credentials.
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>

                {/* Manage Secrets */}
                <Box>
                  <Typography fontWeight="bold" gutterBottom>Manage Secrets</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Add sensitive API keys or credentials.
                  </Typography>

                  <Box mt={2} p={2} borderRadius={2} border="1px solid #e0e0e0" width="100%">
                    {isLoading ? (
                      <CircularProgress />
                    ) : secretsData?.length > 0 ? (
                      <Stack spacing={2}>
                        {secretsData.map((secret) => {
                          const agentName =
                            secret.used_by.agent_tools.length > 0
                              ? secret.used_by.agent_tools[0].agent_name
                              : "Unused";

                          return (
                            <Box
                              key={secret.secret_id}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              p={1.5}
                              sx={{
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <Box display="flex" alignItems="center" gap={2}>
                                <IconLock size={18} color="gray" />
                                <Box>
                                  <Typography variant="body2" fontWeight="bold">
                                    {secret.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {agentName}
                                  </Typography>
                                </Box>
                              </Box>

                              <IconButton
                                color="error"
                                onClick={() => deleteSecretMutation.mutate(secret.secret_id)}
                                disabled={deleteSecretMutation.isLoading}
                              >
                                <IconTrash size={18} color="gray" />
                              </IconButton>
                            </Box>
                          );
                        })}
                      </Stack>
                    ) : (
                      <Typography>No secrets available.</Typography>
                    )}

                    <Box mt={2} display="flex" justifyContent="flex-end">
                      <Button variant="contained" color="primary" onClick={() => setIsDrawerOpen(true)}>
                        Add Secret
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Accordion defaultExpanded>
                <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
                  <Box>
                    <Typography fontWeight="bold">Voicemail Detection</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Configure how the assistant detects and handles voicemail.
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Box>
                    <Typography fontWeight="bold" gutterBottom>Provider</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Select which provider to use for the voice mail detection.
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={voiceMailProvider}
                        onChange={(e) => setvoiceMailProvider(e.target.value)}
                      >
                        <MenuItem value="twilio">Twilio</MenuItem>
                        <MenuItem value="google">Google</MenuItem>
                        <MenuItem value="openai">OpenAI</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <IconMessage size={18} style={{ marginRight: 10 }} />
              <Typography variant="body2">
                Call Logs
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Accordion defaultExpanded ref={callLogsRef}>
            <AccordionSummary sx={{ backgroundColor: '#f5f5f5' }} expandIcon={<IconChevronDown />}>
              <Box>
                <Typography fontWeight="bold">Call Logs</Typography>
                <Typography variant="body2" color="text.secondary">Call Log Details for your assistant.</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CallLogs data={data} />
            </AccordionDetails>
          </Accordion>

          <Divider />

          <Button type="submit" variant="contained" color="primary" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </Stack>
      </form>
      <AddSecretDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveSecret}
      />
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
    </Box>
  );
}