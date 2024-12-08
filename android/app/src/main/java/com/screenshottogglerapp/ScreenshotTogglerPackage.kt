package com.screenshottogglerapp


import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.NativeModuleRegistry
import com.facebook.react.uimanager.ViewManager
import java.util.*

class ScreenshotTogglerPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(ScreenshotTogglerModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return Collections.emptyList() // No custom view managers
    }
}
