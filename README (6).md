# iSHAY Infotech Website

Welcome to the **iSHAY Infotech** website repository! This project contains the modern landing page and application ecosystem for iSHAY Infotech.

## 📋 Project Overview

This repository features a full-stack web application ecosystem built with modern web technologies:

- **Frontend Application**: React-based SPA with Vite, Tailwind CSS, and Framer Motion
- **Backend API Server**: RESTful API for application functionality
- **Shared Libraries**: Reusable components, schemas, and API clients

### Tech Stack

| Language | Percentage | Purpose |
|----------|-----------|---------|
| **TypeScript** | 95.8% | Primary language for type-safe development |
| **CSS** | 2.5% | Styling and layout |
| **Other** | 1.7% | Additional configuration and assets |

## 📦 Prerequisites

- **Node.js** (v18 or higher recommended)
- **pnpm**: Managed via `corepack`

## 🚀 Setup & Installation

### Step 1: Enable Corepack

Enable Corepack (if not already enabled) to use the correct version of `pnpm`:

```bash
corepack enable
```

### Step 2: Install Dependencies

From the root directory, run:

```bash
corepack pnpm install
```

**Note for Windows users**: If you face issues with a UNIX `sh` preinstall script failing on Windows during installation, you can bypass it with:

```bash
corepack pnpm install --ignore-scripts
```

## 💻 Running the Frontend Application Locally

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

Once the server starts, navigate to `http://localhost:5173` (or the fallback port shown in your terminal, such as `5174`) in your browser to view the site.

## 📁 Repository Structure

```
.
├── artifacts/
│   ├── ishay-infotech/     # Main React frontend application
│   └── api-server/          # Backend API server codebase
├── lib/                     # Shared libraries
│   ├── API schemas and specs
│   ├── Database definitions
│   └── API clients
└── ...
```

## 🔧 Troubleshooting

### Vite Startup Errors on Windows
Always ensure `$env:BASE_PATH='/'` and `$env:PORT=5173` are set when running the `dev` command. Missing these will throw initialization errors.

### Port Already in Use
If port `5173` is busy, Vite will automatically try the next available port (e.g., `5174`). Check the terminal output to confirm the exact `localhost` URL.

### Application Rendering a Blank Page
The application uses `wouter` for routing and `framer-motion` for animations. Ensure those specific packages are imported instead of alternatives like `react-router`.

### Dependency Issues
If you encounter dependency conflicts:
1. Clear the cache: `corepack pnpm store prune`
2. Reinstall: `corepack pnpm install`
3. Check Node.js version compatibility: `node --version`

## 📚 Key Technologies

- **React** - UI framework
- **TypeScript** - Type-safe programming
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Wouter** - Lightweight routing
- **pnpm** - Fast, disk space efficient package manager

## 🎯 About iSHAY Infotech

iSHAY Infotech is a technology company dedicated to delivering innovative solutions. This website serves as our digital presence and gateway to our services and expertise.

## 📝 License

Please refer to the LICENSE file in this repository for licensing information.

## 🤝 Contributing

Contributions are welcome! Please ensure all code follows the project's TypeScript and styling guidelines.

---

**Last Updated**: May 2026
