---
title: Data and integration
description: Definitions for identifiers, synchronization, privacy, and data handling concepts.
slug: /glossary/data-integration
sidebar_position: 6
status: adopted
last_reviewed: "2026-10-16"
audience: Health-program teams, developers, and data stewards
---


## Authentication

**Authentication** checks who or what is making a request. A system should not treat a name in a request as proof of identity.

## Authorization

**Authorization** determines what an authenticated user or service may do. The blueprint proposes role- and scope-based access, but a deployment must implement and test its own access rules.

## Audit event

An **audit event** records an action relevant to accountability, such as a change or access. Logs can themselves contain sensitive information; define access and retention with qualified reviewers before deployment.

## Conflict review

A **conflict** occurs when concurrent edits cannot be safely combined. The blueprint proposes sending overlapping clinical edits to a human review queue instead of automatically selecting the most recent edit.

## Data minimization

**Data minimization** means collecting and retaining only information necessary for a defined purpose. The appropriate data and retention period depend on the use case and applicable requirements; this glossary does not set a legal retention policy.

## Encryption at rest

**Encryption at rest** protects stored data using cryptographic controls. A design statement about encryption is not evidence that a product is encrypted; verify key handling, storage, backup, and device behavior.

## Identifier

An **identifier** is a value used to refer to a record or entity. The blueprint proposes opaque UUIDv7 resource IDs and warns against embedding personal information in IDs or URLs. Confirm the identifier design before implementation.

## Offline synchronization

**Offline synchronization** transfers changes between devices or services after connectivity returns. The blueprint proposes an append-only change history and review for conflicting clinical edits. It does not describe a deployed sync service.

## Personally identifiable information

**Personally identifiable information (PII)** is information that identifies, or can be linked to, a person. Health information and combinations of indirect details can also be identifying. Do not use real personal data in public examples.

## Further reading

- [Data and synchronization proposal](../architecture/organization-blueprint.md#13-data-and-sync-carried-over-tightened)
- [Privacy and security proposal](../architecture/organization-blueprint.md#14-security-privacy-and-compliance-carry-overs)
- [RFC 9562: Universally Unique IDentifiers](https://www.rfc-editor.org/rfc/rfc9562)
