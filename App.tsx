import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import useDeviceDetails from './src/hooks/useDeviceDetails';
import {
  toggleScreenshot,
  PluginResponse,
} from './src/plugins/ScreenshotToggler';
import {sendStatusToApi} from './src/services/api';

const App = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const deviceDetails = useDeviceDetails();

  const handleToggle = async () => {
    setLoading(true);

    try {
      const response: PluginResponse = await toggleScreenshot(isActivated);
      if (response.success) {
        Alert.alert(
          'Screenshot Toggled',
          `Screenshot is now ${isActivated ? 'disabled' : 'enabled'}`,
        );
        setIsActivated(!isActivated);

        // Send data to API
        await sendStatusToApi({
          ...deviceDetails,
          screenshotEnabled: !isActivated,
        });
      } else {
        Alert.alert('Error', response.error || 'An unknown error occurred.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Screenshot Toggler</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={isActivated ? 'Deactivate' : 'Activate'}
          onPress={handleToggle}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
