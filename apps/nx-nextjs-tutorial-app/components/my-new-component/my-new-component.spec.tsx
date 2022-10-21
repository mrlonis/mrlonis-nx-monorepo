import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import MyNewComponent from './my-new-component';

describe('MyNewComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyNewComponent />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(baseElement).toBeTruthy();
  });
});
