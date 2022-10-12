import { render } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  it('should render and match snapshot', () => {
    const { container, rerender } = render(<Label value='Test Value' />);
    expect(container).toMatchSnapshot();
    rerender(<Label value='Test Value' width={200} />);
    expect(container).toMatchSnapshot();
  });
});
