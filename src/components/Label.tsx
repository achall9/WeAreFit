import React from 'react';
import {Text, ITextProps} from 'native-base';

const sizes = {
  '3xlarge': ['3xl', '3xl', '3xl'],
  '2xlarge': ['2xl', 'xl', '2xl'],
  xlarge: ['xl', 'lg', 'xl'],
  large: ['lg', 'md', 'lg'],
  medium: ['md', 'sm', 'md'],
  small: ['sm', 'xs', 'sm'],
  xsmall: ['xs', '2xs', 'xs'],
};

type Props = ITextProps & {
  sz: '3xlarge' | '2xlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
  fontWeight?: string;
};

const Label = ({children, sz, fontWeight, ...rest}: Props) => {
  return (
    <Text fontSize={sizes[sz]} fontWeight={fontWeight ? fontWeight : 'semibold'} {...rest}>
      {children}
    </Text>
  );
};

export default Label;
