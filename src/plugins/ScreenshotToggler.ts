import {NativeModules} from 'react-native';

const {ScreenshotTogglerModule} = NativeModules;

export interface PluginResponse {
  success: boolean;
  error?: string;
}

export const toggleScreenshot = async (
  isActivated: boolean,
): Promise<PluginResponse> => {
  try {
    const response = await ScreenshotTogglerModule.toggleScreenshot(
      isActivated,
    );
    return {success: true, ...response};
  } catch (error) {
    return {success: false, error: error.message};
  }
};
