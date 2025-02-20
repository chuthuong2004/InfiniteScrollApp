import { IMAGES } from '@assets/images';
import { TextNormal } from '@components/shared';
import { TextNormalProps } from '@components/shared/text-normal.component';
import { flex, spacing } from '@styles/index';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
type HeaderProps = {
  title?: string;
  height?: number;
  textTransform?: TextNormalProps['textTransform'];
  goBackNavigation?: () => void;
  iconHome?: boolean;
};
const Header = ({
  title,
  height,
  goBackNavigation,
  textTransform,
  iconHome = false,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        flex.row,
        flex.justifyBetween,
        styles.container,
        height ? {height: height} : {},
        {paddingTop: insets.top},
      ]}>
      <View style={[styles.headingLeft]}>
        {goBackNavigation && (
          <TouchableOpacity
            style={[
              spacing('padding', 0, 16).vertical,
              spacing('padding', 0, 16).right,
            ]}
            onPress={() => goBackNavigation?.()}>
            <Image
              source={iconHome ? IMAGES.home : IMAGES.arrowLeft}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.headingCenter]}>
        {!!title && (
          <TextNormal
            textTransform={textTransform}
            fontWeight="500"
            numberOfLines={1}
            size="xl"
            align="center">
            {title.length > 35 ? title.slice(0, 35) + '...' : title}
          </TextNormal>
        )}
      </View>
      <View style={[styles.headingRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: `${100 / 30}%`,
    zIndex: 10,
  },
  headingLeft: {
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,
  },
  headingCenter: {
    height: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingRight: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    flex: 1,
  },
});
export default React.memo(Header);
