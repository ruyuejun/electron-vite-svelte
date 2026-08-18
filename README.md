# Electron Vite Svelte

A modern desktop application template built with [Electron](https://www.electronjs.org/), [Svelte](https://svelte.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev/).

The template includes a practical development workflow with code quality checks, formatting, conventional commits, Git hooks, automatic updates, and packaging support.

## Features

- Electron 43
- Svelte 5
- TypeScript
- Vite-powered development and production builds
- Electron main process and preload process support
- Tailwind CSS and Sass
- Electron Builder packaging configuration
- Electron Updater integration
- Vitest and Playwright setup
- Oxlint and Oxfmt for linting and formatting
- Commitizen and Commitlint for consistent commit messages
- Lefthook Git hooks
- AVIF image conversion utility
- Separate development and production environment files

## Requirements

- Node.js 20 or newer
- pnpm 9 or newer
- Git
- Python 3.12 or newer

Check your installed versions:

```bash
node --version
pnpm --version
git --version
python -V
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd electron-vite-svelte
pnpm install
pnpm run dev # pnpm run dev:h5 will start the web server without electron
```

The `prepare` script installs the configured Lefthook Git hooks automatically after installation.

If the network connection is poor, you can directly download the zip archive of electron and replace the install.js file in node_modules/electron：

```js
// downloadArtifact.then(extractFile) ->
extractFile('/Users/mac/Downloads/electron-v43.4.0-darwin-arm64.zip')

// then run
pnpm store prune
pnpm i
```

## Development

Start the Vite development server:

```bash
pnpm dev
```

The development environment is configured through `.env.development`. Update the values in that file when your local API or WebSocket services use different addresses.

## Build

Build the application for production:

```bash
pnpm build
```

Preview the generated Vite output:

```bash
pnpm preview
```

The production build output is generated in the `dist` directory. Electron packaging output is configured to use the `release` directory.

If you cann't download the dmgbuild-bundle, you can set mirror like this：

```txt
# Mac
export ELECTRON_BUILDER_BINARIES_MIRROR="https://cdn.npmmirror.com/binaries/electron-builder-binaries"

# Windows (CMD)
set ELECTRON_BUILDER_BINARIES_MIRROR="https://cdn.npmmirror.com/binaries/electron-builder-binaries"

# Windows (PowerShell)
$env:ELECTRON_BUILDER_BINARIES_MIRROR="https://cdn.npmmirror.com/binaries/electron-builder-binaries"
```

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the application for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run Oxlint |
| `pnpm lint:fix` | Fix automatically repairable lint issues |
| `pnpm format` | Format supported files with Oxfmt |
| `pnpm format:check` | Check formatting without changing files |
| `pnpm commit` | Stage changes and open the Commitizen prompt |
| `pnpm pull` | Pull changes from the configured Git remote |
| `pnpm push` | Push changes to the configured Git remote |
| `pnpm img2avif` | Convert images to AVIF using the bundled utility |
| `pnpm prepare` | Install Lefthook Git hooks |

## Project Structure

```text
.
├── electron
│   ├── main       # Electron main process
│   └── preload    # Secure renderer bridge
├── img2avif       # Image conversion utility
├── src
│   ├── assets     # Static assets
│   ├── App.svelte # Main Svelte component
│   ├── index.html # Renderer HTML entry
│   └── main.ts    # Renderer entry point
├── .env.development
├── .env.production
├── lefthook.yml
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Code Quality and Git Hooks

This template uses Lefthook to automate repository checks:

- `pre-commit` runs lint checks for staged files.
- `commit-msg` validates commit messages with Commitlint.
- `pre-push` runs a production build when frontend-related files have changed.

Commit messages should follow the configured Conventional Commits format:

```text
<type>(<scope>): <subject>
```

Use the interactive commit prompt when possible:

```bash
pnpm commit
```

You can also validate the code manually before committing:

```bash
pnpm lint
pnpm format:check
pnpm build
```

## Testing

Vitest and Playwright are included in the development dependencies. Add unit tests and end-to-end tests according to the needs of your application, then run them with the corresponding test runner commands.

## Packaging

Electron Builder is configured in `package.json` with the application ID `com.electron.svelte.app` and the output directory `release`.

Before producing release artifacts, verify the application metadata, icons, platform targets, signing configuration, and update provider settings for your distribution environment.

## Image Conversion

The repository includes a small utility for converting images to AVIF format. Run it with:

```bash
pnpm img2avif
```

Review the utility configuration before using it in a production asset pipeline.

## Customization

1. Update the application metadata in `package.json`.
2. Replace the starter UI in `src/App.svelte`.
3. Add renderer features under `src`.
4. Add Electron-native behavior under `electron/main`.
5. Expose only the required APIs through `electron/preload`.
6. Update environment files for your development and production services.
7. Configure Electron Builder for your target platforms and release process.

## License

This project is licensed under the [MIT License](LICENSE).
