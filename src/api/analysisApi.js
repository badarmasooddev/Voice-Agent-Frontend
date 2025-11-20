import axiosInstance from './axiosInstance';

export const analyzeSentiment = async (file) => {
  try {
    if (!file) throw new Error("Audio file is required for sentiment analysis.");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/call-logs/analyze/sentiment", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing sentiment:", error.response?.data || error.message);
    throw error;
  }
};

export const analyzePerformanceReview = async (file, agentPrompt) => {
  try {
    if (!file || !agentPrompt) throw new Error("Audio file and agent prompt are required for performance review analysis.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("agent_prompt", agentPrompt);

    const response = await axiosInstance.post("/call-logs/analyze/performance-review", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing performance review:", error.response?.data || error.message);
    throw error;
  }
};

export const analyzeObjectionHandling = async (file) => {
  try {
    if (!file) throw new Error("Audio file is required for objection handling analysis.");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/call-logs/analyze/objection-handling", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing objection handling:", error.response?.data || error.message);
    throw error;
  }
};

export const analyzeCallOutcome = async (file) => {
  try {
    if (!file) throw new Error("Audio file is required for call outcome analysis.");

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/call-logs/analyze/call-outcome", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing call outcome:", error.response?.data || error.message);
    throw error;
  }
};
