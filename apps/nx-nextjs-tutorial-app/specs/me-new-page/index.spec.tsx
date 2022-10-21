import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import MyNewPage from '../../pages/my-new-page';

describe('MyNewPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyNewPage />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(baseElement).toBeTruthy();
  });
});
