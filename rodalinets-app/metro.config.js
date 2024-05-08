// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
  'react-native-google-mobile-ads': {
    android_app_id: 'ca-app-pub-9342975253020118~5546604362',
  },
});

config.resolver.sourceExts.push('mjs' ); 

module.exports = config;
