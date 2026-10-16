---
title: Technology baseline snapshot
description: A dated check of the proposed stack against primary release sources.
slug: /reference/technology-baseline
sidebar_position: 3
status: proposed
last_reviewed: "2026-10-16"
audience: Maintainers and technical reviewers
---

This page records a **point-in-time check**, not an approved production stack. The organization blueprint is still a proposal, and none of the versions below proves that a ZarishHealth application uses that technology. Recheck upstream support, compatibility, security advisories, and deployment constraints before starting implementation.

## Proposed stack and upstream snapshot

| Component | Blueprint proposal | Upstream version or status checked 2026-10-16 | Primary source |
| --- | --- | --- | --- |
| Rust toolchain | Rust backend | Stable `1.99.1` | [Rust release](https://github.com/rust-lang/rust/releases/latest) and [stable channel manifest](https://static.rust-lang.org/dist/channel-rust-stable.toml) |
| HTTP framework | Axum `0.8.x` | Latest published `0.8.9` | [Axum on crates.io](https://crates.io/crates/axum) |
| Async runtime | Tokio | Latest published `1.53.3` | [Tokio on crates.io](https://crates.io/crates/tokio) |
| Database toolkit | SQLx | Latest published `0.9.0` | [SQLx on crates.io](https://crates.io/crates/sqlx) |
| Desktop/mobile shell | Tauri `2.x` | Latest stable `2.x` package checked: `2.12.4`. Upstream also has `3.0.0-alpha.5`; do not treat an alpha as a stable-version recommendation. | [Tauri 2.12.4 on crates.io](https://crates.io/crates/tauri/2.12.4) and [upstream releases](https://github.com/tauri-apps/tauri/releases) |
| API description | OpenAPI 3.1 is the blueprint proposal | OpenAPI 3.2.0 is a published specification; assess generator support before changing the proposed baseline | [OpenAPI 3.2.0 specification](https://spec.openapis.org/oas/v3.2.0.html) |
| Contract serialization | Protocol Buffers (Protobuf) is proposed for sync envelopes | `protoc` 36.2 is the current release checked; language runtime versions have their own support windows | [Protobuf releases](https://github.com/protocolbuffers/protobuf/releases/latest) and [version support](https://protobuf.dev/support/version-support/) |
| Local database | SQLite | `3.54.0` release dated 2026-10-09 | [SQLite release history](https://www.sqlite.org/changes.html) |
| Optional central database | PostgreSQL | `18.6` is the current minor for supported major `18` | [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/) |
| Health data exchange | HL7 FHIR | R5 (`5.0.0`) is the current published specification | [FHIR version policy](https://hl7.org/fhir/versions.html) and [R5 specification](https://hl7.org/fhir/R5/) |
| FHIR authorization guide | SMART App Launch | `2.2.0` is the current published guide checked here; it is based on FHIR R4 | [SMART App Launch](https://hl7.org/fhir/smart-app-launch/) |
| AI-tool protocol (future proposal) | MCP | The official dated specification checked here is `2026-07-28` | [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28/) |
| Documentation runtime | Node.js | Node `24.22.0` is listed as LTS; use a supported LTS release for site work | [Node.js release schedule](https://nodejs.org/en/about/previous-releases) |

“Latest published” means the package registry or standards publisher showed that version when checked. It does not mean the version is compatible with every other row, free of advisories, or appropriate for production. In particular, do not upgrade a stack by independently taking the newest version of every package.

## Before creating an implementation

1. Confirm the architecture proposal, use cases, data classification, supported operating systems, offline requirements, and maintainers.
2. Select mutually compatible supported releases. Check the official release notes, minimum toolchain requirements, platform support, licenses, and known security advisories.
3. Pin the compiler/toolchain for reproducible builds. Commit Cargo lock files for applications and workspaces; use the package manager's lock file for each other application.
4. Run formatting, static analysis, tests, dependency/license review, and vulnerability checks in CI. Treat exceptions as documented, time-bounded decisions—not as a way to hide findings.
5. Record performance claims only after repeatable, representative benchmarks. Do not copy size, memory, latency, or scale numbers from the draft corpus.
6. Treat FHIR and SMART versions as a tested pair. Do not infer that a guide based on R4 works with an R5 implementation.
7. Keep integration plans distinct from working integrations. The existence of an RFC, package, endpoint design, or repository proposal is not evidence that ZarishHealth has deployed or connected it.

## Sources and update cadence

This snapshot was checked on 2026-10-16 against upstream release pages, package registries, and standards publishers linked in the table. Refresh it when an implementation is proposed or before a release; do not maintain an evergreen “latest version” claim in architecture prose.
