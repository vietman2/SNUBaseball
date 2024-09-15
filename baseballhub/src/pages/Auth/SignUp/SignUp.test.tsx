import { fireEvent, screen } from '@testing-library/react';

import { SignUp } from './SignUp';
import { renderWithProviders } from '@utils/test-utils';

describe('<SignUp />', () => {
  it('renders without crashing', () => {
    renderWithProviders(<SignUp />);

    fireEvent.click(screen.getByTestId('button-회원가입'));
  });
});
