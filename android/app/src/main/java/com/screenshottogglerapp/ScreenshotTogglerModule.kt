package com.screenshottogglerapp


import android.app.Activity
import android.view.WindowManager
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ScreenshotTogglerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Initialization code if necessary
    }

    // The name of the module that will be used in JavaScript
    override fun getName(): String {
        return "ScreenshotTogglerModule"
    }

    // Method to enable/disable screenshots
    @ReactMethod
    fun toggleScreenshot(enable: Boolean, promise: Promise) {
        try {
            val currentActivity: Activity? = currentActivity
            if (currentActivity != null) {
                if (enable) {
                    enableScreenshots(currentActivity)
                    promise.resolve("Screenshots enabled")
                } else {
                    disableScreenshots(currentActivity)
                    promise.resolve("Screenshots disabled")
                }
            } else {
                promise.reject("ERROR", "Activity is null")
            }
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    // Method to enable screenshots
    private fun enableScreenshots(activity: Activity) {
        // Remove FLAG_SECURE to allow screenshots
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        Toast.makeText(reactApplicationContext, "Screenshots enabled", Toast.LENGTH_SHORT).show()
    }

    // Method to disable screenshots
    private fun disableScreenshots(activity: Activity) {
        // Set FLAG_SECURE to block screenshots
        activity.window.setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
        Toast.makeText(reactApplicationContext, "Screenshots disabled", Toast.LENGTH_SHORT).show()
    }
}
