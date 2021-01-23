# Tech assignment

This project is my solution to the tech assignment I received on 20.1.2021. Assignment focus was on problem solving and maintainability. I address maintainability in the following ways:

- Static type checking with **TypeScript**.
- Documentation in a **JSDoc** manner.
- Dividing methods into testable chunks.
- Unit tests with **Jest**.
- Linting with **ESLint**.
- Enforcing coding style with **Prettier**.

I recommend using ESLint- and Prettier-extensions in Visual Studio Code, if you happen to use that editor.

## Getting started

Prerequisite: `npm` is installed.

### Running locally

    npx serve

### Installing dependencies

    npm install

or

    npm i

### Compiling TS to JS

One-shot: 

    npx tsc

... or continually watching for changes:

    npx tsc -w

### Linting with ESLint

Note: `--fix` handle is baked into the command to automatically fix some errors.

    npm run lint

### Running the tests

    npm run test

or

    npm t
