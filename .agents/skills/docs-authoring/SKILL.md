---
name: docs-authoring
description: Write or revise ZarishHealth documentation using the repository content model, status labels, source rules, and privacy safeguards.
---

# Documentation authoring

## Use this skill when

Creating or revising a page under `content/`, adding a documentation template, or reviewing whether a claim is suitable for publication.

## Procedure

1. Read `AGENTS.md`, the relevant page, and the current [content model](../../../content/reference/content-model.md).
2. Identify the reader, their task or question, and the most suitable type: concept, get started, how-to, tutorial, reference, troubleshooting, or decision record.
3. Check the source of each factual, technical, standards, security, privacy, or legal claim. Prefer official sources.
4. Label the content `draft`, `proposed`, `adopted`, `implemented`, or `deprecated` accurately. The blueprint is proposed unless an authorized decision changes its status.
5. Write in plain language. Explain an acronym at first use, start with the main point, use active voice, and keep paragraphs focused.
6. Use synthetic examples only. Remove personal data, secrets, realistic identifiers, and confidential operational details.
7. Link to canonical content instead of duplicating it. Add a review date and relevant sources.
8. Run `npm run lint:md` and `npm run build`; inspect the rendered page for broken links and confusing layout.

## Do not

- Present a proposed repository or architecture as deployed.
- Promise that software is compliant, certified, secure, or production-ready without authorized evidence.
- Provide clinical or legal advice.
- Use a diagram as the only explanation.
- Edit `raw_inputs/` or `raw_files/`.

## Sources

- [GitHub Docs writing best practices](https://docs.github.com/en/contributing/writing-for-github-docs/best-practices-for-github-docs)
- [Repository content model](../../../content/reference/content-model.md)
- [Contributing guide](../../../content/guides/contributing.md)
