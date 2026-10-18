---
title: Malformed request
description: The request could not be parsed as a valid HTTP request or body.
slug: /problems/malformed-request
sidebar_position: 3
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **400 Bad Request** when the server cannot parse what arrived: broken JSON, an
unsupported `Content-Type`, a malformed query parameter, or a required header missing or
inconsistent.

If the body parsed and the values are wrong, the answer is
[validation-failed](./validation-failed.md) instead.

## What a client does

Treat this as a bug in the client: check the request construction, the headers and the
serialisation. Retrying the same bytes will fail the same way.
