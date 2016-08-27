# Child Care App
=================

Build the Android APP for the Child Care.

Note
-

* Please check the Device ID for the Android device.

Install the dependencies
-

### Use NPM to install.

```sh
# npm install
```

Build the Release APP(apk) for the first time.
-

### Build the bundle.js file

```sh
# react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### Build the Release files.

```sh
# (cd android/; ./gradlew assembleRelease)
```

### Build the Release APP(apk)

```sh
# (cd android/; ./gradlew installRelease)
```

### Install the Release APP(apk)

```sh
# react-native run-android
```

Build the Release APP(apk) for the Second time
-

### Rebuild the bundle.js file.

```sh
# react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### Install the Release APP(apk)

```sh
# react-native run-android
```


License
-
Licensed under the MIT License
