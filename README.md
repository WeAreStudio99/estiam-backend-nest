# Estiam Fullstack Backend Nest

Welcome to the **estiam-backend-nest** development environment setup guide. This document provides comprehensive instructions to facilitate a smooth and consistent setup across various development environments.

### Node.js

[NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) is used to ensure a consistent Node.js version. Install NVM and set the Node.js version for this project with :

```bash
nvm install
```

### Pnpm

[Pnpm](https://pnpm.io/fr/motivation) is the package manager of choice for this project. Activate it through `corepack` :

```bash
corepack enable pnpm
```

To ensure consistent behaviour across all development environments, they should all use the same version of pnpm. That's why an explicit pnpm version is specified in the [package.json](./package.json). Check if your pnpm version is matching the one under the `packageManager` property :

```bash
pnpm -v
```

If it is not the case, install the corresponding version :

```bash
corepack install
```

### Visual Studio Code

Consistency in TypeScript versions is crucial. For VSCode users, ensure that you [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) and not the built-in version provided by VSCode.

### Optional: Optimized VSCode Configuration

For an enhanced development experience with project-specific editor settings, duplicate `.vscode-sample` as `.vscode` :

```bash
cp -R .vscode-sample .vscode
```

## Getting Started

Ensure that you follow the sections below in sequence to set up your development environment without issues. Documentation is provided to guide you through the major setup steps.

### Environment Configuration

Initiate by setting up environment variables. Duplicate `.env.sample` as `.env.`:

```bash
cp .env.sample .env
```

and `docker.env.sample` as `docker.env`:

```bash
cp docker.env.sample docker.env`
```

Amend `.env` and `docker.env` with your specific configurations.

### Dependency Installation

Install necessary project dependencies :

```bash
pnpm install
```

### Dependency Addition & Update (Optional)

To precisely keep track of the dependencies of this application, each dependency should be added with a specific version number :

```bash
pnpm add <pkg> -E
```

Also, for easier dependency updating, you should use the pnpm interactive mode :

```bash
pnpm up -i -L
```

## Running the Application

Execute the app in various modes using :

```bash
# Development mode
pnpm start:dev

# Debug mode
pnpm start:debug

# Production mode
pnpm start:prod
```

## Tooling

There are also several tools available to ensure that all source code complies with established best practices and styling guidelines.

Type-check the codebase :

```bash
pnpm type-check
```

Run the linter :

```bash
pnpm lint
```

Run the formatter :

```bash
pnpm format
```

## Building

Build the app :

```bash
pnpm build
```
