---
name: diagram-accessibility
description: Create editable, reader-centered Mermaid diagrams with equivalent text and an explicit maintenance owner.
---

# Diagram accessibility

## Use this skill when

Adding or revising a flowchart, architecture map, sequence, decision, or other diagram in documentation.

## Procedure

1. Read `AGENTS.md` and the [diagram brief](../../../resources/templates/diagram-brief.md).
2. State the audience, question, scope, and the article passage that the diagram will complement.
3. Choose the simplest diagram type and direction. Give nodes meaningful labels and show clear starting points and decision outcomes.
4. Keep the Mermaid source in Markdown or a maintained `.mmd` file. Do not rely on a screenshot as the only editable source.
5. Add a nearby prose description that communicates the same relationships and outcomes.
6. Do not communicate status by color alone. Define abbreviations and distinguish proposal from verified behavior.
7. Use no real or realistic patient, beneficiary, staff, account, or deployment data.
8. Ask another reviewer to explain the diagram. Simplify it if the intended flow is not clear.
9. Run the Markdown lint and documentation build.

## Do not

- Use decoration to compensate for unclear writing.
- Add information to the diagram that is absent from the text.
- Claim a proposed system is implemented.
- Publish diagrams without a source of truth and review trigger.

## Sources

- [GitHub Docs: Creating diagrams](https://docs.github.com/en/contributing/writing-for-github-docs/creating-diagrams-for-github-docs)
- [Mermaid syntax reference](https://mermaid.js.org/intro/)
