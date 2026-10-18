---
title: Validation failed
description: The request body failed schema or business validation.
slug: /problems/validation-failed
sidebar_position: 2
status: proposed
last_reviewed: "2026-10-19"
audience: API client developers
---

Returned as **422 Unprocessable Content** when the body parsed but one or more values are
not acceptable: a missing required field, a value outside its range, a code that is not in
the referenced value set, or a rule the domain enforces.

## Shape

```json
{
  "type": "https://zarishhealth.github.io/docs/problems/validation-failed",
  "title": "Validation failed",
  "status": 422,
  "detail": "One or more fields are invalid.",
  "instance": "urn:uuid:0192f4a8-7b3c-7d1e-9a2b-3c4d5e6f7a8b",
  "errors": [
    { "pointer": "/birthDate", "code": "invalid-date", "detail": "Not a valid date." }
  ]
}
```

`errors[].pointer` is a [JSON Pointer](https://www.rfc-editor.org/rfc/rfc6901.html) into the request body.

## What a client does

Show the offending fields, keep the entered data, and let the user correct it. Do not retry
unchanged. `detail` never repeats the submitted personal data.
