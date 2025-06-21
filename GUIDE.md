## ESLINT & PRETTIER

### INSTALL ENVIRONMENT

- eslint & prettier help us define code convention for team work, it's always check code format and show error
- install lib

```bash
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```

- config eslint in `eslint.config.mjs` file, (or `.eslintrc.js`) but don't use both

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["prettier"],
    rules: {
      //
      "prettier/prettier": "error",
    },
  }),
];

export default eslintConfig;
```

- config in `.prettierrc` file:

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- ignore some file, create `.prettierignore` in root folder

```bash
build/
public
node_modules/
package-lock.json
yarn.lock
.yarn/
.next
```

- update `package.json` file

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}

```

### DEMO

- create `page.tsx` file in `src/app/about`

```tsx
export default function About() {
  let x =10
  return (
    <div className=""><h1 className="">About</h1>
    </div>
  )
}
```

- run command:

```bash
npm run lint
```

- result:

```bash
./src/app/about/page.tsx
2:7  Error: 'x' is never reassigned. Use 'const' instead.  prefer-const
2:7  Error: 'x' is assigned a value but never used.  @typescript-eslint/no-unused-vars
2:10  Error: Replace `10` with `·10;`  prettier/prettier
4:23  Error: Insert `⏎······`  prettier/prettier
6:4  Error: Insert `;`  prettier/prettier
```

- to VSCode auto check convention, we need to add this to `settings.json` (type `ctrl + shift + p`, `enter to Preferences: Open Settings (JSON)`)

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

- to format code, we run command:

```bash
npm run format
```

- we can setting auto format: in setting VSCode, find `Editor: Default Formatter`, we choose `prettier`
- if typing `ctrl + s`, code will be automatically formatted

## HUSKY & LINT-STAGED

- husky & lint-staged are use to run eslint and prettier in staged-file (git)

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

- config in `package.json`:

```json
"lint-staged": {
"src/**/*.{js,ts,jsx,tsx}": [
    "eslint --fix",
    "prettier --write"
],
"src/**/*.{json,css,md}": [
    "prettier --write"
]
}
```

## COMMITLINT

- commmitLint is used to check commit format
- it prevents commits that do not follow the pattern