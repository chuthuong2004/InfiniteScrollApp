import {StoreProduct} from '@/types/entities';
import {ProductItem} from '@components/app';
import {Header} from '@components/layouts';
import {EmptyComponent, SearchComponent, TextNormal} from '@components/shared';
import {usePagination, useSearch} from '@hooks/helpers';
import {useFavorite} from '@hooks/services';
import {useTheme} from '@react-navigation/native';
import {productService} from '@services/products';
import {flex, SHADOW_STYLE, spacing} from '@styles/index';
import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
  View,
} from 'react-native';
const HomeScreen = () => {
  const {search, debounceSearch, onChangeSearch} = useSearch();
  const {favorites, onFavorite} = useFavorite();
  const {data, isLoadMore, onEndReached, isValidating, refresh, isLoading} =
    usePagination(
      'GetListProduct',
      {
        skip: 0,
        limit: 20,
        select: 'id,title,price,images',
        search: debounceSearch,
      },
      productService.getAll,
    );

  const favoriteIds = useMemo(
    () => new Set(favorites.map(fav => fav.id)),
    [favorites],
  );

  const renderItem = useCallback<ListRenderItem<StoreProduct>>(
    ({item}) => {
      const isFavorite = favoriteIds.has(item.id);
      return (
        <ProductItem
          product={item}
          isFavorite={isFavorite}
          onFavorite={onFavorite}
        />
      );
    },
    [favoriteIds, onFavorite],
  );

  const keyExtractor: FlatListProps<StoreProduct>['keyExtractor'] = useCallback(
    (item: StoreProduct) => item.id?.toString() ?? item.title,
    [],
  );
  const {colors} = useTheme();
  return (
    <View style={[flex.flex1, {backgroundColor: colors.background}]}>
      <Header title="Home" iconHome goBackNavigation={() => {}} />
      <SearchComponent
        placeholder="Search..."
        style={[spacing('margin').horizontal, SHADOW_STYLE.shadowCard]}
        onChangeText={onChangeSearch}
        value={search}
      />
      <View style={[spacing('padding').around]}>
        <TextNormal>
          Products List {data && `(${data?.products.length}/${data?.total})`}
        </TextNormal>
      </View>
      <FlatList
        testID="flatlist"
        keyExtractor={keyExtractor}
        data={data?.products}
        renderItem={renderItem}
        ListHeaderComponent={
          isLoading && !data?.products?.length ? (
            <ActivityIndicator size="large" />
          ) : null
        }
        ListEmptyComponent={<EmptyComponent title="No products available !" />}
        contentContainerStyle={[
          flex.gap10,
          spacing('padding').horizontal,
          spacing('padding').bottom,
        ]}
        ListFooterComponent={
          <View style={[spacing('padding', 10).bottom]}>
            {isLoadMore ? <ActivityIndicator size="large" /> : null}
          </View>
        }
        extraData={favoriteIds}
        onRefresh={refresh}
        refreshing={isValidating}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default HomeScreen;
