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
      const products: StoreProduct[] = favoriteJSON
        ? JSON.parse(favoriteJSON)
        : [];

      if (products.find(item => item.id === product.id)) {
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
  return {
    favorites,
    onFavorite,
  };
}
