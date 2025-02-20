import React, {forwardRef} from 'react';
import {TextInput} from 'react-native';

import InputComponent, {InputComponentProps} from './input.component';

export interface SearchProps extends InputComponentProps {}

const SearchComponent = forwardRef<TextInput, SearchProps>((props, ref) => {
  const {...rest} = props;

  return (
    <InputComponent
      ref={ref}
      {...rest}
      inputStyle={{borderRadius: 50, paddingLeft: 20}}
    />
  );
});
export default React.memo(SearchComponent);
