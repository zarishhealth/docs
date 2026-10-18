---
title: Internal error
description: The server failed while handling a well-formed request.
slug: /problems/internal-error
sidebar_position: 11
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **500 Internal Server Error** when the fault is the server's, not the caller's.
The response carries only what a caller can act on, plus the `instance` correlation
identifier. It never contains a stack trace, a SQL fragment, a file path or any part of the
record being handled.

## What a client does

Retry once for an idempotent request. If it fails again, stop and report the problem with
the `instance` value, which links the response to the server's log and audit trail.
