import {toggleScreenshot} from '../src/plugins/ScreenshotToggler';
import {NativeModules} from 'react-native';

NativeModules.ScreenshotTogglerModule = {
  toggleScreenshot: jest.fn((isActivated: boolean) =>
    Promise.resolve({success: true, status: !isActivated}),
  ),
};

describe('toggleScreenshot', () => {
  it('calls the native module and returns success', async () => {
    const response = await toggleScreenshot(false);

    expect(
      NativeModules.ScreenshotTogglerModule.toggleScreenshot,
    ).toHaveBeenCalledWith(false);
    expect(response).toEqual({success: true, status: true});
  });

  it('handles errors from the native module', async () => {
    NativeModules.ScreenshotTogglerModule.toggleScreenshot.mockRejectedValueOnce(
      new Error('Native error'),
    );

    const response = await toggleScreenshot(true);

    expect(response).toEqual({success: false, error: 'Native error'});
  });
});
