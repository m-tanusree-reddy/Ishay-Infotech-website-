# iSHAY Infotech Website

This repository contains the codebase for the iSHAY Infotech modern landing page and application ecosystem. The frontend is built using React, Vite, Tailwind CSS, and Framer Motion, housed within a monorepo structure.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm**: Managed via `corepack`.

## Setup & Installation

1. **Enable Corepack** (if not already enabled) to use the correct version of `pnpm`:
   ```bash
   corepack enable
   ```

2. **Install Dependencies**:
   From the root directory, run:
   ```bash
   corepack pnpm install
   ```
   *Note for Windows users:* If you face issues with a UNIX `sh` preinstall script failing on Windows during installation, you can bypass it with:
   ```bash
   corepack pnpm install --ignore-scripts
   ```

## Running the Frontend Application Locally

The project requires specific environment variables (`PORT` and `BASE_PATH`) to run cleanly, especially in Windows environments where Vite's `esbuild` dependency might require an explicit binary path.

### For Windows (PowerShell)

Run the following command from the root of the repository. This sets the required variables and explicitly points to the Windows `esbuild` binary to prevent startup crashes:

```powershell
$env:PORT=5173; $env:BASE_PATH='/'; $env:ESBUILD_BINARY_PATH = (Resolve-Path "node_modules/.pnpm/@esbuild+win32-x64@0.27.3/node_modules/@esbuild/win32-x64/esbuild.exe" -ErrorAction SilentlyContinue); corepack pnpm --filter @workspace/ishay-infotech dev
```

### For macOS/Linux (Bash/Zsh)

Run the following command from the root of the repository:

```bash
PORT=5173 BASE_PATH='/' corepack pnpm --filter @workspace/ishay-infotech dev
```

*Once the server starts, you can navigate to `http://localhost:5173` (or the fallback port shown in your terminal, like `5174`) in your browser to view the site.*

## Repository Structure

- `artifacts/ishay-infotech/`: The main React frontend application.
- `artifacts/api-server/`: Backend API server codebase.
- `lib/`: Shared libraries, API spec schemas, database definitions, and API clients.

## Troubleshooting

- **Vite Startup Errors on Windows:** Always ensure `$env:BASE_PATH='/'` and `$env:PORT=5173` are set when running the `dev` command as missing them will throw initialization errors.
- **Port already in use:** If port `5173` is busy, Vite will automatically try the next available port (e.g., `5174`). Check the terminal output to confirm the exact `localhost` URL.
- **App rendering a Blank Page:** The application uses `wouter` for routing and `framer-motion` for animations. Ensure those specific packages are imported instead of alternatives like `react-router-dom` to prevent context crash errors.
