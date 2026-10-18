---
title: Forbidden
description: The token is valid but lacks the scope or role the request needs.
slug: /problems/forbidden
sidebar_position: 5
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **403 Forbidden** when the caller authenticated but is not allowed to do this:
the SMART scope does not cover the interaction, or the role does not include it.

Do not confuse this with [not-found](./not-found.md): for resources the caller may not know
exist, the server answers `404` rather than confirming they are there.

## What a client does

Hide or disable the action, and tell the user what permission is missing. Re-authenticating
will not help; the grant itself has to change.
