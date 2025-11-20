import axios from 'axios';
import axiosInstance from './axiosInstance';

export const createKnowledgeBase = async (formData) => {
    try {
        const response = await axiosInstance.post('/knowledge-base/elevenlab-knowledgeBase', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating knowledge base:', error.response?.data || error.message);
        throw error;
    }
};

export const getKnowledgeBaseList = async () => {
    try {
        const response = await axiosInstance.get('/knowledge-base/elevenlab-knowledgeBase/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching knowledge bases:', error.response?.data || error.message);
        throw error;
    }
};

export const getKnowledgeBaseById = async (documentId) => {
    try {
        const response = await axiosInstance.get(`/knowledge-base/elevenlab-knowledgeBase/${documentId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching knowledge base (${documentId}):`, error.response?.data || error.message);
        throw error;
    }
};

// delete the knowledge base documents
export const deleteKnowledgeBase = async (documentId) => {
    try {
        const response = await axiosInstance.delete(`/knowledge-base/${documentId}`)
        return response.data;
    } catch (error) {
        console.error(`Error deleting knowledge base (${documentId}):`, error.response?.data || error.message);
        throw error;
    }
}

export const getKnowlabseLinks = async (url) => {
    const response = await axios.get(`https://teraleads-scrapper.trixlyai.com/scrape?url=${url}`)
    return response.data;

}