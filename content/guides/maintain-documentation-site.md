---
title: Preview and maintain the documentation site
description: Install the locked tools, preview the site, and run the same checks as CI.
slug: /guides/maintain-documentation-site
sidebar_position: 3
status: adopted
last_reviewed: "2026-10-16"
audience: Contributors and maintainers
---


The documentation site is built from Markdown in `content/`. Docusaurus generates a static preview; GitHub Actions checks formatting and links but does not publish the site.

## Requirements

- Node.js 24 or later
- npm
- A local clone of `zarishhealth/docs`

The dependency versions are pinned in `package.json` and `package-lock.json`. Use `npm ci` so the local install matches CI.

## Preview a change

From the repository root, run:

```bash
npm ci
npm run start
```

Open the local address printed by Docusaurus. The preview reloads when you save a content change. Stop it with `Ctrl+C`.

## Validate before opening a pull request

```bash
npm run lint:md
npm run build
```

The Markdown linter checks all tracked Markdown sources. The site build checks page configuration, Mermaid integration, and local links. Review the browser output too; automated checks cannot judge clarity, accessibility, or factual accuracy.

The GitHub Actions workflow runs these checks for pushes to `main`, pull requests, and manual dispatch. Third-party actions are pinned to full commit SHAs.

## Update a branded site asset

The source artwork remains in `assets/`. The site uses selected copies under `static/img/`. When an approved source logo or favicon changes:

1. Read [the brand skill](https://github.com/zarishhealth/docs/blob/main/assets/SKILL.md) and [brand guidelines](https://github.com/zarishhealth/docs/blob/main/assets/BRANDING.md).
2. Copy only the approved source file into the matching `static/img/` location, preserving its filename.
3. Check that `docusaurus.config.js` still points to the file.
4. Preview the light and dark themes, then run the Markdown and build checks.

Do not redraw a logo, use an unapproved variant, or add unverified certification or compliance claims.

## Publication status

This repository is private and GitHub Pages is disabled as of 2026-10-16. The site configuration contains the planned `/docs/` project path, but no deployment workflow exists. Before enabling public publishing, review repository visibility, all content and assets, license terms, links, and the intended publication owner.

## Upgrade dependencies

1. Review the upstream release notes and supported Node.js versions.
2. Update the exact version in `package.json`.
3. Regenerate `package-lock.json` with npm.
4. Run `npm run check` and review the built site.
5. Record any behavior or migration changes in the pull request.

Do not upgrade from a version number alone; confirm that the selected versions are maintained and compatible.
