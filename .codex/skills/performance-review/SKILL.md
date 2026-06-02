---
name: performance-review
description: Use this skill when reviewing a Next.js, React, TypeScript, Leaflet, or static-data web app for performance, bundle size, rendering efficiency, map performance, mobile-first UX, and loading behavior.
---

# Performance Review Skill

You are reviewing the repository for performance issues. Focus on measurable, practical improvements. Do not over-optimize. Prioritize changes that matter for a small mobile-first MVP.

## Scope

Review:

- Next.js App Router structure
- React components
- Leaflet / React Leaflet map implementation
- JSON data loading
- filtering logic
- client/server component boundaries
- CSS and responsive layout
- package dependencies
- public assets

## Project context

This project is a mobile-first responsive web application called Salud Cerca. It uses:

- Next.js
- React
- TypeScript
- Leaflet / React Leaflet
- static JSON data for establishments
- client-side filtering
- pre-geocoded data
- no backend required for the MVP

## Review checklist

### 1. Next.js rendering strategy

Check whether:

- client components are used only where needed
- `page.tsx` remains server-side when possible
- Leaflet is dynamically imported with SSR disabled through a client wrapper
- unnecessary client-side rendering is avoided

### 2. Bundle size

Check whether:

- heavy libraries are imported only where needed
- Leaflet is isolated from the initial server-rendered page
- unused dependencies exist
- components import only what they need

### 3. Map performance

Check whether:

- too many markers are rendered at once
- marker rendering can be optimized
- clustering may be needed for larger datasets
- map re-renders unnecessarily when filters change
- marker icons are loaded efficiently

### 4. Data loading

Check whether:

- `establishments.json` size is reasonable
- large static JSON is loaded all at once
- pagination, slicing, clustering, or server-side filtering may be needed later
- mock data and real data are clearly separated

### 5. React state and memoization

Check whether:

- filtering uses `useMemo` where appropriate
- state is centralized without unnecessary prop drilling
- child components avoid avoidable re-renders
- derived state is not stored unnecessarily

### 6. Mobile-first UX performance

Check whether:

- layout avoids excessive vertical jumps
- map height is appropriate for mobile
- panels/modals do not block core interaction unnecessarily
- controls are touch-friendly
- loading and empty states are handled

### 7. Build and runtime checks

Run or recommend:

- `npm run build`
- `npm run lint`
- `npm audit`
- Lighthouse or browser performance checks if available

## Expected output

Return a structured report in Spanish with:

1. Executive summary
2. Findings by impact:
   - High impact
   - Medium impact
   - Low impact
   - Informational
3. For each finding:
   - title
   - affected file(s)
   - evidence from code
   - performance impact
   - recommended fix
4. Suggested next optimizations
5. Final recommendation

If no issues are found in an impact level, explicitly state: "No se encontraron hallazgos en este nivel."

Do not modify code unless explicitly asked.
