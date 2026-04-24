# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### Ishay Infotech Website (`artifacts/ishay-infotech`)
- **Type**: React + Vite static landing page
- **Preview Path**: `/`
- **Stack**: React, Vite, TailwindCSS, Framer Motion, Lucide React, React Hook Form, Zod
- **Description**: Full-featured IT services landing page for iSHAY Infotech Pvt Ltd. Includes hero, stats, services (cybersecurity, digital forensics, enterprise, AI/ML, staffing, smart solutions), about, why-choose-us, contact form (Google Apps Script integration), and footer.
- **Contact Form**: Uses fetch POST to Google Apps Script URL. Update `GOOGLE_SCRIPT_URL` constant in the contact section component to point to real Apps Script deployment.

## Google Apps Script Setup (for Contact Form)

To connect the contact form to Google Sheets:
1. Create a new Google Sheet
2. Go to Extensions > Apps Script
3. Paste this code:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.email, data.company, data.message]);
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```
4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
5. Copy the deployment URL and replace `PLACEHOLDER_SCRIPT_URL` in the contact component

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
