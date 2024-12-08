import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const useDeviceDetails = () => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const os = Platform.OS;
      const deviceName = await DeviceInfo.getDeviceName();
      const macAddress = await DeviceInfo.getMacAddress();
      const imei = await DeviceInfo.getUniqueId();
      const location = 'Mocked Location'; // Use location permissions for real data
      const publicIp = 'Mocked IP'; // Fetch using an API like ipify

      setDetails({os, deviceName, macAddress, imei, location, publicIp});
    };

    fetchDetails();
  }, []);

  return details;
};

export default useDeviceDetails;
