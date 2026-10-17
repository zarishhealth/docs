---
title: ZarishHealth organization blueprint
description: Proposed organization-wide repository, naming, architecture, and interface standards.
slug: /architecture/organization-blueprint
sidebar_position: 4
status: proposed
last_reviewed: "2026-10-16"
audience: Organization maintainers, contributors, and technical reviewers
source_note: Reconciled from maintainer-provided architecture drafts; unresolved items remain proposals.
---

**Version 2.0.0 · 2026-10-14 · Status: proposal for adoption**
**Organization:** [github.com/zarishhealth](https://github.com/zarishhealth)
**Supersedes:** `DRAFT_BLUEPRINT_ZARISHHEALTH.md`, `DRAFT_ZARISHHEALTH.md` (both drafts are merged and reconciled here)

> This document defines how every repository, directory, file, URL, API path, MCP server and well-known document of the ZarishHealth GitHub organization is named, laid out and published, so that **every path can be used as a URI/URL/API/MCP endpoint without renaming**.
> This is a design proposal, not an implementation inventory or deployment guide. Standards and version status were rechecked against primary sources on 2026-10-16 where recorded; the [technology baseline](../reference/technology-baseline.md) is a dated snapshot, not a version lock.

---

## 0. How to read this

| You want to… | Go to |
| --- | --- |
| Know what changed from the drafts and why | §1 |
| Understand the "no custom domain" consequences | §2 |
| See the standards this blueprint is built on | §3 |
| Name a repo, branch, file, crate, image, endpoint | §4 |
| See the repository catalog and every repo's layout | §5, §6 |
| Design a URL, API path, FHIR path or MCP tool | §7–§10 |
| Know which `/.well-known/` file lives where | §11 |
| Fix the current repositories | §17 |

---

## 1. Decisions and corrections to the drafts

### 1.1 Decisions (the reconciled architecture)

| # | Decision | Reason |
| --- | --- | --- |
| D1 | **Proposed Rust backend**: Axum 0.8 + Tokio + SQLx; Tauri v2 for desktop/mobile shells; embedded SQLite at sites; PostgreSQL only at the optional central tier | Architecture proposal; implementation and operational fit have not been verified |
| D2 | **Local-first goal**: essential site work should continue when its uplink is unavailable; the central tier is optional | Proposed availability goal; validate it with users and a working pilot |
| D3 | **Few repositories first**, Cargo **workspace monorepo** for Rust code; split a crate into its own repo only when it needs an independent release cadence or owner | Avoid repository growth without a clear ownership or release need |
| D4 | **One path layout on every origin** (laptop, LAN, cloud). The hostname is configuration, never code | Proposed portability rule; verify all origins and hosting choices before adoption |
| D5 | **Clinical data is only under `/fhir`**; the native API (`/api/v1`) never duplicates clinical resources | Prevents two competing data models |
| D6 | **Native API errors use RFC 9457** `application/problem+json`; the FHIR endpoint uses `OperationOutcome` | Each is the standard for its surface |
| D7 | **Resource IDs are opaque UUIDv7 (RFC 9562)**, generated on the device | Proposed offline identifier strategy; validate collision, privacy, and interoperability requirements |
| D8 | **Naming is lowercase kebab-case everywhere except where an external standard mandates otherwise** (Rust `snake_case` source, FHIR `PascalCase` resource types, conventional root files like `README.md`) | One rule, few exceptions, all listed in §4.9 |

### 1.2 Problems found in the drafts (not carried forward)

| Draft claim or practice | Problem | Replacement |
| --- | --- | --- |
| Unverified domain names, email addresses, and service URLs in older examples | Ownership and authorization have not been confirmed | Use placeholders and verify ownership before publishing or configuring endpoints (§2) |
| Splitting organizations to increase CI quota | Quota and policy assumptions require verification and can fragment governance | Keep organization boundaries tied to ownership, access, and operational needs |
| Repo names such as `zs-fhir-rust-server`, `zs-esm-patient-chart` | The Rust API Guidelines say crate names should not carry `-rs`/`-rust`; an org-wide `zs-` prefix duplicates the org namespace | §4.1, §4.6 |
| Selecting an identity provider or hosting service before deployment requirements are known | Provider features, availability, jurisdiction, contracts, and resource needs have not been assessed | Defer provider selection to a reviewed architecture decision; use synthetic data during development (§12, §14) |
| Secrets or password material committed in configuration examples | Sensitive values must not be stored in version control | Keep secrets out of Git and use reviewed provisioning and rotation procedures (§14) |
| Unverified technology-version and performance claims | They are not evidence of supported versions or measured behavior | Check official releases; pin compatible dependencies and publish benchmarks only after measurement |
| `ReferralRequest` as an FHIR R5 resource | The R5 resource page is not published; the R5 `ServiceRequest` resource describes referral workflows | Verify the resource in the selected FHIR release before defining a contract (§9) |
| Service code `MH-` used for both Maternal Health and Mental Health; `DR-REFERRAL` used twice | Colliding identifiers | §7.5 |
| Invented administrative codes `BD.2.1.4.3` | Not the OCHA COD-AB P-codes the data source actually uses | Use the P-codes from the dataset you cite |

---

## 2. GitHub-hosted origins and configurable API host

The organization name provides a GitHub namespace. Ownership or approval of any custom domain, email address, hosting provider, or external service has not been verified here. Use placeholders until maintainers confirm those details.

### 2.1 Origins

| Purpose | Origin / URL pattern | Notes |
| --- | --- | --- |
| Code, issues, releases | `https://github.com/zarishhealth/<repo>` | Canonical source of truth |
| **Organization site proposal** | `https://zarishhealth.github.io/` | The matching repository exists; verify whether Pages is enabled and which content is approved |
| **Project-site pattern** | `https://zarishhealth.github.io/<repo>/` | GitHub documents this URL pattern for project sites; do not assume a site is enabled or public |
| Container images | `ghcr.io/zarishhealth/<image>` | Lowercase only |
| npm packages (if any) | `@zarishhealth/<package>` | Scope = org name |
| Rust crates | `zarish-<name>` on crates.io | crates.io has no org namespaces, so a prefix is the only protection |
| MCP registry names | Follow the current official MCP Registry naming and manifest rules if adoption is approved | Verify registration requirements at implementation time |
| Central API (optional) | `https://{API_ORIGIN}` | Hostname assigned by whatever host you choose; **configuration, not code** |
| Site/field API proposal | Local or site-specific origin | Decide hostnames and TLS before implementation; do not send health data over unencrypted network connections |

Rules that follow:

1. **GitHub Pages is static.** The Rust server cannot run there. Pages hosts documentation, the FHIR Implementation Guide, published API contracts and brand assets only.
2. **Anything that must be served by a running server** (`/fhir`, `/api/v1`, `/mcp`, OAuth metadata) lives on the Rust server's own origin, and the server serves its own `/.well-known/*` documents. OAuth metadata in particular must be served from the origin it describes, so it cannot be hosted on `github.io` for a different origin.
3. **Pages cannot set custom response headers.** Anything that needs a specific `Content-Type` that Pages would not infer (extensionless files, `application/linkset+json`) must come from the Rust server instead.
4. Do not rely on `raw.githubusercontent.com` as a public asset host without checking its content type, browser behavior, and intended use. A reviewed Pages deployment may be considered only after publication approval (§17).
5. **Transport security:** use HTTPS for network traffic carrying sensitive information. A loopback exception or a local development setup does not authorize clear-text traffic over a LAN or external network.
6. If an approved custom domain or API host becomes available, review canonical URLs and origins (§7.1) before use; do not assume that any external domain is owned or approved.

---

## 3. Standards baseline (rechecked 2026-10-16)

| Area | Standard | Status / note |
| --- | --- | --- |
| URI syntax | **RFC 3986** | Stable. Lowercase scheme and host; percent-encode per spec; **no personal data in URIs** (they end up in logs and caches) |
| HTTP semantics | **RFC 9110** | Stable. Methods, status codes, caching, `Retry-After` |
| Well-known URIs | **RFC 8615** (supersedes RFC 5785) | Path prefix is `/.well-known/` (leading dot). Only names in the **IANA Well-Known URI registry** should be used; do not invent names |
| Registered, used here | `security.txt` (RFC 9116); `oauth-protected-resource` (RFC 9728); `oauth-authorization-server` (RFC 8414); `openid-configuration` (OIDC Discovery); `smart-configuration` (SMART App Launch); `api-catalog` (RFC 9727, June 2025) | All listed in the IANA registry or defined by the cited spec |
| Error format | **RFC 9457** Problem Details (obsoletes RFC 7807) | `type` is a URI that identifies the problem; it may be non-resolvable but ours will resolve (§7.4) |
| Deprecation signalling | `Deprecation` header (**RFC 9745**) + `Sunset` (RFC 8594) | RFC 9745 published by the IETF HTTPAPI group |
| API discovery | **RFC 9727** `api-catalog` | Publisher must answer `GET` and `HEAD` with a `Link` header; Linkset format |
| IDs | **RFC 9562** UUIDs (v7) | v7 is time-ordered; good for offline generation |
| Timestamps | RFC 3339 (UTC, `Z`) | |
| API description | OpenAPI **3.1 is the proposal baseline** | Recheck the current specification and chosen generators before publishing contracts; validate generated and hand-written contracts in CI |
| Healthcare | HL7 **FHIR R5 (5.0.0) is the current published specification** as checked 2026-10-16 | The blueprint proposes R5. Track later releases through HL7; do not state that a ballot or draft is a final standard. Name and test the exact release supported by each implementation |
| FHIR authorization guide | SMART App Launch **2.2.0** is the current published guide checked here and is based on FHIR R4 | The proposal targets FHIR R5, so compatibility must be established against the exact SMART and FHIR releases before implementation; do not assume cross-version compatibility |
| FHIR discovery | FHIR `metadata` (CapabilityStatement) and SMART `/.well-known/smart-configuration` are proposed discovery surfaces | Confirm each path and its behavior against the selected versions of the FHIR and SMART specifications |
| MCP | The official **2026-07-28** MCP specification is the current dated specification checked here | Select and pin a dated specification for an implementation. Verify protocol details against that version; drafts and third-party summaries are not normative |
| MCP authorization | Use the selected MCP authorization profile and applicable IETF specifications | Authorization, token audience, transport security, and metadata behavior need a reviewed implementation design |
| MCP server cards | Discovery status and location are unsettled in this proposal | Check the official MCP specification and relevant registries before depending on a location |
| MCP registry | `server.json` under `io.github.<user>/<name>` | Namespace verified through GitHub, DNS or HTTP challenge |
| Rust naming | Rust API Guidelines and Rust's documented naming conventions | Apply current upstream guidance when creating the workspace |
| Versioning | SemVer 2.0.0; Conventional Commits 1.0.0 | |
| Licensing metadata | SPDX identifiers; REUSE layout | §15 |

---

## 4. Naming rules (normative)

Keywords MUST/SHOULD/MAY are used as in RFC 2119.

### 4.1 Repositories

- MUST be lowercase ASCII `a–z`, `0–9`, hyphen. No uppercase, underscores, spaces or dots.
- Exceptions (GitHub-mandated): `.github`, `.github-private`, `zarishhealth.github.io`.
- SHOULD be one to three words, ≤ 30 characters, a **noun** describing what it is (`core`, `app`, `docs`).
- MUST NOT repeat the org name (`zarishhealth-docs` → `docs`), the language (`-rust`) or the word `repo`.
- Because Pages publishes at `/<repo>/`, a repo name is also a URL segment: treat it as permanent. GitHub redirects renamed repos on `github.com`, but **Pages URLs and canonical URLs do not redirect**.
- Site-distribution repos: `distro-<iso-country>-<place>[-<nn>]`, e.g. `distro-bd-coxs-bazar-01` (private; contains no PHI or secrets).
- Topics: lowercase kebab-case, ≤ 50 characters. Mandatory topics: `zarishhealth` plus one of `rust`, `fhir`, `mcp`, `docs`, `infrastructure`, `content`.
- Classification uses **GitHub custom properties** (`layer`, `data-class`, `release-cadence`), not name prefixes.

### 4.2 Branches, tags, releases, commits

| Item | Rule | Example |
| --- | --- | --- |
| Default branch | `main` (never renamed: raw/Pages URLs depend on it) | |
| Work branches | `<type>/<slug>` where `<type>` is `feat`, `fix`, `docs`, `chore`, `refactor`, `test`; an issue number may prefix the slug | `feat/sync-conflict-queue`, `feat/142-sync-conflict-queue` |
| Release branches | `release/<major>.<minor>` (only when a patch line is maintained) | `release/1.2` |
| Tags | `v<semver>`; in a workspace, per-crate tags `<crate>-v<semver>` | `v1.4.0`, `zarish-sync-v0.3.1` |
| Pre-release | SemVer pre-release | `v1.0.0-rc.1` |
| Commit subjects | Conventional Commits | `feat(sync): queue conflicting edits for review` |
| Issue/PR labels | `type:*`, `area:*`, `priority:p0…p3`, `status:*` plus GitHub defaults `good first issue`, `help wanted` | `area:sync` |

### 4.3 Directories

- MUST be lowercase kebab-case: `clinical-forms/`, `api-contracts/`.
- Mandated exceptions: Rust (`src/`, `tests/`, `benches/`, `examples/`, `migrations/`, `src-tauri/`), `.github/`, `.well-known/`, `node_modules/`, FHIR IG Publisher (`input/`, `input/resources/`, `input/pagecontent/`), `LICENSES/` (REUSE).
- Depth SHOULD not exceed 5 levels below a repo root.
- URL-visible directories (anything published to Pages) MUST contain only `[a-z0-9-]` and MUST NOT be renamed after publication.

### 4.4 Files

| Kind | Rule | Example |
| --- | --- | --- |
| Rust source | `snake_case.rs` | `conflict_queue.rs` |
| Docs, config, data, scripts | `kebab-case.<ext>` | `patient-registration-standards.md` |
| Root/community files | Conventional upper-case names | `README.md`, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, `AGENTS.md`, `CODEOWNERS` |
| Translations | `<name>.<bcp47>.md` | `CODE_OF_CONDUCT.bn.md` (replaces `CODE_OF_CONDUCT_bn.md`) |
| ADRs | `adr/NNNN-<kebab-title>.md` (4-digit, never reused) | `adr/0007-use-uuidv7.md` |
| RFC documents | `text/NNNN-<kebab-title>.md` | |
| Workflows | `<verb-or-purpose>.yml` | `ci.yml`, `release.yml`, `security.yml`, `pages.yml`, `reusable-rust-ci.yml` |
| SQL migrations | `<UTC-timestamp>_<snake_description>.sql` (SQLx convention) | `20261014093000_create_sync_log.sql` |
| Protobuf | `snake_case.proto` under `proto/<package-path>/<version>/` | `proto/zarishhealth/sync/v1/sync.proto` |
| JSON/YAML keys | JSON: `camelCase` (aligns with FHIR). YAML config: `snake_case` | |
| Brand assets | Keep the existing pattern `zarishhealth-<type>-<target>[-<variant>][-<WxH>].<ext>` — **frozen**, because hot-links depend on it | |
| No spaces, no uppercase (except above), no version numbers in filenames of published URLs (use paths like `/v1/`) | | |

### 4.5 URL path segments (all HTTP surfaces)

1. Lowercase kebab-case, plural nouns for collections, no verbs, no file extensions, **no trailing slash** on API paths (static Pages directories keep it).
2. Hierarchy only for true containment, max two levels: `/api/v1/sites/{siteId}/devices`.
3. Path parameters are `camelCase` in templates (`{patientId}`), values are opaque IDs (§7.2).
4. Query parameters are `snake_case` (`page_size`, `page_token`, `updated_since`), **except** FHIR, which keeps its own names (`_count`, `birthdate`).
5. No personal data (names, DOB, national ID, phone) in any path or query string. Search by identifier uses `POST` with a body or FHIR `POST [base]/Patient/_search`.
6. Axum 0.8 route syntax is `/{param}` (not `/:param`).

### 4.6 Rust

| Item | Rule | Example |
| --- | --- | --- |
| Package (crate) name | `zarish-<domain>[-<role>]`, kebab-case, **no** `-rust`/`-rs` | `zarish-fhir-model`, `zarish-sync` |
| Library path | snake_case of the package | `zarish_fhir_model` |
| Binaries | Short: `zarish` (CLI), `zarish-server` | |
| Types/traits | `UpperCamelCase`, acronyms as words | `FhirPatient`, `HttpClient` |
| Functions/modules/vars | `snake_case`; getters without `get_` | |
| Features | No placeholder words; name the thing | `sqlite`, `postgres`, `wasm` |
| Edition / toolchain | 2024 edition; exact toolchain pinned in `rust-toolchain.toml`; MSRV declared in `Cargo.toml` (`rust-version`) | |

### 4.7 Packages and images

| Artifact | Name |
| --- | --- |
| Container image | `ghcr.io/zarishhealth/<component>:<semver>` and `:<semver>-<gitsha7>`; never rely on `latest` |
| Release assets | `zarish-<component>-<semver>-<os>-<arch>.<ext>` e.g. `zarish-app-1.4.0-windows-x86_64.msi` |
| Checksums/signatures | `SHA256SUMS`, `SHA256SUMS.sig` (or sigstore bundle) |
| SBOM | `zarish-<component>-<semver>.cdx.json` (CycloneDX) |

### 4.8 Identifiers inside data

| Thing | Rule |
| --- | --- |
| Resource ID | UUIDv7, lowercase, hyphenated (RFC 9562 text form) |
| Business codes (service codes etc.) | Upper-case, hyphenated, unique per code system (§7.5). Lowercased only when used as a URL segment |
| Site ID | `site-<iso3166-2-country>-<kebab-place>-<nn>`, e.g. `site-bd-coxs-bazar-01` (matches the distro repo suffix) |
| Device ID | UUIDv7 generated at first launch |
| Language tags | BCP 47: `en`, `bn`, `my` |
| Time zone | IANA `Asia/Dhaka`, stored timestamps in UTC |

### 4.9 Allowed exceptions (complete list)

Rust source `snake_case` · Rust directories above · FHIR resource names (`Patient`) and IG Publisher file names (`StructureDefinition-zarish-patient.json`) · conventional root files · GitHub-mandated names · SQLx/Protobuf layouts. Nothing else.

---

## 5. Organization map and repository catalog

### 5.1 Current repositories and proposed future repositories

Only `.github`, `docs`, `builder`, and `zarishhealth.github.io` are part of the current inventory recorded in this repository map. The remaining rows are proposals, not repositories to create now. No visibility or deployment target is approved by this blueprint.

| Repository | Status | Proposed purpose | Visibility / publication |
| --- | --- | --- | --- |
| `.github` | Current repository; verify its active files | Organization profile, shared defaults, and reusable resources | Check current repository settings |
| `docs` | Current repository | Reviewed organization documentation | Private at the last verified check; no deployment configured |
| `builder` | Current repository; verify purpose in its README | Not established here | Check current repository settings |
| `zarishhealth.github.io` | Current repository; verify purpose and deployment | Organization website repository | Check current repository settings |
| `core` | Proposal | Rust workspace for shared models, storage, sync, server, and CLI | Undecided; review before creation |
| `app` | Proposal | Tauri shells and user interface | Undecided; review before creation |
| `api` | Proposal | API, Protobuf, JSON Schema, and MCP contracts | Undecided; review before creation |
| `fhir` | Proposal | FHIR Implementation Guide and validated profiles | Undecided; review before creation |
| `mcp` | Proposal | Optional MCP servers and registry manifests | Undecided; review before creation |
| `content` | Proposal | Reviewed forms, translations, and licensed terminology subsets | Undecided; review data and licenses first |
| `deploy` | Proposal | Deployment and backup automation | Undecided; review secrets and operational ownership |
| `distro-template` | Proposal | Template for site distributions | Undecided; review before creation |
| `rfcs` | Proposal | Architecture proposals and governance | Undecided; review before creation |
| `.github-private` | Optional proposal | Restricted internal profile or notes | Undecided; do not create without a specific need |

> `/fhir/`, `/api/`, `/docs/` and `/mcp/` as Pages paths are **static documentation and contracts**. They are different things from the live `/fhir`, `/api/v1` and `/mcp` endpoints on `{API_ORIGIN}`. The static site is where the contract is read; the server is where it is called.

### 5.2 Phase 2 (only when justified, with the trigger)

| Candidate repo | Split out of | Trigger |
| --- | --- | --- |
| `terminology` | `fhir` / `content` | Needs licensed (SNOMED CT/LOINC) data handling or its own release cadence |
| `sdk` | `api` | A second language SDK is needed |
| `design-system` | `app` | A second UI consumes it |
| `distro-<country>-<place>-<nn>` | `distro-template` | One per real site (private) |
| `security` | `.github` | Advisories/pen-test reports need restricted access |
| Any crate in `core` | `core` | Separate owner or independent versioning |

### 5.3 Teams (GitHub)

`maintainers`, `core-rust`, `app`, `fhir-clinical`, `docs-content`, `security`, `release`. Team slugs are kebab-case; `CODEOWNERS` references `@zarishhealth/<team>`.

---

## 6. Per-repository layouts

The layouts below are target examples, not inventories of current repositories. Do not create, rename, or publish these paths without approval and validation in the destination repository.

### 6.1 `.github`

```text
.github/                              ← the repository
├── .github/
│   ├── workflows/
│   │   ├── reusable-rust-ci.yml      ← called as zarishhealth/.github/.github/workflows/reusable-rust-ci.yml@v1
│   │   ├── reusable-docs-pages.yml
│   │   ├── sync-brand-to-pages.yml   ← copies profile/assets/ → zarishhealth.github.io (§17)
│   │   └── lint.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── ISSUE_TEMPLATE/
│   ├── bug-report.yml
│   ├── field-report.yml
│   ├── feature-request.yml
│   └── config.yml
├── workflow-templates/
│   ├── rust-ci.yml
│   └── rust-ci.properties.json
├── profile/
│   ├── README.md                     ← renders at github.com/zarishhealth
│   └── assets/                       ← brand kit (unchanged names)
├── AGENTS.md
├── CODE_OF_CONDUCT.md
├── CODE_OF_CONDUCT.bn.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── SECURITY.md
├── SUPPORT.md
├── LICENSE                           ← Apache-2.0 (code) — see §15
├── LICENSES/                         ← REUSE: Apache-2.0.txt, CC-BY-4.0.txt, MIT.txt
└── REUSE.toml
```

Notes: the org profile renders only from `profile/README.md` in a **public** repo named exactly `.github`. Reusable workflows in a public `.github` repo can be called by every org repo. Pin third-party Actions to full commit SHAs.

### 6.2 `zarishhealth.github.io`

```text
zarishhealth.github.io/
├── .nojekyll                         ← REQUIRED so .well-known is published
├── .well-known/
│   └── security.txt                  ← RFC 9116 (see §11.2)
├── index.html
├── style.css
├── assets/
│   └── brand/                        ← mirrored from .github/profile/assets (logo, favicon, social)
├── robots.txt
├── sitemap.xml
├── 404.html
├── README.md
└── LICENSE
```

Published at `https://zarishhealth.github.io/`. Favicon, OG and logo URLs use `/assets/brand/…`, not `raw.githubusercontent.com`.

### 6.3 `core` (Cargo workspace)

```text
core/
├── Cargo.toml                        ← [workspace]
├── Cargo.lock
├── rust-toolchain.toml
├── deny.toml                         ← cargo-deny: licenses, advisories, bans
├── crates/
│   ├── zarish-fhir-model/            ← FHIR R5 types (serde)
│   ├── zarish-fhir-search/
│   ├── zarish-fhir-validate/
│   ├── zarish-hl7/                   ← HL7 v2 → FHIR mapping
│   ├── zarish-terminology/
│   ├── zarish-store/                 ← storage ports: SQLite + PostgreSQL (SQLx)
│   ├── zarish-sync/                  ← change log, LAN peer sync, conflict queue
│   ├── zarish-proto/                 ← generated prost code from api/proto
│   ├── zarish-crypto/                ← at-rest encryption, key handling
│   ├── zarish-auth/                  ← embedded OAuth/OIDC issuer, token validation
│   ├── zarish-audit/
│   ├── zarish-problem/               ← RFC 9457 types and mapping
│   ├── zarish-server/                ← [bin] Axum app (fhir, api, mcp host, well-known)
│   └── zarish-cli/                   ← [bin] `zarish`
├── migrations/
│   ├── sqlite/
│   └── postgres/
├── benches/
├── tests/
├── docs/                             ← crate-level notes; user docs live in the `docs` repo
├── .github/workflows/{ci,security,release}.yml
├── CHANGELOG.md  CODEOWNERS  README.md  LICENSE
```

`zarish-server` module layout (`src/`): `main.rs`, `config.rs`, `routes/{mod,fhir,api_v1,well_known,health,mcp}.rs`, `middleware/{auth,problem,request_id,cors}.rs`, `state.rs`. Routes are registered by the path tables in §8–§11, so the code layout mirrors the URL layout.

### 6.4 `api` (contracts only, source of truth)

```text
api/
├── openapi/
│   └── v1/
│       ├── zarish-api.yaml           ← OpenAPI 3.1 for /api/v1
│       └── components/               ← shared schemas, problem types, parameters
├── proto/
│   └── zarishhealth/
│       └── sync/v1/sync.proto        ← package zarishhealth.sync.v1
├── json-schema/
│   ├── clinical-form.schema.json
│   └── site-config.schema.json
├── mcp/
│   └── tools/                        ← JSON Schema for each tool input/output
├── problems/                         ← one .md per problem type (§7.4)
├── buf.yaml  buf.gen.yaml            ← Protobuf lint + breaking-change checks
├── .github/workflows/{lint,pages}.yml
└── README.md  CHANGELOG.md  LICENSE
```

Published at `https://zarishhealth.github.io/api/` (e.g. `/api/openapi/v1/zarish-api.yaml`). CI fails on breaking changes to anything under `v1/` (Buf breaking check; an OpenAPI diff tool).

### 6.5 `fhir` (Implementation Guide)

```text
fhir/
├── sushi-config.yaml                 ← canonical: https://zarishhealth.github.io/fhir
├── input/
│   ├── fsh/                          ← FHIR Shorthand sources (*.fsh)
│   ├── pagecontent/
│   ├── resources/                    ← IG Publisher naming: StructureDefinition-zarish-patient.json
│   └── images/
├── ig.ini
├── .github/workflows/ig-publish.yml  ← builds IG → GitHub Pages
└── README.md  LICENSE
```

Canonical URL base: `https://zarishhealth.github.io/fhir` (§7.1). Package id: `zarishhealth.fhir`.

### 6.6 `mcp`

```text
mcp/
├── Cargo.toml                        ← workspace
├── crates/
│   ├── zarish-mcp-core/              ← shared Streamable HTTP + stdio plumbing (2026-07-28)
│   ├── zarish-mcp-fhir/              ← read-only FHIR access
│   ├── zarish-mcp-terminology/       ← code lookup (no patient data)
│   └── zarish-mcp-docs/              ← documentation search (no patient data)
├── servers/
│   ├── fhir.server.json              ← name: io.github.zarishhealth/fhir
│   ├── terminology.server.json
│   └── docs.server.json
└── README.md  LICENSE
```

### 6.7 `app`

```text
app/
├── src-tauri/                        ← Tauri v2 (Rust)
│   ├── Cargo.toml  tauri.conf.json  capabilities/
│   └── src/
├── ui/                               ← web UI (also built to WASM/PWA)
│   ├── src/  public/  package.json
├── i18n/{en,bn,my}.json              ← BCP 47 file names
└── .github/workflows/{ci,release}.yml
```

### 6.8 `content`, `deploy`, `distro-template`, `docs`, `rfcs`

```text
content/                              deploy/                           distro-template/
├── forms/                            ├── containers/                   ├── site.example.toml     ← NO secrets
│   └── <service-code>/<form>.json    │   └── <component>/Dockerfile    ├── clinical-forms/
├── value-sets/                       ├── images/field-pi/              ├── .github/workflows/
├── translations/{en,bn,my}/          ├── infra/                        │   ├── build.yml
└── README.md                         │   └── opentofu/                 │   └── release.yml
                                      ├── backup/                       └── README.md
                                      └── README.md

docs/                                 rfcs/
├── content/                          ├── text/NNNN-<title>.md
│   ├── index.md                      ├── 0000-template.md
│   ├── architecture/                └── README.md
│   ├── get-started/
│   ├── glossary/
│   ├── guides/
│   └── reference/
├── resources/templates/              ← reusable article, decision, and diagram templates
├── assets/                           ← source brand kit
├── static/                           ← selected assets for the generated docs site
├── agent-skills/skills/                   ← reusable authoring skills
└── README.md
```

---

## 7. URI and identifier design

### 7.1 Canonical bases

| Thing | Canonical base | Stability |
| --- | --- | --- |
| FHIR IG / profiles | `https://zarishhealth.github.io/fhir` | Permanent |
| Problem types | `https://zarishhealth.github.io/docs/problems/<slug>` | Permanent |
| API contracts | `https://zarishhealth.github.io/api/openapi/v1/zarish-api.yaml` | Permanent per major |
| JSON Schemas (`$id`) | `https://zarishhealth.github.io/api/json-schema/<name>.schema.json` | Permanent |
| MCP registry names | `io.github.zarishhealth/<name>` | Permanent |
| Protobuf packages | `zarishhealth.<domain>.<vN>` | Permanent per major |
| Runtime API | `{API_ORIGIN}` | Replaceable |

**Rule: identifiers that get embedded in data (canonical URLs, NamingSystem URIs, JSON Schema `$id`) MUST use the permanent bases above, never `{API_ORIGIN}`.** If maintainers approve a custom domain, decide whether it is an alias and preserve any identifiers already published.

### 7.2 Resource identifiers

- Format: UUIDv7 text (`0192f4a8-7b3c-7d1e-9a2b-3c4d5e6f7a8b`), lowercase.
- Generated on the client at creation (offline-safe).
- **Never** derived from DOB, national ID, name, phone or camp/shelter data.
- Human-friendly IDs (printed cards, QR) are separate **business identifiers** (`Patient.identifier`) that carry a check character, are not used as URL path IDs, and are looked up by `POST`.

### 7.3 Identifier systems (FHIR NamingSystems)

| Identifier | `system` URI |
| --- | --- |
| Individual patient ID | `https://zarishhealth.github.io/fhir/NamingSystem/individual-id` |
| Service enrollment ID | `https://zarishhealth.github.io/fhir/NamingSystem/service-enrollment-id` |
| Visit ID | `https://zarishhealth.github.io/fhir/NamingSystem/visit-id` |
| Site ID | `https://zarishhealth.github.io/fhir/NamingSystem/site-id` |
| External IDs (UNHCR ProGress ID, Bangladesh NID, birth registration) | **Use the issuing authority's published system URI/OID**; leave TBD until confirmed with the authority |

### 7.4 Problem types (RFC 9457)

`type` = `https://zarishhealth.github.io/docs/problems/<slug>`; each slug is a page in `docs/problems/` (kebab-case, permanent).

| Slug | HTTP status | Meaning |
| --- | --- | --- |
| `validation-failed` | 422 | Body failed schema or business validation |
| `malformed-request` | 400 | Syntax error |
| `unauthenticated` | 401 | Missing/invalid token |
| `forbidden` | 403 | Token lacks scope/role |
| `not-found` | 404 | Resource absent (also used for resources the caller may not know exist) |
| `version-conflict` | 409 / 412 | `ETag` / `If-Match` mismatch |
| `sync-conflict` | 409 | Concurrent edits queued for review |
| `rate-limited` | 429 | Includes `Retry-After` |
| `unsupported-protocol-version` | 400 | e.g. unsupported MCP or API version |
| `internal-error` | 500 | Never includes internals; includes `instance` correlation ID |

Response example (`Content-Type: application/problem+json`):

```json
{
  "type": "https://zarishhealth.github.io/docs/problems/validation-failed",
  "title": "Validation failed",
  "status": 422,
  "detail": "One or more fields are invalid.",
  "instance": "urn:uuid:0192f4a8-7b3c-7d1e-9a2b-3c4d5e6f7a8b",
  "errors": [{ "pointer": "/birthDate", "code": "invalid-date" }]
}
```

`detail` and `errors` MUST NOT echo personal data.

### 7.5 Service codes (fixing collisions)

Keep the existing service classification, but make each code unique and put them in one CodeSystem: `https://zarishhealth.github.io/fhir/CodeSystem/service`. Changes needed:

| Currently | Problem | Use |
| --- | --- | --- |
| `MH-MATERNAL` and `MH-BASIC` | `MH` means maternal health and mental health | `MCH-MATERNAL`; `MHPSS-BASIC` (matches the existing MHPSS service code in the ID scheme) |
| `DR-REFERRAL` in B-02 and in E | Same code, two groups | One code `DR-UNIT`; group membership is data, not part of the code |
| Codes in URLs | Case | `…/services/mchmaternal` is wrong; use `…/services/mch-maternal` (lowercased code) |

---

## 8. Native HTTP API (`/api/v1`)

All routes, fields, scopes, and status codes in this section are proposed contract material. No endpoint in this catalog is confirmed as running; do not treat it as an API reference for a live service.

### 8.1 Conventions

| Topic | Rule |
| --- | --- |
| Base path | `/api/v1`. Major version in the path. Header-based version selection is **not** used |
| Media types | `application/json` (and `application/problem+json` for errors). Protobuf sync bodies: `application/x-protobuf` with `Content-Type` parameter `proto=zarishhealth.sync.v1.Envelope` |
| Methods | `GET` read · `POST` create / non-idempotent action resource · `PUT` replace · `PATCH` JSON Merge Patch (`application/merge-patch+json`) · `DELETE` · `HEAD`/`OPTIONS` |
| Status codes | 200, 201 (+`Location`), 202 (async), 204, 304, 400, 401, 403, 404, 409, 412, 415, 422, 429, 5xx |
| Concurrency | `ETag` on single resources; `If-Match` required on `PUT`/`PATCH`/`DELETE` |
| Idempotency | `POST` accepts `Idempotency-Key` (IETF HTTPAPI draft; treat as a convention until it is an RFC). Mandatory for sync uploads |
| Pagination | Cursor: `page_size` (default 50, max 200), `page_token`; response `nextPageToken`; `Link: <…>; rel="next"` (RFC 8288) |
| Filtering/sorting | `field_name=value`, `updated_since=<RFC3339>`, `order_by=updated_at` / `-updated_at` |
| Field naming | JSON `camelCase`; booleans `isX`/`hasX`; timestamps `…At`, RFC 3339 UTC |
| Request correlation | Accept/emit `X-Request-Id`; propagate W3C `traceparent` |
| Caching | `ETag` + `Cache-Control`; list endpoints for reference data use `max-age` |
| CORS | Allow-list of origins from config; never `*` on authenticated endpoints |
| Deprecation | `Deprecation` (RFC 9745) + `Sunset` (RFC 8594) + `Link: <…>; rel="deprecation"`; support the previous major for ≥ 12 months |
| Security headers | `Strict-Transport-Security` when HTTPS, `X-Content-Type-Options: nosniff`, `Cache-Control: no-store` on anything with personal data |

### 8.2 Endpoint catalog

Clinical resources are **not** here; they are under `/fhir` (§9).

| Method & path | Purpose | Scope |
| --- | --- | --- |
| `GET /api/v1/sites` · `GET /api/v1/sites/{siteId}` | Site registry | `site.read` |
| `GET /api/v1/sites/{siteId}/devices` · `POST …/devices` | Enrolled devices | `device.read` / `device.write` |
| `GET /api/v1/devices/{deviceId}` · `DELETE …` | Device record / revoke | `device.*` |
| `POST /api/v1/sync-sessions` | Open a sync session (returns `syncSessionId`) | `sync.write` |
| `POST /api/v1/sync-sessions/{syncSessionId}/changes` | Upload a change batch (Protobuf, idempotent) | `sync.write` |
| `GET /api/v1/sync-sessions/{syncSessionId}/changes?page_token=` | Download changes since cursor | `sync.read` |
| `POST /api/v1/sync-sessions/{syncSessionId}/completion` | Close the session | `sync.write` |
| `GET /api/v1/sync-conflicts` · `GET …/{conflictId}` · `PATCH …/{conflictId}` | Review queue; `PATCH` resolves | `sync.review` |
| `GET /api/v1/users` · `…/{userId}` | Local users and roles | `user.*` |
| `GET /api/v1/audit-events` | Read-only audit log query | `audit.read` |
| `GET /api/v1/reports` · `POST /api/v1/report-runs` · `GET /api/v1/report-runs/{runId}` | Reports (202 + polling) | `report.*` |
| `GET /api/v1/configuration` | Effective non-secret configuration | `config.read` |
| `GET /api/v1/openapi.json` | Served contract (same content as published YAML) | public |

Action-like operations are modelled as creatable resources (`sync-sessions`, `report-runs`, `…/completion`), not verb paths.

### 8.3 Operational endpoints (no version prefix)

| Path | Purpose | Auth |
| --- | --- | --- |
| `GET /livez` | Process is up | none (loopback/LAN only) |
| `GET /readyz` | Dependencies ready (DB, migrations) | none (loopback/LAN only) |
| `GET /metrics` | Prometheus text format | restricted |
| `GET /.well-known/api-catalog` | RFC 9727 catalog (§11) | public |

---

## 9. FHIR endpoint (`/fhir`)

This endpoint is proposed, not verified as implemented. Validate every operation, profile, terminology binding, and version claim against the selected official FHIR release and a reviewed implementation guide.

| Topic | Rule |
| --- | --- |
| Base URL | `{API_ORIGIN}/fhir` |
| Version | R5 (`5.0.0`) is the proposed baseline. Confirm version negotiation and capability reporting against the implementation's conformance requirements |
| Formats | `application/fhir+json` (primary); `application/fhir+xml` optional |
| Paths | Standard FHIR REST: `GET /fhir/Patient/{id}`, `POST /fhir/Patient`, `GET /fhir/Observation?patient=…&_count=…`, `POST /fhir/` (transaction/batch Bundle), `POST /fhir/Patient/_search`. Resource types are `PascalCase` by FHIR rule — the allowed exception |
| Discovery | `GET /fhir/metadata` (CapabilityStatement); `GET /fhir/.well-known/smart-configuration` (path appended to the FHIR base, as SMART requires) |
| Errors | `OperationOutcome` with matching HTTP status |
| Subscriptions | R5 topic-based Subscriptions only when required; sync does **not** depend on them |
| HL7 v2 ingest | `POST /fhir/$hl7v2-ingest` is **not** used. Legacy ingest is a separate native resource: `POST /api/v1/hl7-messages` (202), keeping FHIR paths standard |
| Referral | R5 `ServiceRequest` supports referral workflows; verify resource choice against the official release |
| Profiles | Declared in `fhir` IG; canonical `https://zarishhealth.github.io/fhir/StructureDefinition/zarish-<name>` |
| Terminology systems | Standard URIs (`http://snomed.info/sct`, `http://loinc.org`, `http://hl7.org/fhir/sid/icd-11`) — confirm each system's current registered URI in the HL7 terminology registry before use; SNOMED CT/LOINC/ICD-11 licensing must be checked per country |

Revisit later FHIR releases only after HL7 publishes them; validate profile changes and migrations against the published specification.

---

## 10. Optional MCP evaluation

The organization blueprint mentions the Model Context Protocol (MCP) as a possible future integration. No ZarishHealth MCP server, registry entry, or authorization design is verified here.

Before considering an implementation:

1. Select a dated version from the [official MCP specification](https://modelcontextprotocol.io/specification/2026-07-28/) and verify every protocol requirement against that version.
2. Start, if approved, with read-only, approved, non-sensitive documentation or terminology. Do not expose patient data through MCP by default.
3. Require a privacy review, threat model, authorization design, user-safety review, and an explicit decision about which clients and deployment origins are supported.
4. Verify registry, discovery, transport, and authentication requirements at implementation time. Do not rely on a proposal, draft, third-party summary, or example endpoint as a stable interface.
5. Keep credentials, patient data, and identifying details out of tool names, resource identifiers, logs, and public examples.

---

## 11. Well-known documents and publication

The blueprint does not approve any live discovery document or security contact. Before serving a `/.well-known/` resource:

- identify the authoritative standard or registry entry and follow its current requirements;
- verify the endpoint origin, content type, contact details, expiry, and maintenance owner;
- ensure the host can serve the required path and headers; GitHub Pages and a running API server have different capabilities;
- obtain repository visibility, content, and publication approval.

Do not publish example metadata, placeholder security contacts, OAuth discovery documents, or provisional MCP paths as if they were active endpoints.

---

## 12. Authentication and authorization

The entries below are design candidates, not approved controls or an authorization implementation. Select them only after a threat model, privacy review, and deployment requirements are documented.

| Topic | Rule |
| --- | --- |
| Protocols | OAuth 2.0 with PKCE (RFC 7636) and OpenID Connect are candidates for user-facing flows; service-to-service authentication requires a separate review |
| Issuer | Open question. Decide identity provider and offline behavior through a threat model and architecture decision; do not assume an embedded issuer or vendor |
| Token format | Decide token type, lifetime, audience, issuer, and validation rules based on the selected standards and threat model; no values are approved |
| Offline | Offline sign-in, credential expiry, revocation, and recovery require a separately reviewed design |
| Scopes | Define least-privilege scopes after resources, operations, and authorization requirements are known |
| Roles → scopes | Define roles with clinical, operational, and privacy reviewers; no role model or enforcement service is verified |
| Secrets | Never in Git; installed per site; rotated; test fixtures use obviously fake values |

---

## 13. Data and sync (carried over, tightened)

These are proposed data-handling behaviors, not verified features. Encryption, key management, backup, and conflict-resolution details require implementation and independent review.

- **Local store**: embedded SQLite per device, encrypted at rest (SQLCipher or equivalent) with a device-bound key.
- **Central store** (optional): PostgreSQL is the proposed database. Hosting and data handling are undecided (§14).
- **Change log**: append-only, per resource version (`meta.versionId`), UUIDv7 change IDs, HLC/vector clock per device. Clinical history is never overwritten; edits append versions.
- **Transport**: Protobuf envelopes (`zarishhealth.sync.v1`), compressed, over TLS; LAN peer sync discovers peers via mDNS and requires mutual authentication with per-device keys. A shared passphrase is not authentication.
- **Conflict rule** (resolves the drafts' disagreement): non-overlapping field edits merge automatically; overlapping edits to clinical fields are **never** decided by "newest timestamp wins" — they enter the review queue (`/api/v1/sync-conflicts`). Non-clinical fields may use last-writer-wins with an audit record.
- **Backups**: encrypted client-side before leaving the device; the cloud target is a deployment choice, decided after §14.

---

## 14. Security, privacy and compliance carry-overs

1. **No personal health information in URIs or identifiers.** Use opaque identifiers and follow a reviewed data-minimization and access-control design for any locally required identifiers.
2. **QR codes**: encode only an opaque reference (and a check value), not "all patient fields". A printed code with name, address and service is a data leak.
3. **Synthetic data only** in public repos (`content`, `docs`, tests, `distro-template`). Example patient names in the drafts must not appear in published files.
4. **Secrets**: scan with gitleaks in CI; enable GitHub secret scanning with push protection; remove `local_sync_key` and hashes from templates.
5. **Hosting and storage**: no provider, contract, region, retention period, or data-processing agreement is approved by this proposal. Use synthetic data in development; do not place real health data with a service until responsible reviewers approve the specific deployment.
6. **Compliance and conformance language**: follow `AGENTS.md`; never state the software or a deployment is compliant, certified, or conforms to FHIR without evidence and authorized review. A badge image is not evidence. Do not replace an R4 badge with an R5 claim unless the product has been validated against R5.
7. **Supply chain**: `cargo-deny`, `cargo-audit`, Dependabot, pinned Action SHAs, signed releases (sigstore/cosign), SBOM per release, GitHub artifact attestations.
8. **Vulnerability reporting**: decide and verify a supported private reporting route for each repository before publishing security contact information.

---

## 15. Licensing layout

The repositories currently contain three different files that claim to be the licence (`LICENSE` ×2 and `LICENSE_CODE`), plus text referring to another project (`cpintl-brand`). Normalise to the REUSE layout:

| Content | SPDX | File |
| --- | --- | --- |
| Code, automation, workflows | `Apache-2.0` | `LICENSE`, `LICENSES/Apache-2.0.txt` |
| Documentation, prompts, templates | `CC-BY-4.0` | `LICENSES/CC-BY-4.0.txt` |
| Brand kit artwork and tokens | `MIT` (as stated in `profile/assets/LICENSE.md`) | `LICENSES/MIT.txt`; trademark note kept |
| Third-party fonts | `OFL-1.1` | Not redistributed |

Add `REUSE.toml` mapping directories to SPDX IDs, and run `reuse lint` in CI. One `LICENSE` file per repo root; no file may share the name with another.

---

## 16. CI/CD, versioning and releases

These are organization-wide recommendations, not verified settings. Apply them only after repository owners review their feasibility, access, cost, and maintenance requirements.

| Topic | Rule |
| --- | --- |
| Runners | Select runners and budgets based on current GitHub plan, policy, and workload; do not create organizations solely to alter quotas |
| Reusable workflows | In `.github`, versioned with tag `v1`; repos call `zarishhealth/.github/.github/workflows/<file>@v1` |
| Required checks | `cargo fmt --check`, `cargo clippy -D warnings`, `cargo test`, `cargo deny check`, `cargo audit`, OpenAPI lint (Spectral), Buf lint/breaking, link check, `reuse lint`, gitleaks |
| Rulesets | `main` protected: PR required, 1 review (2 for `core`/`fhir`), required checks, linear history, signed commits recommended, no force-push, no deletion |
| Releases | Conventional Commits → release-plz (or release-please) → tag → GitHub Release with assets named per §4.7, checksums, SBOM, attestation |
| Versioning | SemVer. API: `/api/v1` changes are additive only; breaking → `/api/v2` + deprecation headers. Protobuf: package `…v1` frozen; breaking → `…v2` |
| Pages | Use a reviewed GitHub Actions deployment only after the repository is approved for publication and Pages is enabled |
| Docs links | Link-check on every PR so renamed paths are caught before publishing |
| Dependency updates | Dependabot weekly for `cargo`, `github-actions`, `npm`, `docker` |

---

## 17. Migration checklist for verification

The following are review prompts, not findings about the current state of another repository. Inspect each repository and obtain maintainer approval before renaming, deleting, publishing, or changing settings.

| # | Review area | Safe next step |
| --- | --- | --- |
| 1 | Current repository names and roles | Confirm `.github`, `docs`, `builder`, and `zarishhealth.github.io` against their current READMEs and settings. |
| 2 | Legacy drafts | Identify owners and canonical replacements; preserve history and do not delete or move drafts without approval. |
| 3 | Website paths and assets | Check file paths, links, content types, and browser behavior before updating references or copying assets. |
| 4 | Domain, email, and external URLs | Verify ownership and approval before treating a host, address, or service as an organization endpoint. |
| 5 | Brand guidance and asset indexes | Compare documented paths and counts with the current asset tree; regenerate indexes only from verified files. |
| 6 | Organization profile links | Check that every anchor and target file resolves in the current repository. |
| 7 | Licenses and attribution | Have maintainers review each license and asset attribution; do not consolidate or replace license text based only on this proposal. |
| 8 | Security reporting | Verify an approved contact route and repository capability before publishing security metadata. |
| 9 | Filenames and URLs | Follow the naming proposal for new work; assess redirects and external links before renaming existing paths. |
| 10 | FHIR badges or claims | Remove or correct a badge only after confirming the supported FHIR release and the product claim it represents. |
| 11 | New repositories | Require an approved owner, purpose, visibility, data classification, maintenance plan, and publication review. |
| 12 | GitHub organization settings | Review security controls with repository owners; do not apply settings from this proposal automatically. |
| 13 | Pages and static metadata | Consider publishing only after visibility, content, asset licensing, and security review. |

---

## 18. Indicative delivery sequence (not a schedule)

The sequence below is a planning aid, not a commitment, staffing plan, or evidence that work has started. Each stage depends on review and approval.

| Sequence | Possible deliverable | Evidence to require before proceeding |
| --- | --- | --- |
| Foundation | Verify current repositories, owners, visibility, naming, licensing, and safety requirements | Maintainer-reviewed inventory and written decisions |
| Contracts | If approved, draft API and FHIR contracts against selected standards | Versioned contracts, conformance checks, and review records |
| Local service | If approved, implement a minimal local service and storage layer | Tests, threat model, resource measurements, and recovery behavior |
| Synchronization | If approved, add authenticated sync and conflict handling | Failure, retry, data-integrity, and conflict-review tests |
| Optional tooling | Evaluate read-only documentation or terminology tooling | Privacy, authorization, security, and clinical-safety review |
| Pilot | Use synthetic data until a separate data and deployment approval exists | Written safety, operational, and deployment decisions |

---

## 19. Open questions and unverified items

1. **MCP discovery conventions**: verify the selected official specification and registry before implementation.
2. **OAuth profile**: verify the current IETF status and the exact requirements of the MCP version selected for implementation.
3. **FHIR terminology URIs and licences** (SNOMED CT, LOINC, ICD-11) must be confirmed per deployment country.
4. **Host for `{API_ORIGIN}`** is undecided. Compare deployment models using security, jurisdiction, service continuity, operational capacity, and contractual requirements; no provider is approved here.
5. **Static asset behavior**: verify content type, browser behavior, licensing, and access before depending on a hosting path.
6. **Idempotency-Key** and **RateLimit** headers are IETF drafts; treat as conventions.
7. **UNHCR / Bangladesh identifier system URIs** need confirmation from the issuing authorities.
8. **Version selection**: the dated [technology baseline](../reference/technology-baseline.md) is only an ecosystem snapshot. Before implementation, select compatible supported versions and pin them in the relevant toolchain and lock files; do not infer that a package is in use here.

---

## 20. Sources

- RFC 3986 (URI), RFC 9110 (HTTP semantics), RFC 8615 (Well-Known URIs), RFC 9116 (`security.txt`), RFC 8414, RFC 9728, RFC 9727, RFC 9457, RFC 9745, RFC 9562, RFC 8288, RFC 3339 — rfc-editor.org
- IANA Well-Known URIs registry — [IANA Well-Known URIs registry](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml)
- MCP specification 2026-07-28 — [official specification](https://modelcontextprotocol.io/specification/2026-07-28/)
- MCP Registry (namespaces, `server.json`) — [MCP Registry](https://modelcontextprotocol.io/registry/about)
- SMART App Launch — [current published guide](https://hl7.org/fhir/smart-app-launch/)
- FHIR release status — [HL7 FHIR version policy](https://hl7.org/fhir/versions.html)
- Technology versions and toolchain pinning — [technology baseline](../reference/technology-baseline.md)
- Rust API Guidelines (naming) — [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/naming.html)
- GitHub Pages site types and URLs — [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- GitHub Pages publishing sources — [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- GitHub organization profile (`.github/profile/README.md`) — GitHub Docs
