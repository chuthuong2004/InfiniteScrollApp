import {usePagination, useSearch} from '@hooks/helpers';
import {useFavorite} from '@hooks/services';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import HomeScreen from './home.screen';

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const SafeAreaContext = React.createContext({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  return {
    SafeAreaProvider: ({children}) => children,
    SafeAreaConsumer: SafeAreaContext.Consumer,
    useSafeAreaInsets: () => ({top: 0, bottom: 0, left: 0, right: 0}),
  };
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({navigate: jest.fn(), goBack: jest.fn()}),
  useTheme: () => ({
    colors: {primary: '#f59e0b', background: '#F7F8F9', card: '#FFFFFF'},
  }),
}));

jest.mock('@hooks/helpers', () => ({
  usePagination: jest.fn(),
  useSearch: jest.fn(),
}));

jest.mock('@hooks/services', () => ({
  useFavorite: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no products', async () => {
    usePagination.mockReturnValue({
      data: {products: [], total: 0},
      isLoadMore: false,
      onEndReached: jest.fn(),
      isValidating: false,
      refresh: jest.fn(),
    });
    useSearch.mockReturnValue({
      search: '',
      debounceSearch: '',
      onChangeSearch: jest.fn(),
    });
    useFavorite.mockReturnValue({favorites: [], onFavorite: jest.fn()});

    const {getByText} = render(<HomeScreen />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Products List (0/0)')).toBeTruthy();
    expect(getByText('No products available !')).toBeTruthy();
  });

  it('renders products list', async () => {
    usePagination.mockReturnValue({
      data: {
        products: [
          {id: 1, title: 'Product A', price: 100, images: []},
          {id: 2, title: 'Product B', price: 200, images: []},
        ],
        total: 2,
      },
      isLoadMore: false,
      onEndReached: jest.fn(),
      isValidating: false,
      refresh: jest.fn(),
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('Product A')).toBeTruthy();
    expect(getByText('Product B')).toBeTruthy();
  });

  it('updates search input', async () => {
    const mockOnChangeSearch = jest.fn();
    useSearch.mockReturnValue({
      search: '',
      debounceSearch: '',
      onChangeSearch: mockOnChangeSearch,
    });

    const {getByPlaceholderText} = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'New Product');

    await waitFor(() => {
      expect(mockOnChangeSearch).toHaveBeenCalledWith('New Product');
    });
  });

  it('triggers favorite action', async () => {
    const mockOnFavorite = jest.fn();
    useFavorite.mockReturnValue({
      favorites: [{id: 1}],
      onFavorite: mockOnFavorite,
    });
    usePagination.mockReturnValue({
      data: {
        products: [{id: 1, title: 'Product A', price: 100, images: []}],
        total: 1,
      },
      isLoadMore: false,
      onEndReached: jest.fn(),
      isValidating: false,
      refresh: jest.fn(),
    });

    const {getByTestId} = render(<HomeScreen />);
    const favoriteButton = getByTestId('favorite-btn-1');
    fireEvent.press(favoriteButton);

    await waitFor(() => {
      expect(mockOnFavorite).toHaveBeenCalledWith(
        expect.objectContaining({id: 1}),
      );
    });
  });
});
