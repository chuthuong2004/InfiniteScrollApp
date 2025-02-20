module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@configs': './src/configs',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@/store': './src/store',
          '@styles': './src/styles',
          '@/types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
