# Repository guidance for agents

This file defines how AI agents work in `zarishhealth/docs`. The documentation is for technical and non-technical readers, including health-program staff. Use plain language and explain acronyms when they first appear.

## Scope and authority

- Make changes only in this repository unless the user explicitly authorizes another scope.
- Follow system and platform instructions first, this file next, then any more-specific `AGENTS.md`.
- Treat `content/architecture/organization-blueprint.md` as the current organization-wide **proposal**, not proof that a repository, service, control, or feature exists or has been deployed.
- Distinguish verified current state, adopted policy, proposal, and open question. Do not turn a draft decision into an implementation claim.
- Do not edit, rename, or delete `raw_inputs/`. It is a local, ignored source folder, not part of this repository's published content. `raw_files/` is also reserved for ignored local inputs.
- Do not commit, push, publish, or change GitHub settings unless the user explicitly asks.

## Privacy, safety, and claims

- Never add real patient, beneficiary, staff, credential, or other sensitive data. Use clearly synthetic examples only.
- Never put personal data, secrets, access tokens, or private source material in URLs, diagrams, examples, front matter, or issues.
- Do not describe the software or a deployment as HIPAA-, GDPR-, or otherwise compliant, certified, secure, or production-ready without evidence and an authorized review.
- Explain that standards, hosting, and legal obligations depend on implementation and jurisdiction. Link to authoritative sources and mark unresolved items.
- Do not configure public publishing by default. This repository is private and GitHub Pages is disabled as of 2026-10-16. GitHub Pages sites are publicly available even when their source repository is private, if the plan and organization allow Pages; publishing requires an explicit visibility and content review.

## Repository layout

| Path | Purpose |
| --- | --- |
| `content/` | Reviewed, reader-facing documentation |
| `content/architecture/` | Organization blueprint, architecture explanations, and repository maps |
| `content/diagrams/` | Reusable Mermaid source when a diagram is shared by multiple articles |
| `content/glossary/` | Plain-language definitions linked to the blueprint |
| `content/guides/` | Task-oriented instructions |
| `content/reference/` | Stable naming rules and other lookup information |
| `resources/templates/` | Reusable article, decision, and diagram templates |
| `resources/source-corpus-disposition.csv` | Maintainer-only disposition inventory for local source drafts; do not add the source files |
| `resources/resources-registry.csv` | Index of reusable repository resources |
| `agent-skills/skills/` | Reusable agent skills and their registry |
| `static/` | Small, selected assets (copied from `zarishhealth/.github/profile/assets`) for the generated site |
| `raw_inputs/`, `raw_files/` | Ignored local-only intake; never publish |

Tool-required names such as `docusaurus.config.js`, `sidebars.js`, `static/`, `src/`, `README.md`, and GitHub's `.github/` paths are exceptions to the organization-wide kebab-case rule. Use lowercase kebab-case for new content files and directories.

## Writing and diagrams

- Before writing, identify the audience, the one main task or idea, and the content type. Use the templates in `resources/templates/`.
- Start with a short summary. Use descriptive headings, short paragraphs, active voice, and direct instructions.
- Add front matter with a clear `title`, `description`, `status`, `last_reviewed`, and `audience`. Add source links for factual or standards-based claims.
- Use the status values `draft`, `proposed`, `adopted`, `implemented`, or `deprecated`. Use `implemented` only when implementation has been verified.
- Keep one canonical explanation and link to it rather than copying it into several documents.
- Use Mermaid for editable diagrams. Every diagram must have a clear audience and scope, and nearby prose that explains the same information without relying on color or visual interpretation.
- Keep diagrams simple, use descriptive labels, and review them with a non-technical reader where practical. Do not use real or realistic patient examples.
- Use the brand skill for branded assets. Do not invent claims, redraw marks, or create new logo variants.

## Required checks

Use Node.js 24 or later and npm. From the repository root, run:

```bash
npm ci
npm run lint:md
npm run build
```

Fix broken local links, missing images, and Markdown errors introduced by the change. Do not publish build output or add dependencies without a repository need.

## Skills

Read `agent-skills/skills/registry.yaml` and the relevant skill before using a specialized writing or diagram procedure. Read the [brand skill](https://github.com/zarishhealth/.github/blob/main/profile/assets/SKILL.md) and [brand guidelines](https://github.com/zarishhealth/.github/blob/main/profile/assets/BRANDING.md) before creating or changing branded material.
