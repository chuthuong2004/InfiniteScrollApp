import {StoreProduct} from '@/types/entities';
import {IMAGES} from '@assets/images';
import {Card, TextNormal} from '@components/shared';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles/flex.style';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type ProductItemProps = {
  product: StoreProduct;
  isFavorite: boolean;
  onFavorite: (product: StoreProduct) => void;
};
const SWIPE_THRESHOLD = 100;
const ProductItem = ({product, isFavorite, onFavorite}: ProductItemProps) => {
  const {colors} = useTheme();
  const translateX = useSharedValue(0);
  const initialTouchLocation = useSharedValue({x: 0, y: 0});

  const backgroundColor = isFavorite ? 'red' : 'green';
  const title = isFavorite ? 'Remove Favorite' : 'Add Favorite';

  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onBegin(evt => {
      initialTouchLocation.value = {x: evt.x, y: evt.y};
    })
    .onTouchesMove((evt, state) => {
      // Sanity checks
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x,
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y,
      );
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        translateX.value = withTiming(0, {duration: 200}, isFinished => {
          if (isFinished) {
            runOnJS(onFavorite)(product);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(backgroundColor),
    opacity: withTiming(
      Math.abs(translateX.value) > SWIPE_THRESHOLD / 2 ? 1 : 0,
    ),
    alignItems: translateX.value > 0 ? 'flex-start' : 'flex-end',
  }));
  return (
    <GestureDetector gesture={gesture}>
      <View style={{position: 'relative'}}>
        <Animated.View
          style={[
            styles.background,
            flex.justifyCenter,
            animatedBackgroundStyle,
          ]}>
          <TextNormal variant="dark">{title}</TextNormal>
        </Animated.View>
        <Animated.View style={[animatedCardStyle, flex.zIndex]}>
          <Card shadow style={[flex.row, flex.gap10, flex.itemsCenter]}>
            <Image
              source={{
                uri: product.images[0],
              }}
              style={[
                styles.productImage,
                {
                  borderColor: colors.border,
                },
              ]}
            />
            <View style={[flex.flex1, flex.gap4]}>
              <TextNormal fontWeight="600" size="md" numberOfLines={2}>
                {product.title}
              </TextNormal>
              <View style={[flex.row, flex.justifyBetween]}>
                <TextNormal>${product.price}</TextNormal>
                <TouchableOpacity
                  testID={`favorite-btn-${product.id}`}
                  onPress={() => onFavorite?.(product)}>
                  <Image
                    source={isFavorite ? IMAGES.favorite : IMAGES.love}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default React.memo(ProductItem);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
  },
  icon: {width: 20, height: 20},
});
