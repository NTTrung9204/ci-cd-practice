import { render, screen } from '@testing-library/react';
import Page from '../page';
import { JSX } from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
}));

describe('Page', () => {
  it('renders profile image', () => {
    render(<Page />);
    const image = screen.getByAltText('Profile');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/profile.png');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });
});
