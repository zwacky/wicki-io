---
title: "iOS & Android Native Build Errors with Cordova Plugins"
publishDate: "2017-03-20"
description: "A short compilation of some iOS & Android native build errors."
image: "native-build-error.png"
keywords: "cordova"
---

Lately I encountered some native build errors that slowed me down quite a bit. Here is an overview of some of them, their issue and solution which might save you some time if you come across one of the following native errors:

* **iOS:** ‘GoogleCloudMessaging.h’ file not found
* **iOS:** Duplicate Symbols
* **Android:** safeparcel.AbstractSafeParcelable not found
* **Android:** Force Close due to phonegap-push-plugin

{{< figure src="/posts/2017-03-ios-android-native-build-errors-with-cordova-plugins/native-build-error.png" alt="Native build error" >}}

## iOS: ‘GoogleCloudMessaging.h’ file not found

```
error: ‘GoogleCloudMessaging.h’ file not found
#import "GoogleCloudMessaging.h"
Lexical or Preprocessor Issue
> ‘GoogleCloudMessaging.h’ file not found
> PushPlugin.m
```

### Issue

Cordova supports CocoaPods since 4.3.0. The issue here is that 2 pods don’t load correctly and you need to add them manually in your ./platforms/ios/Podfile like in the solution.

### Solution

```
platform :ios, '7.0'
target 'JustWatch' do
	pod 'GoogleCloudMessaging'
	pod 'GGLInstanceID'
end
```

…and then in ./platforms/ios do a `pod install`.

---

## iOS: Duplicate Symbols

```
ld: 270 duplicate symbols for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
** BUILD FAILED **
```

### Issue:

[phonegap-plugin-push](https://github.com/phonegap/phonegap-plugin-push) and cordova-plugin-googleplus have common dependencies, but both add them separately which causes the duplicate symbols.

### Solution:
* Open your project with XCode.
* Go to "Build Phases" and access to "Link Binary With Libraries"
* Remove these libraries:

```
- libGTMSessionFetcher_core.a
- libGTMSessionFetcher_full.a
- libGTM_AddressBook.a
- libGTM_core.a
- libGTM_GTMURLBuilder.a
- libGTM_iPhone.a
- libGTM_KVO.a
- libGTM_Regex.a
- libGTM_StringEncoding.a
- libGTM_SystemVersion.a
```

As suggested here by @ideatia: https://github.com/phonegap/phonegap-plugin-push/issues/449#issuecomment-223557733

---

## Android: safeparcel.AbstractSafeParcelable not found

```
PluginUtil.java:135: error: cannot access AbstractSafeParcelable
    Builder builder = LatLngBounds.builder();
                                  ^
    class file for com.google.android.gms.common.internal.safeparcel.AbstractSafeParcelable not found
```

### Issue:

Two plugins are using the same play services dependencies but with different versions that are explicitly set and therefore can’t use two different dependency versions.

### Solution:

Unpin the play-services-map and play-services-location by adding this Cordova plugin fork directly:
ionic plugin add https://github.com/zwacky/cordova-plugin-googlemaps

---

## Android: Force Close due to phonegap-push-plugin

```
E/AndroidRuntime( 2059): FATAL EXCEPTION: pool-1-thread-3
E/AndroidRuntime( 2059): Process: com.justwatch.justwatch, PID: 2059
E/AndroidRuntime( 2059): java.lang.NoSuchMethodError: No static method getNoBackupFilesDir(Landroid/content/Context;)Ljava/io/File; in class Lcom/google/android/gms/common/util/zzw; or its super classes (declaration of ‘com.google.android.gms.common.util.zzw’ appears in /data/app/com.justwatch.justwatch-1/base.apk)
E/AndroidRuntime( 2059): at com.google.android.gms.iid.zzd.zzkq(Unknown Source)
E/AndroidRuntime( 2059): at com.google.android.gms.iid.zzd.<init>(Unknown Source)
E/AndroidRuntime( 2059): at com.google.android.gms.iid.zzd.<init>(Unknown Source)
E/AndroidRuntime( 2059): at com.google.android.gms.iid.InstanceID.zza(Unknown Source)
E/AndroidRuntime( 2059): at com.google.android.gms.iid.InstanceID.getInstance(Unknown Source)
E/AndroidRuntime( 2059): at com.adobe.phonegap.push.PushPlugin$1.run(PushPlugin.java:74)
E/AndroidRuntime( 2059): at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1112)
E/AndroidRuntime( 2059): at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:587)
E/AndroidRuntime( 2059): at java.lang.Thread.run(Thread.java:818)
```

### Issue:

`Google Play` GCM dependencies have changed here which made the [phonegap-push-plugin](https://github.com/phonegap/phonegap-plugin-push) have to adjust accordingly, otherwise wrong method signatures will be called which causes a force close.

### Solution:

Update to latest [phonegap-push-plugin](https://github.com/phonegap/phonegap-plugin-push) version or basically everything after 1.8.4.