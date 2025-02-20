module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-reanimated|@react-native|react-native-gesture-handler)/)',
  ],
  globals: {
    __reanimatedWorkletInit: () => {},
  },
};
