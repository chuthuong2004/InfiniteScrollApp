import React, { forwardRef } from 'react';
import {
  TextInput
} from 'react-native';

// ** Components

// ** React navigation
import InputComponent, { InputComponentProps } from './input.component';

export interface SearchProps extends InputComponentProps {}
// eslint-disable-next-line react/display-name
const SearchComponent = forwardRef<TextInput, SearchProps>((props, ref) => {
  const {...rest} = props;

  return <InputComponent {...rest} inputStyle={{borderRadius: 50}}  />;
});
export default React.memo(SearchComponent);
