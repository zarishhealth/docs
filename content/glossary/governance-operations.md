---
title: Governance and operations
description: Definitions for decisions, policy status, ownership, and data responsibility.
slug: /glossary/governance-operations
sidebar_position: 4
status: adopted
last_reviewed: "2026-10-16"
audience: Maintainers, program leaders, and contributors
---


## Architecture decision record

An **architecture decision record (ADR)** captures an important technical choice, why it was needed, alternatives considered, and its consequences. The blueprint proposes numbered ADR files; a proposed ADR format is available in the [decision-record template](https://github.com/zarishhealth/docs/blob/main/resources/templates/decision-record.md).

## Adopted decision

An **adopted decision** is one maintainers have explicitly approved. Approval does not prove the decision has been implemented; implementation status requires separate evidence.

## Blueprint

A **blueprint** describes an intended structure or design. The organization blueprint is a proposal and includes open questions. Do not use it as a deployment manual or assume every listed repository exists.

## Data residency

**Data residency** describes where information is stored or processed. The applicable requirements depend on the data, jurisdiction, contracts, and deployment. The blueprint's preference for country-level control is a design proposal, not legal advice.

## Personal health information

**Personal health information** is information about an identifiable person's health or care. Avoid putting it in public repositories, documentation examples, issue reports, screenshots, logs, or diagrams.

## Source of truth

A **source of truth** is the designated place to maintain a piece of information. When a value has one canonical source, other pages should link to it instead of copying it and allowing versions to drift.

## Status labels

- **Draft:** unfinished content for discussion.
- **Proposed:** a design or rule that awaits approval.
- **Adopted:** maintainers have approved the rule.
- **Implemented:** someone has verified the described behavior in the relevant repository or deployment.
- **Deprecated:** retained for history, but no longer recommended.

## Further reading

- [Organization blueprint](../architecture/organization-blueprint.md)
- [Documentation content model](../reference/content-model.md)
- [Security and privacy notes in the blueprint](../architecture/organization-blueprint.md#14-security-privacy-and-compliance-carry-overs)
