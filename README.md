# Rohmée Family Budget (Starter)

Modular, zero-dependency (vanilla JS + SVG) dashboard. Built with **Vite** for fast dev/hot reload and optimized builds.

## Quick start (no terminal optional)
- Upload this folder to a new GitHub repo: `rohmee-family-budget`
- Connect the repo to **Netlify**
  - Build command: `npm run build`
  - Publish directory: `dist`
- Each Pull Request gets a **Preview URL**. Merging to `main` updates production.

## Local development (optional)
```bash
npm i
npm run dev    # http://localhost:5173
npm run build  # outputs to /dist
```

## Data
- Stored in `localStorage` under key: `rohmee_budget_live`
- Use **Save JSON / Load JSON** buttons in the UI to back up and transfer data
- Migrations are handled in `src/state/storage.js`

## Category tags
- Categories can be tagged as Fixed, Variable, or Savings.
- "Investments" is tagged as Savings by default so it appears in Savings views and is excluded from expense charts.

## Structure
```
src/
  charts/         # one module per chart
  state/          # storage, calc helpers, default model
  ui/             # controls + editable table
  main.js         # wires everything
public/
  index.html      # shell
```
