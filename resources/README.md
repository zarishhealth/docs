# Repository resources

This directory contains reusable authoring resources and maintainer-only inventories. It is separate from reader-facing pages under `content/`.

- [`templates/`](templates/README.md) contains reusable documentation templates.
- [`resources-registry.csv`](resources-registry.csv) indexes reusable resources.
- [`source-corpus-disposition.csv`](source-corpus-disposition.csv) records how the 124 Markdown files in the local `raw_inputs/` corpus were reviewed and whether any information was adapted.

The source corpus is ignored, local-only intake and its contents are not committed. The disposition CSV records source paths and review decisions; it does not reproduce source text. Some drafts contain credential-like material. Do not reuse those examples; revoke or rotate the credentials if they are real. Sensitive or unverified examples were excluded. Check the source files remain unchanged locally before any future maintenance work, and do not add them to a commit.
