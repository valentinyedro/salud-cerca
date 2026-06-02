---
name: security-review
description: Use this skill when reviewing a web application repository for security risks, especially Next.js, React, TypeScript, Leaflet, static JSON data, environment variables, public assets, forms, API routes, and deployment configuration.
---

# Security Review Skill

You are reviewing the repository for practical security risks. Focus on concrete, actionable findings. Do not invent vulnerabilities. If something cannot be verified from the codebase, state that it was not found or requires confirmation.

## Scope

Review:

- Next.js App Router files under `app/`
- React components under `components/`
- data files under `data/`
- utility logic under `lib/`
- scripts under `scripts/`
- environment variable usage
- package dependencies and scripts
- public assets
- API routes if present

## Project context

This project is a mobile-first responsive web application called Salud Cerca. It uses:

- Next.js
- React
- TypeScript
- Leaflet / React Leaflet
- static JSON data for establishments
- no backend required for the MVP
- no authentication
- no real-time data
- no medical diagnosis, only basic orientation

## Review checklist

### 1. Secrets and environment variables

Check whether:

- secrets are committed to the repository
- `.env` files are tracked
- API keys are exposed in client-side code
- public environment variables are correctly prefixed with `NEXT_PUBLIC_` only when safe
- geocoding keys or tokens are hardcoded

### 2. Client-side data exposure

Check whether:

- sensitive or private data is included in `data/`
- datasets expose unnecessary personal information
- mock data is clearly non-sensitive
- public JSON files contain only information suitable for client-side delivery

### 3. Input and rendering safety

Check whether:

- user-controlled text is rendered safely
- `dangerouslySetInnerHTML` is used
- URLs from datasets are validated before rendering links
- external links use safe attributes when needed

### 4. Dependency risk

Check whether:

- dependencies are appropriate for the app
- suspicious or unused dependencies exist
- `npm audit` reports critical or high vulnerabilities
- package scripts perform unexpected actions

### 5. Next.js and React security

Check whether:

- API routes exist and validate inputs
- server/client component boundaries are reasonable
- client components do not expose server-only logic
- redirects or dynamic URLs are safe

### 6. Data processing scripts

Check whether scripts:

- validate CSV input
- handle malformed rows
- avoid overwriting important files accidentally
- avoid logging secrets or large sensitive data
- respect geocoding service limits if applicable

### 7. Medical safety

Check whether the app avoids medical diagnosis claims.

Verify that orientation text clearly states:

- it is not a medical diagnosis
- it only helps locate a type of establishment
- emergencies require contacting emergency services or going to an appropriate urgent care provider

## Expected output

Return a structured report in Spanish with:

1. Executive summary
2. Findings by severity:
   - Critical
   - High
   - Medium
   - Low
   - Informational
3. For each finding:
   - title
   - affected file(s)
   - evidence from code
   - risk
   - recommended fix
4. Quick wins
5. Final recommendation

If no issues are found in a severity level, explicitly state: "No se encontraron hallazgos en esta severidad."

Do not modify code unless explicitly asked.
