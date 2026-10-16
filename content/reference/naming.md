---
title: Repository and file naming rules
description: Organization-wide proposed names for repositories, branches, directories, files, and URLs.
slug: /reference/naming
sidebar_position: 2
status: proposed
last_reviewed: "2026-10-16"
audience: Contributors and repository maintainers
---


These organization-wide rules come from the [organization blueprint](../architecture/organization-blueprint.md). The blueprint is a proposal; repository maintainers should adopt the rules before treating them as mandatory.

## General rule

Use lowercase ASCII letters and numbers with hyphens between words. Avoid spaces, underscores, uppercase letters, and names that repeat `zarishhealth` unnecessarily.

| Item | Proposed convention | Example |
| --- | --- | --- |
| Repository | Short, lowercase, descriptive noun | `docs`, `core`, `distro-bd-coxs-bazar-01` |
| Directory | Lowercase kebab-case | `api-contracts/` |
| Markdown, config, or data file | Lowercase kebab-case | `patient-registration-standards.md` |
| Work branch | Type plus issue number and kebab-case summary | `docs/142-offline-sync` |
| ADR | Four-digit number and kebab-case title | `adr/0007-use-uuidv7.md` |
| Public URL segment | Lowercase kebab-case; no trailing slash for API paths | `/api/v1/sync-sessions` |
| Rust source file | Rust convention: snake_case | `conflict_queue.rs` |

## Required exceptions

Keep names required by GitHub or the chosen tools, including `.github`, `README.md`, `AGENTS.md`, `CODEOWNERS`, `LICENSE`, `docusaurus.config.js`, `sidebars.js`, `static/`, and `src/`. Follow external standards for FHIR resource names and other protocol-defined identifiers.

## Stable paths

Treat a published repository name and URL path as permanent. Renaming a repository can break Pages URLs even if GitHub redirects the repository page. Never put a person's name, date of birth, national identifier, phone number, or other personal data in a URL or identifier.

## Quick review

- [ ] The name describes the purpose.
- [ ] It uses the allowed characters for its type.
- [ ] It does not duplicate the organization name or add a language suffix without a standard requiring it.
- [ ] A published URL will remain stable.
- [ ] It contains no personal data or secrets.

For the complete proposal and exceptions, see [Naming rules in the organization blueprint](../architecture/organization-blueprint.md#4-naming-rules-normative).
