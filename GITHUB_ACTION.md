## GIBHUB ACTION

### SETUP JEST FOR CREATE TESTING

- install required libraries

```bash
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest
npm install --save-dev ts-jest @types/jest
npm install --save-dev jest-environment-jsdom
```

- config and setuo `jest`:
- create `jest.config.mjs` in the root folder

```mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default createJestConfig(config);
```

- create `jest.setup.js` in the root folder

```js
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
```

- in `package.json` add this script

```json
"test": "jest --coverage"
```

- create `setupTests.ts` file in `app` folder
- it helps expand expect function

```ts
import '@testing-library/jest-dom';
```

- create `UserProfile.tsx` file in `src/app/components/UserProfile.tsx`

```tsx
import Image from 'next/image';

interface UserProfileProps {
  name: string;
  role: string;
  imageUrl?: string;
}

export default function UserProfile({
  name,
  role,
  imageUrl = '/profile.png',
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100">
      <Image
        src={imageUrl}
        alt={`${name}'s profile`}
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
}
```

- write units test in `src/app/components/__test__/UserProfile.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import UserProfile from '../UserProfile';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
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
```

- to start testing, we can use this command:

```bash
npm run test
```

- results:

```bash
C:\Users\trung\Documents\LapTrinh\NextJS\basic_160625\ci-cd-practice>npm run test

> my-app@0.1.0 test
> jest --coverage

 PASS  src/app/components/__tests__/UserProfile.test.tsx
 PASS  src/app/__tests__/page.test.tsx
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |
 app              |     100 |      100 |     100 |     100 |
  page.tsx        |     100 |      100 |     100 |     100 |
 app/components   |     100 |      100 |     100 |     100 |
  UserProfile.tsx |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.44 s
Ran all test suites.
```

- setup checks in `package.json`

```json
"check": "npm run lint && npm run format && npm run type-check && npm run build",
```