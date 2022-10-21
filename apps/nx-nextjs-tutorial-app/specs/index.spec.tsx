import { render } from '@testing-library/react';
// eslint-disable-next-line import/default
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import Index from '../pages';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(baseElement).toBeTruthy();
  });
});
