import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';
import { JSX } from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img']) => <img {...props} />,
}));

describe('UserProfile', () => {
  const defaultProps = {
    name: 'John Doe',
    role: 'Developer',
  };

  it('renders user information correctly', () => {
    render(<UserProfile {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByAltText("John Doe's profile")).toBeInTheDocument();
  });

  it('uses default profile image when imageUrl is not provided', () => {
    render(<UserProfile {...defaultProps} />);
    const image = screen.getByAltText("John Doe's profile");
    expect(image).toHaveAttribute('src', '/profile.png');
  });

  it('uses custom image URL when provided', () => {
    const customImageUrl = '/custom-profile.jpg';
    render(<UserProfile {...defaultProps} imageUrl={customImageUrl} />);
    const image = screen.getByAltText("John Doe's profile");
    expect(image).toHaveAttribute('src', customImageUrl);
  });
});
