import {storage} from '@/store/mmkv';
import {StoreProduct} from '@/types/entities';
import {STORAGE_KEY} from '@utils/constants';
import {useCallback} from 'react';
import {useMMKVString} from 'react-native-mmkv';

export function useFavorite() {
  const [favoriteJSON, setFavorites] = useMMKVString(
    STORAGE_KEY.favorites,
    storage,
  );

  const onFavorite = useCallback(
    (product: StoreProduct) => {
      setFavorites(prev => {
        const products: StoreProduct[] = prev ? JSON.parse(prev) : [];
        const index = products.findIndex(item => item.id === product.id);

        if (index !== -1) {
          return JSON.stringify(
            products.filter(item => item.id !== product.id),
          );
        }

        return JSON.stringify([product, ...products]);
      });
    },
    [setFavorites],
  );

  const favorites: StoreProduct[] = favoriteJSON
    ? JSON.parse(favoriteJSON)
    : [];
  return {
    favorites,
    onFavorite,
  };
}
