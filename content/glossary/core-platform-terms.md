---
title: Core platform terms
description: Plain-language definitions of core architecture terms used in the organization blueprint.
slug: /glossary/core-platform-terms
sidebar_position: 2
status: adopted
last_reviewed: "2026-10-16"
audience: All readers
---


## API

An **application programming interface (API)** is a defined way for software systems to exchange requests and responses. The blueprint separates clinical FHIR resources from the proposed native `/api/v1` interface.

## API contract

An **API contract** describes what an interface accepts and returns, including paths, fields, error responses, and compatibility rules. The blueprint proposes publishing OpenAPI and other machine-readable contracts in a separate `api` repository if that repository is created.

## Architecture

An **architecture** is the high-level arrangement of a system: its parts, their responsibilities, and how they communicate. The ZarishHealth organization blueprint is a proposal for how future repositories and services could fit together.

## Local-first

**Local-first** means that a site can continue its essential work using local resources even when its internet connection is unavailable. The blueprint proposes local storage and optional central synchronization; this design has not been verified as implemented.

## Monorepo

A **monorepo** stores multiple related software components in one repository. The blueprint proposes a Rust workspace in a future `core` repository so related crates can share tooling. It does not say that the current `builder` repository is that workspace.

## Open source

**Open-source software** is software distributed under a license that grants rights to inspect, use, modify, and share it. Check the actual license files before reusing code or documentation.

## Repository

A **repository** is a version-controlled project on GitHub. The organization currently has four repositories; the blueprint's larger repository catalog is a future proposal.

## Further reading

- [Architecture overview](../architecture/index.md)
- [Organization blueprint](../architecture/organization-blueprint.md)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
