# `docs` repository agent contract

This file is the operating contract for AI agents working inside `zarishhealth/docs`. It is designed for Mohammad Ariful ISLAM, a non-coder Health Program Manager.

> **Scope:** An agent should do everything needed to complete an approved task **inside this repository and within granted permissions**. “Everything” never means inventing authority, bypassing review, exposing sensitive data, or changing external systems without approval.

## 1. Instruction priority

Follow instructions in this order:

1. System, platform, and provider safety requirements.
2. This repository's `AGENTS.md`.
3. The nearest more-specific `AGENTS.md` inside a subdirectory, if one is later added.
4. The current file's local conventions and existing structure.

When instructions conflict, stop and report the conflict instead of silently choosing.

## 2. Mission and repository boundary

`docs` is a private, version-controlled documentation hub. It stores reviewed explanations, source-linked context, reusable resources, raw intake catalogs, diagrams as code, metadata as code, and deterministic helpers.

It is **not** a secret manager, clinical system, beneficiary database, unrestricted AI memory, public website, or promise of unlimited free hosting. Do not add Google Workspace connections, paid services, provider credentials, or automatic external writes unless a named human approves the specific change.

## 3. Folder routing

| Need | Folder | Rule |
|---|---|---|
| Raw file, URL list, image, or note | `raw_inputs/` | Untrusted until reviewed; catalog, do not interpret as truth |
| Human-readable reviewed document | `content/` | Include purpose, status, sources, review date, and open questions |
| Approved source-linked facts | `.agents/context/` | Record source, owner, freshness, and confidence |
| Reusable guide, checklist, or template | `resources/` | Use synthetic examples; link back to evidence |
| Machine-readable identity or status | `data/` | JSON; preserve provider IDs and explicit placeholders |
| Workflow or relationship | `content/diagrams/` | Mermaid source is canonical and must remain editable |
| Step-by-step maintenance instructions | `guides/` | Plain language, exact folder, command, and check |
| Deterministic helper | `scripts/` | Standard library where practical; no silent network or provider calls |

Do not create a new top-level folder for a single file without documenting the decision first.

## 4. Reusable skills and agents

The canonical reusable skills and role definitions live in [`.agents/skills`](https://github.com/zarishhealth/docs/.agents/skills). Read its `registry.yaml` and the relevant `SKILL.md` before using a specialized procedure.

Use the smallest suitable role and skill:
