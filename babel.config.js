module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src',
          components: './src/components',
          store: './src/stores',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
