import axiosInstance from './axiosInstance';

// Fetch call logs from ElevenLabs
export const getElevenLabConversations = async (agentId) => {
  try {
    if (!agentId) throw new Error("Agent ID is required to fetch call logs.");

    const response = await axiosInstance.get(`/assistant/elevenlab/conversations/${agentId}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching ElevenLabs conversations:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch conversation details from ElevenLabs
export const getElevenLabConversationDetails = async (conversationId) => {
  try {
    if (!conversationId) throw new Error("Conversation ID is required to fetch details.");

    const response = await axiosInstance.get(`/assistant/elevenlab/conversations/details/${conversationId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching conversation details:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch conversation recording from ElevenLabs
export const getElevenLabConversationRecording = async (conversationId) => {
  try {
      if (!conversationId) throw new Error("Conversation ID is required to fetch recording.");

      const response = await axiosInstance.get(`/assistant/elevenlab/conversations/${conversationId}/audio`, {
          responseType: 'blob'
      });

      return URL.createObjectURL(response.data);
  } catch (error) {
      console.error("Error fetching conversation recording:", error.response?.data || error.message);
      throw error;
  }
};

export const getAllCallLogs = async (assistantId) => {
  try {
    if (!assistantId) throw new Error("Assistant ID is required to fetch call logs.");

    const response = await axiosInstance.get(`/call-logs/${assistantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all call logs:", error.response?.data || error.message);
    throw error;
  }
};

export const transcribeBlobRecording = async (blobUrl) => {
  try {
    const blob = await fetch(blobUrl).then(res => res.blob());

    if (!blob.type.startsWith("audio/")) {
      throw new Error("Invalid audio file format. Please use mp3, wav, or other supported formats.");
    }

    const file = new File([blob], "audio.mp3", { type: "audio/mpeg" });

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/call-logs/transcribe", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error transcribing blob recording:", error.response?.data || error.message);
    throw error;
  }
};

export const transcribeDeepGramBlobRecording = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    if (!blob.type.startsWith("audio/")) {
      throw new Error("Invalid audio file format. Please use mp3, wav, or other supported formats.");
    }

    const file = new File([blob], "recording.mp3", { type: "audio/mpeg" });

    const formData = new FormData();
    formData.append("file", file);

    const transcriptionResponse = await axiosInstance.post("/call-logs/deepgram/transcribe", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return transcriptionResponse.data;
  } catch (error) {
    console.error("Error transcribing blob recording:", error.response?.data || error.message);
    throw error;
  }
};
