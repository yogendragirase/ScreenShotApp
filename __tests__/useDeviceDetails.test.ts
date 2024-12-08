import {renderHook} from '@testing-library/react-hooks';
import useDeviceDetails from '../src/hooks/useDeviceDetails';
import DeviceInfo from 'react-native-device-info';

jest.mock('react-native-device-info', () => ({
  getDeviceName: jest.fn(() => Promise.resolve('Mock Device')),
  getMacAddress: jest.fn(() => Promise.resolve('00:00:00:00:00:00')),
  getUniqueId: jest.fn(() => 'mock-imei'),
}));

describe('useDeviceDetails', () => {
  it('fetches device details correctly', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useDeviceDetails());

    await waitForNextUpdate();

    expect(result.current).toEqual({
      os: expect.any(String),
      deviceName: 'Mock Device',
      macAddress: '00:00:00:00:00:00',
      imei: 'mock-imei',
      location: 'Mocked Location',
      publicIp: 'Mocked IP',
    });
  });
});
