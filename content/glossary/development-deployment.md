---
title: Development and deployment
description: Definitions for repositories, automation, APIs, and deployment used in the blueprint.
slug: /glossary/development-deployment
sidebar_position: 5
status: adopted
last_reviewed: "2026-10-16"
audience: Contributors, maintainers, and non-technical readers
---


## Build

A **build** turns source files into an output that can be run or published. This repository builds a documentation site from Markdown; that build does not publish the site.

## Continuous integration

**Continuous integration (CI)** automatically checks proposed changes. This repository's CI runs Markdown linting and builds the documentation site; a passing build does not validate a clinical, legal, or security claim.

## Deployment

A **deployment** makes a built application or site available in a target environment. This documentation repository is private and GitHub Pages is disabled as of 2026-10-16. No public deployment is configured here.

## GitHub Actions

**GitHub Actions** is GitHub's workflow automation service. The `docs-checks.yml` workflow runs content checks on pushes, pull requests, and manual dispatch. It does not deploy a Pages site.

## GitHub Pages

**GitHub Pages** is a static website hosting service. The blueprint proposes a project site at `https://zarishhealth.github.io/docs/`, but Pages is not enabled for this private repository. Recheck repository visibility and review publication risk before enabling it.

## MCP

The **Model Context Protocol (MCP)** is a protocol for connecting AI applications to tools and data sources. The blueprint describes possible MCP servers as future work; this repository does not provide an MCP server.

## Semantic Versioning

**Semantic Versioning (SemVer)** labels software releases as `MAJOR.MINOR.PATCH`. The organization blueprint proposes SemVer for releases; individual repositories must adopt and document their release process.

## Further reading

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Semantic Versioning](https://semver.org/)
