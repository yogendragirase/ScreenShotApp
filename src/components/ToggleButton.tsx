// src/components/ToggleButton.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface ToggleButtonProps {
  onToggle: (status: boolean) => Promise<void>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({onToggle}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      await onToggle(!isActivated);
      setIsActivated(!isActivated);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Screenshot: {isActivated ? 'Enabled' : 'Disabled'}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={isActivated ? 'Activated' : 'Activate'}
          onPress={handlePress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 50},
  status: {fontSize: 18, marginBottom: 20},
});

export default ToggleButton;
