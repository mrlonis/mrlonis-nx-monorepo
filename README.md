# Mrlonis - Nx Angular - Monorepo

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/react-tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mrlonis/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

## Notes

### Generating a new TypeScript Library

Run the command `nx g @nrwl/workspace:library my-lib-name`

[Reference](https://nx.dev/packages/workspace/generators/library)

### Adding @angular/material to an Angular application

Run the command: `nx g @angular/material:ng-add --project=my-app-name`

[Reference](https://stackoverflow.com/a/71275473)

### Generating a new Angular Application

Run the command `nx g @nrwl/angular:application my-app-name`

[Reference](https://nx.dev/packages/angular/generators/application)

### Generating a new Angular Library

Run the command `nx g @nrwl/angular:library my-lib-name`

[Reference](https://nx.dev/packages/angular/generators/library)

### Generating a new Angular Component

Run the command `nx g @nrwl/angular:component my-component-name --project=my-app-name`

Example: `nx g @nrwl/angular:component my-component-name --project=my-app-name`

[Reference](https://nx.dev/packages/angular/generators/component)

### Old .eslintrc.json

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": ["tsconfig.json"]
      }
    }
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/recommended--extra",
        "plugin:@angular-eslint/template/process-inline-templates",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
        // "plugin:jsdoc/recommended",
        "plugin:prettier/recommended"
        // "plugin:storybook/recommended"
      ],
      "plugins": ["deprecation"],
      "rules": {
        "deprecation/deprecation": "error",
        "@typescript-eslint/unbound-method": ["error", { "ignoreStatic": true }],
        "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
        "import/no-unresolved": "error",
        "import/order": "error",
        "prettier/prettier": ["error", { "singleQuote": true, "printWidth": 125, "tabWidth": 2 }]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": ["plugin:prettier/recommended"],
      "rules": {
        "prettier/prettier": ["error", { "parser": "angular", "printWidth": 125, "tabWidth": 2 }]
      }
    }
  ]
}
```

## Ports

- 4200 - ui-afk-arena
- 4201 - ui-genshin-impact
- 4202 - ui-mythic-heroes
- 4203 - ui-personal-website
- 4204 - ui-ps-angular-forms
- 4205 - ui-ps-angular-fundametals
- 4206 - ui-ps-angular-getting-started
