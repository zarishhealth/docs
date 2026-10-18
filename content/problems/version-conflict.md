---
title: Version conflict
description: The resource changed since the caller read it.
slug: /problems/version-conflict
sidebar_position: 7
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **412 Precondition Failed** when an `If-Match` header does not match the current
`ETag`, and as **409 Conflict** when the same mismatch is detected without a precondition.

This is optimistic concurrency control, and it is the normal outcome of two people editing
the same record on two devices. It is not an error in the data.

## What a client does

Re-read the resource, compare the two versions with the user, and let them keep one or merge
them by hand. Never overwrite on the user's behalf. Overlapping **clinical** edits follow
[sync-conflict](./sync-conflict.md) instead.
