import React from 'react';
import {render} from '@testing-library/react-native';

import App from '../src/App/index';
import Welcome from '../src/screens/Welcome';

jest.mock('@react-native-async-storage/async-storage', () => ({init: () => jest.fn()}));

describe('Load', () => {
  it('should render successfully', () => {
    const {container} = render(<App />);
    expect(container).toBeTruthy();
  });
});

describe('Welcome', () => {
  it('should render successfully', () => {
    const {container} = render(<Welcome />);
    expect(container).toBeTruthy();
  });
});
