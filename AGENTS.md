# AGENTS.md

## Project

Salud Cerca is a mobile-first responsive web application for locating health establishments and pharmacies on an interactive map using open data.

The app helps users find nearby health services and provides simple rule-based orientation. It must not provide medical diagnosis.

## Stack

- Next.js
- React
- TypeScript
- Leaflet / React Leaflet
- Static JSON data

## Commands

- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Run production build: `npm run build`
- Run lint: `npm run lint`

## Architecture

- `app/`: Next.js route entry files.
- `components/SaludCercaApp.tsx`: main interactive app container.
- `components/map/`: Leaflet map components.
- `components/filters/`: filter components.
- `components/orientation/`: simple orientation components.
- `components/establishments/`: establishment detail/list components.
- `components/ui/`: reusable UI components.
- `data/`: static and raw datasets.
- `lib/`: types and pure logic.
- `scripts/`: data cleaning, geocoding, and JSON generation scripts.

## Rules

- Keep `app/page.tsx` minimal.
- Keep interactive state in `components/SaludCercaApp.tsx`.
- Do not add a backend unless explicitly requested.
- Do not implement medical diagnosis logic.
- Orientation must remain rule-based and informational.
- Use LF line endings.
- Prefer small, typed components.
- Do not use `any` unless strictly necessary.
- Do not commit secrets or API keys.
- Do not modify the project architecture without explaining the reason.