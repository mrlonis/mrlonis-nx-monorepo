import { render } from '@testing-library/react';
import NxReactTutorialCommonUi from './nx-react-tutorial-common-ui';

describe('NxReactTutorialCommonUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NxReactTutorialCommonUi />);
    expect(baseElement).toBeTruthy();
  });
});
