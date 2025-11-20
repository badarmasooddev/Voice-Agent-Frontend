import axiosInstance from "./axiosInstance";

export const createElevenLabAssistant = async (query) => {
  try {
    const response = await axiosInstance.post("/assistant/elevenlab", query);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating ElevenLab assistant:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getElevenLabAssistant = async (agentId) => {
  try {
    const response = await axiosInstance.get(`/assistant/elevenlab/${agentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ElevenLab assistant:", error.response?.data || error.message);
    throw error;
  }
};

export const updateElevenLabAssistant = async (agentId, updateData) => {
  try {
    const response = await axiosInstance.patch(`/assistant/elevenlab/${agentId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating ElevenLab assistant:", error.response?.data || error.message);
    throw error;
  }
};

export const updateElevenLabAssistantVoice = async (agentId, updateData) => {
  try {
    const response = await axiosInstance.patch(`/assistant/elevenlab/voice/${agentId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating ElevenLab assistant:", error.response?.data || error.message);
    throw error;
  }
};

export const updateElevenLabAssistantPrompt = async (agentId, updateData) => {
  try {
    const response = await axiosInstance.patch(`/assistant/elevenlab/prompt/${agentId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating ElevenLab assistant:", error.response?.data || error.message);
    throw error;
  }
};

export const getElevenLabVoices = async () => {
  try {
    const response = await axiosInstance.get(`/assistant/elevenlabs/tts-voices`);
    return response.data.voices || [];
  } catch (error) {
    console.error(
      "Error fetching ElevenLab voices:",
      error?.response?.data || error?.message || "Unknown error"
    );
    throw error;
  }
};

export const getElevenLabAllVoices = async () => {
  try {
    const response = await axiosInstance.get(`/assistant/elevenlabs/tts-voices/all`);
    return response.data.voices || [];
  } catch (error) {
    console.error(
      "Error fetching ElevenLab voices:",
      error?.response?.data || error?.message || "Unknown error"
    );
    throw error;
  }
};

export const createVoicePreview = async (voiceData) => {
  try {
    const response = await axiosInstance.post("/assistant/create-voice-preview", voiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating voice preview:", error.response?.data || error.message);
    throw error;
  }
};

export const saveVoicePreview = async ({ voice_name, voice_description, generated_voice_id }) => {
  const payload = {
    voice_name,
    voice_description,
    generated_voice_id,
  };

  try {
    const response = await axiosInstance.post("/assistant/save-voice", payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error saving voice preview:", error.response?.data || error.message);
    throw error;
  }
};

export const createSecret = async (name, value) => {
  try {
    const response = await axiosInstance.post("/assistant/app/secrets", { name, value });
    return response.data;
  } catch (error) {
    console.error("Error creating secret:", error.response?.data || error.message);
    throw error;
  }
};

export const getSecrets = async () => {
  const response = await axiosInstance.get("/assistant/app/secrets");
  return response.data;
};

export const deleteSecret = async (secret_id) => {
  const response = await axiosInstance.delete("/assistant/app/secrets", {
    data: { secret_id: secret_id },
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

export const addAssistant = async (query) => {
  const response = await axiosInstance.post("/assistant", query);
  return response.data;
};

export const getAssistant = async () => {
  const response = await axiosInstance.get("/assistant");
  return response.data;
};

export const getAssistantById = async (id) => {
  const response = await axiosInstance.get(`/assistant/${id}`);
  return response.data;
};

export const updateAssistant = async (query, id) => {
  const response = await axiosInstance.patch(`/assistant/${id}`, query);
  return response.data;
};

export const deleteAssistant = async (id) => {
  const response = await axiosInstance.delete(`/assistant/${id}`);
  return response.data;
};

export const getAssistantConfig = async ({ queryKey }) => {
  const [, assistantId] = queryKey;
  const response = await axiosInstance.get(`/assistant/config/${assistantId}`);
  return response.data;
};

export const getAssistantCallLogs = async ({ queryKey }) => {
  const [, assistantId] = queryKey;
  const response = await axiosInstance.get(`/assistant/logs/${assistantId}`);
  return response.data;
};

// update the assistant phone number and data>>
export const update_assistant = async (query, id) => {
  const response = await axiosInstance.patch(`/assistant/${id}`, query);
  return response.data;
};