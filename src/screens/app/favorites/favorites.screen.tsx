import {StoreProduct} from '@/types/entities';
import {ProductItem} from '@components/app';
import {Header} from '@components/layouts';
import {SearchComponent, TextNormal, EmptyComponent} from '@components/shared';
import {useSearch} from '@hooks/helpers';
import {useFavorite} from '@hooks/services';
import {useNavigation, useTheme} from '@react-navigation/native';
import {flex, SHADOW_STYLE, spacing} from '@styles/index';
import React, {useCallback, useMemo} from 'react';
import {FlatList, FlatListProps, ListRenderItem, View} from 'react-native';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const {favorites, onFavorite} = useFavorite();
  const {search, debounceSearch, onChangeSearch} = useSearch();
  const data = useMemo(() => {
    if (debounceSearch === '') {
      return favorites;
    }
    return favorites.filter(x =>
      x.title.toLowerCase().includes(debounceSearch.toLowerCase()),
    );
  }, [favorites, debounceSearch]);
  const renderItem = useCallback<ListRenderItem<StoreProduct>>(
    ({item}) => {
      const isFavorite = favorites.find(x => x.id === item.id);
      return (
        <ProductItem
          product={item}
          isFavorite={!!isFavorite}
          onFavorite={onFavorite}
        />
      );
    },
    [favorites, onFavorite],
  );

  const keyExtractor: FlatListProps<StoreProduct>['keyExtractor'] = useCallback(
    (item: StoreProduct) => item.id?.toString() ?? item.title,
    [],
  );
  const {colors} = useTheme();
  return (
    <View style={[flex.flex1, {backgroundColor: colors.background}]}>
      <Header
        title="Favorite"
        goBackNavigation={() => {
          navigation.goBack();
        }}
      />
      <SearchComponent
        placeholder="Search..."
        style={[spacing('margin').horizontal, SHADOW_STYLE.shadowCard]}
        onChangeText={onChangeSearch}
        value={search}
      />
      <View style={[spacing('padding').around]}>
        <TextNormal>List of favorite products ({data.length})</TextNormal>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyComponent title="Không có sản phẩm yêu thích nào." />
        }
        contentContainerStyle={[
          flex.gap10,
          spacing('padding').horizontal,
          spacing('padding').bottom,
        ]}
        ListFooterComponent={<View style={[spacing('padding', 10).bottom]} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoriteScreen;
