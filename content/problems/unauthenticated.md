---
title: Unauthenticated
description: The request carried no token, or a token the server could not accept.
slug: /problems/unauthenticated
sidebar_position: 4
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **401 Unauthorized** when the `Authorization` header is missing, the token is
expired, the signature does not verify, or the issuer is not one this server trusts.

The response carries `WWW-Authenticate` pointing at the protected-resource metadata.

## What a client does

Refresh the token once and retry the request. If the refresh fails, send the user through
the sign-in flow again. Do not loop.
