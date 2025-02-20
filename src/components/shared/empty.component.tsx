import {View} from 'react-native';
import TextNormal from './text-normal.component';
import React from 'react';

type EmptyComponentProps = {
  title?: string;
};
const EmptyComponent = ({
  title = 'No data available !',
}: EmptyComponentProps) => {
  return (
    <View>
      <TextNormal align="center" variant="info">
        {title}
      </TextNormal>
    </View>
  );
};
export default EmptyComponent;
