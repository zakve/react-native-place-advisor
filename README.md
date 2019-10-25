# react-native-place-advisor

> Android/iOs application using native modules like camera, location etc.

## Instalation (for macOS)
1. Install Xcode from AppStore (takes around 2 hours)
2. Install Homebrew (https://brew.sh/)
3. Install NodeJS (version 8.3 or newer) via Homebrew `$ brew install node` or download from https://nodejs.org/en/
4. Install Watchman `$ brew install watchman`
5. Install JDK
   1. `$ brew tap AdoptOpenJDK/openjdk`
   2. `$ brew cask install adoptopenjdk8`
6. Install React Native CLI `$ npm install -g react-native-cli`
7. In Xcode setup newest Command line tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

## How to use
1. Create new project `react-native init AwesomeProject`
2. cd AwesomeProject
3. react-native run-ios

## Trouble-shootings
### CocoaPods
If you will need to install CocoaPods use `$ sudo gem install cocoapods`. WARNING: This step takes around **30 minutes** without any response! So it will look it is stuck, but **do not interrupt the instalation**. Otherwise, you will need to find a way how to remove all files and install again.

### Error 62 or any other
If your application won't start, go to folder ios and remove build folder and try it again

### Android - SDK location not found
Solution: https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil

Go to your react-native Project then go to android directory. Create a file with this name
`local.properties`

Add this line (For Mac users):

`sdk.dir = /Users/USERNAME/Library/Android/sdk`

Where USERNAME is your OSX username

### Android - abd command not found
Solution: https://stackoverflow.com/questions/53755219/bin-sh-adb-command-not-found

Update your PATH

`export ANDROID_HOME=/Users/{youusername}/Library/Android/sdk`

`export PATH=$ANDROID_HOME/platform-tools:$PATH`

`export PATH=$ANDROID_HOME/tools:$PATH`

When you need to add PATH every time, you can try this solution:
https://github.com/facebook/react-native/issues/11413


Install android-tools with Homebrew 

`brew cask install android-platform-tools`

### iOS - Could not find "iPhone X" simulator.

Solution: https://facebook.github.io/react-native/docs/running-on-simulator-ios

1. Open iOS simulator in Xcode
2. Check your available devices by running `xcrun simctl list devices`
3. Find booted device and run on that device `react-native run-ios --simulator="iPhone 5s"`

### iOS -  Failed to build iOS project. We ran “xcodebuild” command but it exited with error code 65

The problem is with Pod. Error: /Users/user/dev/app-name/ios/Pods/Target Support Files/Pods-Appname/Pods-Appname.debug.xcconfig: unable to open file (in target “Appname” in project “Appname”) (in target ‘Appname’ from project ‘Appname’)


Solution: go to ios/ folder and run `pod deintegrate` and then `pod install`




Anotoher problem could be duplicate link for fonts etc. 


Solution: open ios/ xCode project in xCode and `remove` or `unlink` colid files from `resource` folder.

### iOS - RCTBridge required dispatch_sync

Solution: https://medium.com/@hr.hseyin_80381/rctbridge-required-dispatch-sync-to-load-rctdevloadingview-error-fix-ba734cced787
