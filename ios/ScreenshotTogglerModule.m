#import <React/RCTBridgeModule.h>

@interface ScreenshotTogglerModule : NSObject <RCTBridgeModule>
@end


#import <React/RCTLog.h>

@implementation ScreenshotTogglerModule

// This macro exposes the module to React Native
RCT_EXPORT_MODULE(ScreenshotTogglerModule);

// State variables for tracking screenshot status
static BOOL isScreenshotEnabled = YES;

RCT_EXPORT_METHOD(toggleScreenshot:(BOOL)enable resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    if (enable) {
      [self enableScreenshot];
    } else {
      [self disableScreenshot];
    }

    isScreenshotEnabled = enable;

    resolve(@{@"success": @(YES), @"status": @(isScreenshotEnabled)});
  } @catch (NSException *exception) {
    RCTLogError(@"Error toggling screenshot: %@", exception.reason);
    reject(@"toggle_error", @"Failed to toggle screenshot feature", nil);
  }
}

// Disable screenshots
- (void)disableScreenshot {
  if (@available(iOS 11.0, *)) {
    UIView *blankView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    blankView.tag = 12345; // Unique tag for identification
    blankView.backgroundColor = [UIColor clearColor];
    blankView.userInteractionEnabled = NO;
    blankView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    // Add this view to the app's main window
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
    [keyWindow addSubview:blankView];
    [keyWindow bringSubviewToFront:blankView];
  }
}

// Enable screenshots
- (void)enableScreenshot {
  if (@available(iOS 11.0, *)) {
    UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;

    // Find the view with the tag and remove it
    UIView *viewToRemove = [keyWindow viewWithTag:12345];
    if (viewToRemove) {
      [viewToRemove removeFromSuperview];
    }
  }
}

@end
