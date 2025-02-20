import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {flex} from '../styles';
import {StoreProduct} from '../types';
import Card from './Card';
import TextNormal from './TextNormal';
import favoriteIcon from '../assets/images/love.png';
import favoriteActiveIcon from '../assets/images/favorite.png';

type ProductItemProps = {
  product: StoreProduct;
  isFavorite: boolean;
  onFavorite: (product: StoreProduct) => void;
};
const ProductItem = ({product, isFavorite, onFavorite}: ProductItemProps) => {
  const {colors} = useTheme();
  console.log('ProductItem -> product', product.id);

  return (
    <Card shadow style={[flex.row, flex.gap10, flex.itemsCenter]}>
      <Image
        source={{
          uri: product.images[0],
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      />
      <View style={[flex.flex1, flex.gap4]}>
        <TextNormal fontWeight="600" size="md" numberOfLines={2}>
          {product.title}
        </TextNormal>
        <View style={[flex.row, flex.justifyBetween]}>
          <TextNormal>${product.price}</TextNormal>
          <TouchableOpacity onPress={() => onFavorite?.(product)}>
            <Image
              source={isFavorite ? favoriteActiveIcon : favoriteIcon}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default React.memo(ProductItem);
