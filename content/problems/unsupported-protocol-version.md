---
title: Unsupported protocol version
description: The caller asked for an API or MCP version the server does not serve.
slug: /problems/unsupported-protocol-version
sidebar_position: 10
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **400 Bad Request** when the requested version is outside the range the server
serves: an unknown `/api/vN` path, or an `MCP-Protocol-Version` header the server does not
implement.

## What a client does

Fall back to a version the server advertises. The server publishes what it serves through
the well-known metadata documents; a client should read those rather than hard-code a
version.

## Notes

MCP clients must send `MCP-Protocol-Version`, `Mcp-Method` and, for `tools/call`,
`resources/read` and `prompts/get`, `Mcp-Name`. A missing or contradictory header is
malformed, not version-unsupported.
