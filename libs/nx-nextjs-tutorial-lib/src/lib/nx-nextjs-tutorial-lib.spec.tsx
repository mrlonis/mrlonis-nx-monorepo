import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import NxNextjsTutorialLib from './nx-nextjs-tutorial-lib';

describe('NxNextjsTutorialLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NxNextjsTutorialLib />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(baseElement).toBeTruthy();
  });
});
