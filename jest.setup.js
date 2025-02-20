jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // Fix lỗi "createAnimatedComponent is not a function"
  Reanimated.default.createAnimatedComponent = Component => Component;

  return Reanimated;
});
jest.mock('react-native-gesture-handler', () => {
  const mockGesture = {
    manualActivation: jest.fn(() => mockGesture),
    onBegin: jest.fn(() => mockGesture),
    onTouchesMove: jest.fn(() => mockGesture),
    onUpdate: jest.fn(() => mockGesture), // 🛠️ Thêm onUpdate
    onEnd: jest.fn(() => mockGesture),
    onFinalize: jest.fn(() => mockGesture),
  };

  const Gesture = {
    Pan: jest.fn(() => mockGesture),
  };

  return {
    Gesture,
    GestureDetector: ({children}) => children,
    Swipeable: jest.fn().mockImplementation(({children}) => children),
    FlatList: jest.requireActual('react-native').FlatList,
    ScrollView: jest.requireActual('react-native').ScrollView,
  };
});

// jest.setup.js
jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetInfo: jest.fn(() => ({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
    })),
    fetch: jest.fn(() =>
      Promise.resolve({
        type: 'wifi',
        isConnected: true,
        isInternetReachable: true,
      }),
    ),
    addEventListener: jest.fn(),
  };
});
