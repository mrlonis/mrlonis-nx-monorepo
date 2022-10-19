# Mrlonis - Nx Angular - Monorepo

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Index

- [Quick Start & Documentation](#quick-start--documentation)
- [Adding capabilities to your workspace](#adding-capabilities-to-your-workspace)
- [Generate an application](#generate-an-application)
- [Generate a library](#generate-a-library)
- [Development server](#development-server)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Understand your workspace](#understand-your-workspace)
- [☁ Nx Cloud](#-nx-cloud)
- [Project Ports](#project-ports)

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

### Generating a new Angular Application

Run the command `nx g @nrwl/angular:application my-app-name`

[Reference](https://nx.dev/packages/angular/generators/application)

#### Generating a new Angular Application with Karma test runner

Run the command `nx g @nrwl/angular:application my-app-name --unitTestRunner=karma`

#### Adding @angular/material to an Angular application

Run the command: `nx g @angular/material:ng-add --project=my-app-name`

[Reference](https://stackoverflow.com/a/71275473)

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mrlonis/mylib`.

### Generating a new TypeScript Library

Run the command `nx g @nrwl/workspace:library my-lib-name`

[Reference](https://nx.dev/packages/workspace/generators/library)

#### Generating a new buildable TypeScript Library

Run the command `nx g @nrwl/workspace:library my-lib-name --buildable`

### Generating a new Angular Library

Run the command `nx g @nrwl/angular:library my-lib-name`

[Reference](https://nx.dev/packages/angular/generators/library)

#### Generating a new Angular Library with Karma test runner

Run the command `nx g @nrwl/angular:library my-lib-name --unitTestRunner=karma`

#### Generating a new buildable Angular Library

Run the command `nx g @nrwl/angular:library my-lib-name --buildable`

#### Generating a new publishable Angular Library

Run the command `nx g @nrwl/angular:library my-lib-name --publishable --importPath='some-path-to-import or like this @some/path-to-import'`

**Note**: A Publishable library is also a buildable library, it is just built using partial compilation. Generating a "buildable / publishable" library likw `nx g @nrwl/angular:library my-lib-name --buildable --publishable --importPath='some-path-to-import or like this @some/path-to-import'` is ultimately redundant. It will not cause an error but there is no reason to pass the buildable flag.

## Development server

Run `ng serve my-app` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Generating a new Angular Component

Run the command `nx g @nrwl/angular:component my-component-name --project=my-app-name`

Example: `nx g @nrwl/angular:component --name=my-component-name --path='apps/ngx-test-application/src/app/features' --project=my-app-name --module=my-module --style=scss`

`nx g @nrwl/angular:component --name=anime-grid --path='apps/ngx-test-application/src/app/features' --project=ngx-test-application --module=app --style=scss`

[Reference](https://nx.dev/packages/angular/generators/component)

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

## Project Ports

- 4211 - ngx-ui-afk-arena
- 4201 - ngx-ui-genshin-impact
- 4202 - ngx-ui-mythic-heroes
- 4203 - ngx-ui-personal-website
- 4204 - ps-angular-forms
- 4205 - ps-angular-fundamentals
- 4206 - ps-angular-getting-started
- 4207 - ngx-table-virtual-scroll-sticky-headers
- 4208 - ngx-virtual-scroll-cdk-table-example
- 4209 - ngx-table-virtual-scroll-example
- 4210 - ngx-test-application
- 4212 - nx-angular-tutorial-todos
- 3333 - nx-angular-tutorial-api
- 4213 - nx-react-tutorial-admin
- 4214 - nx-react-tutorial-store
