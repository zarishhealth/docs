---
id: 0002-runtime-api-origin
title: Runtime API origin and hosting model
description: The decided origin for the runtime API and the two-stage hosting model behind it.
slug: /adr/0002-runtime-api-origin
sidebar_position: 2
status: adopted
last_reviewed: "2026-11-01"
audience: Maintainers, deployment engineers, and API consumers
---

- **Status:** Adopted
- **Date:** 2026-11-01
- **Decision owner:** maintainers
- **Resolves:** open question 4 in `BLUEPRINT.md` §19

## Context

The blueprint leaves the runtime API origin as the placeholder `{API_ORIGIN}` because it is
replaceable configuration rather than code, while the identifiers that get embedded in data stay on
`https://zarishhealth.github.io/…` until decision `D-09`. That placeholder cannot be used for TLS, for
the OAuth issuer and audience, for a CORS allow-list, or in the deployment repository, so the host
has to be named before authentication and deployment work starts.

Two constraints frame the choice:

- **The organization owns `zarish.org`**, its DNS is on Cloudflare's free plan, and all DNS and
  Cloudflare work is the maintainer's (`GOVERNANCE.md` §4). Naming a host under `zarish.org` is
  permitted only once a decision record names it — this is that record.
- **A central service is optional.** A site keeps working while offline; the central service
  exchanges approved updates and is not a dependency for routine local work.

## Options considered

1. **Self-hosted at a project office behind a Cloudflare Tunnel.** No inbound port is opened,
   Cloudflare terminates TLS, and the origin needs no public address. Traffic passes through
   Cloudflare, which is a data-protection question rather than a hosting detail.
2. **Self-hosted with dynamic DNS and its own certificates.** No third party in the data path, but
   the origin is directly exposed and certificate renewal becomes local operational work.
3. **A paid cloud with a signed data processing agreement.** Managed TLS and operations in exchange
   for recurring cost and a contract that has to be negotiated before any real data is handled.
4. **Two stages: a zero-cost edge runtime for a synthetic-data prototype, then a contractually
   reviewed container platform for anything real.** The public contract and the domain crates stay
   the same; only adapters and deployment configuration change.

## Decision

- **The runtime API origin is `https://api.zarish.org`.**
- **DNS and TLS are terminated at the Cloudflare edge.** The maintainer creates and owns the DNS
  record. No tunnel token, certificate key or other secret enters a repository.
- **Stage 1 — prototype.** Cloudflare Workers built from Rust with `workers-rs`, for
  synthetic data only. No personal or patient data is stored or processed on this path.
- **Stage 2 — real data.** A container platform chosen only after a written review of contractual
  coverage, residency, audit, backup and incident response, tracked in `D-10`, `SEC-04` and
  `SEC-05`. Cloud Run is the evaluated default in the research report, **not** an approved provider.
- **Paths do not change.** The application API stays `/api/v1` (`BLUEPRINT.md` §8) and FHIR stays
  `/fhir` (§9). The `/v1` and `/fhir/r5` bases proposed in the research report are not adopted by
  this record; they would be separate decisions with their own consequences for published clients.
- **Permanent identifiers do not change.** Canonical URLs, NamingSystem URIs and JSON Schema `$id`
  remain on `https://zarishhealth.github.io/…` until `D-09`.

## Consequences

- The OAuth issuer and the token audience are bound to `api.zarish.org`. Moving the host later is a
  breaking change for every client, so it must not be treated as a casual configuration edit.
- CORS allow-lists, cookie settings and any redirect URIs name this origin.
- The prototype and the production runtime must share the domain crates and the published contract,
  so a change of host or platform does not change a path.
- A free tier is a prototype constraint. It is not evidence of durability, security or compliance,
  and this record makes no such claim.
- Real data on any host waits for `D-10`, `SEC-04` and `SEC-05`; until then the only data on this
  origin is synthetic.

## Evidence and open questions

- Maintainer research report `zarishhealth-api-runtime-strategy.md`, 1 November 2026 (workspace
  root, not published). It supplies the hosting comparison and the two-stage recommendation.
- `BLUEPRINT.md` §7.1 (canonical bases), §19 open question 4; `GOVERNANCE.md` §4 (domains and
  Cloudflare); `deploy/README.md`.
- **Open:** the production platform is not chosen. The report's statements about vendor contractual
  coverage were not re-verified here; processor terms, region and retention remain `D-10`.
- **Open:** whether the research report is published, and in which repository.
- **Open:** whether a versioned FHIR base such as `/fhir/r5` should replace `/fhir`, and whether a
  GraphQL read layer is admitted at all — `P2-09` requires an RFC for the latter.

## Implementation evidence

`deploy/README.md` names the origin and `deploy/AGENTS.md` no longer treats every hostname as a
placeholder. No runtime is deployed on the origin yet, so this record stays **adopted**, not
**implemented**.
