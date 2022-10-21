import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import NxNextjsTutorialPublishableLib from './nx-nextjs-tutorial-publishable-lib';

describe('NxNextjsTutorialPublishableLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NxNextjsTutorialPublishableLib />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(baseElement).toBeTruthy();
  });
});
