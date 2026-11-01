---
id: 0001-record-architecture-decisions
title: Record architecture decisions
description: Why ZarishHealth keeps numbered decision records and how one is written.
slug: /adr/0001-record-architecture-decisions
sidebar_position: 1
status: adopted
last_reviewed: "2026-11-01"
audience: Maintainers and contributors
---

- **Status:** Adopted
- **Date:** 2026-11-01
- **Decision owner:** maintainers

## Context

Several organization-wide choices are still open, and the task list requires each of them to be
recorded rather than remembered: the host for the runtime API, the licence position on boundary
datasets, the terminology licences, the documentation generator and the release tool. Without a
numbered record, a decision lives in a chat message, an issue or a research report that no reader
can cite and no later contributor can date. A rule whose origin is unknown is indistinguishable
from a guess.

`CATALOGUE.md` §3.3 already expects `adr/0001-record-architecture-decisions.md` in this
repository, and the template in `resources/templates/decision-record.md` is already written.

## Options considered

1. **Issues only.** Cheap, but no stable link, no history of superseded choices, and issues are
   closed and forgotten.
2. **One living "decisions" page.** Easy to keep current, but it is rewritten in place, so the
   reason and the date of an earlier choice are lost and a reader cannot tell what changed.
3. **Numbered records.** Each decision is a short, immutable page with a number, a date, the options
   that were weighed and the consequences. A later decision supersedes an earlier one instead of
   editing it.

## Decision

Use architecture decision records for organization-wide decisions.

- They live in `content/adr/` and are named `NNNN-<kebab-case-title>.md` with a four-digit number,
  in the order the decisions are taken. Numbers are never reused.
- They start from `resources/templates/decision-record.md` and carry the front matter this site
  requires: `title`, `description`, `status`, `last_reviewed` and `audience`.
- The status is one of `proposed`, `adopted`, `superseded` or `deprecated`. A record is `adopted`
  once the decision is taken, whether or not anything has been built yet.
- An adopted record is not rewritten to match later thinking. A new record supersedes it and both
  stay published, so the history remains readable.
- `implemented` is used only when there is evidence that the decision is in force — a merged change,
  a running service or a passing test — and that evidence is linked in the record.

## Consequences

- Every open decision in Phase 0.1 of the task list gains a citable URL that issues, pull requests
  and reports can reference.
- A reader can tell a decision from a proposal, and can see which earlier choice a new one replaced.
- Someone has to write the record. A decision that is only discussed in a call is not recorded, so
  the discussion has to end with a page.
- The records are part of the published documentation site, so they must obey the same rules as
  every other page: no personal data, no secrets, and no compliance claims without evidence.

## Evidence and open questions

- `CATALOGUE.md` §3.3 lists the `adr/` directory; `resources/templates/decision-record.md` is the
  template this decision adopts.
- `AGENTS.md` in this repository defines the allowed `status` values.
- Open: who formally approves a record. For now the decision owner is `maintainers`; the team
  structure is task `O-04`, and a future record can name an approver per area.

## Implementation evidence

This record and [ADR 0002](0002-runtime-api-origin.md) were added in the same change, which is the
first use of the mechanism. The site builds with both pages in the `Decisions` section.
