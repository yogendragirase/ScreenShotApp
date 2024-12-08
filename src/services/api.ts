import axios from 'axios';

const API_URL = 'https://mockapi.example.com/status';

export const sendStatusToApi = async (payload: Record<string, any>) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send data to the API.');
  }
};
