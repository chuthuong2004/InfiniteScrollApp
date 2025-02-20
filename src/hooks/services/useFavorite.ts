import {useCallback} from 'react';
import {useMMKVString} from 'react-native-mmkv';
import {storage} from '../../store/mmkv';
import {StoreProduct} from '../../types';
import {STORAGE_KEY} from '../../utils/constants';

export function useFavorite() {
  const [favoriteJSON, setFavorites] = useMMKVString(STORAGE_KEY.favorites);

  const onFavorite = useCallback(
    (product: StoreProduct) => {
      const products: StoreProduct[] = favoriteJSON
        ? JSON.parse(favoriteJSON)
        : [];
      console.log('onFavorite -> products', {products, product});

      if (products.find(item => item.id === product.id)) {
        console.log('zô');

        const newProducts = products.filter(item => item.id !== product.id);
        setFavorites(JSON.stringify(newProducts));
        return;
      }

      setFavorites(JSON.stringify([product, ...products]));
    },
    [favoriteJSON, setFavorites],
  );

  const favorites: StoreProduct[] = favoriteJSON
    ? JSON.parse(favoriteJSON)
    : [];
  console.log('favorites', favorites);

  return {
    favorites,
    onFavorite,
  };
}
