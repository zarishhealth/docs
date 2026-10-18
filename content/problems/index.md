---
title: Problem types
description: The RFC 9457 problem types the ZarishHealth JSON API returns, and what a client should do about each one.
slug: /problems/index
sidebar_position: 1
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

The JSON API (`/api/v1`) reports every failure as an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem detail with
`Content-Type: application/problem+json`. The `type` member is the permanent URI of the
problem, and every one of them resolves to a page in this section.

The clinical surface (`/fhir`) reports failures as a FHIR `OperationOutcome` instead.

## Shape

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

`instance` correlates the response with the server's log and the audit trail. Quote it in a
bug report.

## Types

| Type | Status | When |
| --- | --- | --- |
| [validation-failed](./validation-failed.md) | 422 | The body failed schema or business validation |
| [malformed-request](./malformed-request.md) | 400 | The request could not be parsed |
| [unauthenticated](./unauthenticated.md) | 401 | No token, or an invalid one |
| [forbidden](./forbidden.md) | 403 | The token lacks the scope or role |
| [not-found](./not-found.md) | 404 | No such resource |
| [version-conflict](./version-conflict.md) | 409, 412 | `ETag` / `If-Match` mismatch |
| [sync-conflict](./sync-conflict.md) | 409 | Concurrent edits waiting in the review queue |
| [rate-limited](./rate-limited.md) | 429 | Too many requests |
| [unsupported-protocol-version](./unsupported-protocol-version.md) | 400 | Unsupported API or MCP version |
| [internal-error](./internal-error.md) | 500 | The server failed |

## What never appears

A problem detail never echoes personal data, and an `internal-error` never explains the
implementation. `detail` describes the fault in terms a caller can act on; the correlation
identifier is how you ask for more.
