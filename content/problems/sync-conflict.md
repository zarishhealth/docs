---
title: Sync conflict
description: Concurrent edits were accepted locally and now wait for review.
slug: /problems/sync-conflict
sidebar_position: 8
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **409 Conflict** when an update would overwrite a version that another site
changed while this one was offline. The platform never resolves overlapping clinical data by
"newest timestamp wins": both versions are kept and the difference goes to the review queue.

## What a client does

Take the user to the sync review screen, show both versions side by side, and record the
decision. The response identifies the queued conflict so the client can link straight to it.
