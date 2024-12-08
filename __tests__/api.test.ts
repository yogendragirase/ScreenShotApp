import axios from 'axios';
import {sendStatusToApi} from '../src/services/api';

jest.mock('axios');

describe('sendStatusToApi', () => {
  it('sends status data to the API successfully', async () => {
    const mockResponse = {data: {success: true}};
    axios.post.mockResolvedValueOnce(mockResponse);

    const response = await sendStatusToApi({screenshotEnabled: true});
    expect(axios.post).toHaveBeenCalledWith(
      'https://mockapi.example.com/status',
      {screenshotEnabled: true},
    );
    expect(response).toEqual(mockResponse.data);
  });

  it('handles API errors gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    await expect(sendStatusToApi({screenshotEnabled: false})).rejects.toThrow(
      'Failed to send data to the API.',
    );
  });
});
