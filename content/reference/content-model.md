---
title: Documentation content model
description: Choose a documentation type based on the reader's goal.
slug: /reference/content-model
sidebar_position: 1
status: adopted
last_reviewed: "2026-10-16"
audience: Documentation authors and reviewers
---


Choose the content type that matches what the reader needs to do. A page should solve one main problem; split unrelated tasks or concepts into separate pages and link them.

| Type | Use it when the reader needs to… | Suggested title |
| --- | --- | --- |
| Concept | Understand what something is, why it matters, or how it fits | “About local-first architecture” |
| Get started | Reach a useful first result with a short sequence of steps | “Get started with the documentation” |
| How-to | Complete a specific task with prerequisites and numbered steps | “Review a documentation change” |
| Tutorial | Learn by completing a guided example from start to finish | “Create an accessible Mermaid diagram” |
| Reference | Look up stable rules, formats, fields, or supported values | “Repository and file naming rules” |
| Troubleshooting | Diagnose a known problem and take safe corrective steps | “Troubleshoot broken documentation links” |
| Decision record | Understand why maintainers selected one option over alternatives | “Use a local-first architecture” |

## Required page structure

1. Start with a short explanation of the page's purpose and intended reader.
2. Put essential information first. Explain one idea per paragraph.
3. Use descriptive headings and lists or tables when they improve scanning.
4. State prerequisites before instructions and list actions in the order the reader performs them.
5. Link to the canonical source instead of copying a long explanation.
6. End with related reading or a next step when it helps the reader.

## Page metadata

Use YAML front matter at the beginning of each published Markdown page:

```yaml
---
title: Clear page title
description: One sentence explaining what a reader can learn or do.
status: draft
last_reviewed: "YYYY-MM-DD"
audience: Intended reader
---
```

Use `draft`, `proposed`, `adopted`, `implemented`, or `deprecated` for `status`. A page may use `implemented` only when a maintainer has verified the behavior it describes.

## Sources and claims

- Cite the primary standard, specification, or official product documentation when available.
- Record when a fact was checked if it can change over time.
- Label an unverified assumption as an open question.
- Do not turn a draft design, example, or future repository into a claim about current production behavior.
- Do not make clinical, legal, security, or regulatory assurances without an authorized evidence review.

## Reuse and diagrams

Put reusable content in one maintained location and link to it. Diagrams should explain a relationship, decision, or process that prose alone makes difficult to follow. Pair every diagram with an equivalent text description and use the [diagram review template](https://github.com/zarishhealth/docs/blob/main/resources/templates/diagram-brief.md).

## Sources

- [GitHub Docs: Best practices for GitHub Docs](https://docs.github.com/en/contributing/writing-for-github-docs/best-practices-for-github-docs)
- [GitHub Docs: Content model](https://docs.github.com/en/contributing/style-guide-and-content-model/about-the-content-model)
- [GitHub Docs: Templates](https://docs.github.com/en/contributing/writing-for-github-docs/templates)
