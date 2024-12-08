import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { ScreenshotTogglerModule } from '../src/plugins/ScreenshotToggler';
import { sendStatusToApi } from '../src/services/api';

jest.mock('./plugins/ScreenshotToggler', () => ({
  toggleScreenshot: jest.fn(async (isActivated: boolean) => ({
    success: true,
    status: !isActivated,
  })),
}));

jest.mock('./services/api', () => ({
  sendStatusToApi: jest.fn(async () => ({ success: true })),
}));

describe('App', () => {
  it('renders correctly with initial state', () => {
    const { getByText } = render(<App />);
    expect(getByText('Screenshot Toggler')).toBeTruthy();
    expect(getByText('Activate')).toBeTruthy();
  });

  it('toggles the screenshot feature and updates state', async () => {
    const { getByText, queryByText } = render(<App />);
    const toggleButton = getByText('Activate');

    fireEvent.press(toggleButton);

    await waitFor(() => {
      expect(ScreenshotTogglerModule.toggleScreenshot).toHaveBeenCalledWith(false);
      expect(getByText('Deactivate')).toBeTruthy();
      expect(queryByText('Activate')).toBeNull();
    });
  });

  it('shows a loader while toggling and sends API call', async () => {
    const { getByText, getByTestId } = render(<App />);
    const toggleButton = getByText('Activate');

    fireEvent.press(toggleButton);

    expect(getByTestId('loader')).toBeTruthy();

    await waitFor(() => {
      expect(sendStatusToApi).toHaveBeenCalled();
    });
  });

  it('handles errors gracefully', async () => {
