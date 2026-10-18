---
title: Rate limited
description: Too many requests in the current window.
slug: /problems/rate-limited
sidebar_position: 9
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **429 Too Many Requests** with a `Retry-After` header giving the number of
seconds to wait.

## What a client does

Wait for `Retry-After`, then retry once. A client that syncs a large backlog should back off
exponentially and spread the work, rather than hammering the endpoint.
