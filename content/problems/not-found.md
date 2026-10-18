---
title: Not found
description: No such resource, or a resource the caller may not know exists.
slug: /problems/not-found
sidebar_position: 6
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **404 Not Found** for a resource that does not exist, and deliberately for a
resource the caller is not entitled to see. The two cases are indistinguishable on purpose:
the answer must not reveal that a patient record exists.

A `404` on a collection endpoint usually means a mistyped path.

## What a client does

For a detail screen, show "not found" and offer to go back. Never retry as if it were
transient. If the caller believes the record should be visible, the correlation identifier
in `instance` is what to quote to an administrator.
