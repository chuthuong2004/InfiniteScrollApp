import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, FlatListProps, ListRenderItem, View} from 'react-native';
import {
  EmptyComponent,
  Header,
  ProductItem,
  TextNormal,
} from '../../../components';
import {useFavorite} from '../../../hooks/services';
import {flex, spacing} from '../../../styles';
import {StoreProduct} from '../../../types';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const {favorites, onFavorite} = useFavorite();

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

      <View style={[spacing('padding').around]}>
        <TextNormal>List of favorite products ({favorites.length})</TextNormal>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={favorites}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyComponent title="Không có sản phẩm yêu thích nào." />
        }
        contentContainerStyle={[
          flex.gap10,
          spacing('padding').horizontal,
          spacing('padding').bottom,
        ]}
        // ListFooterComponent={
        //   <View style={[spacing('padding', 10).bottom]}>
        //     {isLoadMore ? <ActivityIndicator size="large" /> : null}
        //   </View>
        // }
        // onRefresh={refresh}
        // refreshing={isValidating}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
        // onEndReached={onEndReached}
      />
    </View>
  );
};

export default FavoriteScreen;
