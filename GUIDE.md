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

- config in the end of (highest level) `package.json` file:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "git add ."
  ]
}
```

- run command to initial husky:

```bash
npx husky init
```

- husky will generate `pre-commit` file
- we edit this file with command:

```bash
npm run lint-staged
```

- reconfig `package.json` file, in `script` tag:

```json
"lint-staged": "lint-staged"
```

## COMMITTIZEN

- commitizen is use to create standard commit

```bash
npm install --save-dev commitizen cz-conventional-changelog
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

- we can test it by add some files and type: `npx cz`

## COMMITLINT

- commmitLint is used to check commit format
- it prevents commits that do not follow the pattern
- install commitLint:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

- in `.husky` folder, we create `commit-msg` file with content:

```bash
npx --no-install commitlint --edit "$1"
```

- in root folder, we create `commitlint.config.js` file:

```bash
module.exports = { extends: ['@commitlint/config-conventional'] };
```

- we will try trash commit: `git commit -m "hehe"`

```bash
C:\Users\trung\Documents\LapTrinh\NextJS\basic_160625\ci-cd-practice>git commit -m "hehe"

> my-app@0.1.0 lint-staged
> lint-staged

✔ Backed up original state in git stash (9718b83)
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
⧗   input: hehe
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```