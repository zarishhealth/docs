# ZarishHealth documentation

This repository is the source of truth for reviewed, reader-facing documentation and reusable writing resources for the ZarishHealth GitHub organization. It is intended for developers, health-program teams, contributors, and readers who do not write code.

Start with the [documentation home](content/index.md), [getting started](content/get-started/index.md), or the [organization blueprint](content/architecture/organization-blueprint.md). The blueprint is a proposal; it does not describe deployed software or approved hosting.

## Repository map

| Path | What it contains |
| --- | --- |
| `content/` | Reviewed guides, architecture, references, and the glossary |
| `resources/` | Reusable templates, resource registry, and maintainer-only source disposition inventory |
| `assets/` | Source brand kit and its documentation |
| `static/` | Selected brand assets copied for the docs site |
| `agent-skills/skills/` | Writing and diagram skills for agents |
| `raw_inputs/`, `raw_files/` | Local-only, ignored intake; never commit or publish these folders |

See [`resources/README.md`](resources/README.md) for the maintainer resource index and the disposition record for the local draft corpus. The raw source files themselves remain ignored and are not included.

## Preview and validate

Requirements: Node.js 24 or later and npm.

```bash
npm ci
npm run start
```

The local preview opens at the URL printed by Docusaurus. To validate the documentation before opening a pull request, run:

```bash
npm run lint:md
npm run build
```

The GitHub Actions workflow runs the same checks. The build is configured for the planned project-site path, `https://zarishhealth.github.io/docs/`, but it does **not** deploy. As of 2026-10-16, this repository is private and GitHub Pages is disabled. GitHub Pages sites are publicly available even when their source repository is private, if the plan and organization allow Pages; review visibility, content, assets, licenses, and publication approval before enabling a deployment. See [GitHub's Pages publishing guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Documentation and safety

- Keep public-facing examples synthetic. Never commit patient or beneficiary data, secrets, or credentials.
- Label decisions as proposals until they are adopted, and as implemented only after verification.
- Cite authoritative sources for standards, legal claims, and changing technical guidance.
- Diagrams supplement text; include an equivalent explanation in words.

See [contributing](content/guides/contributing.md), the [content model](content/reference/content-model.md), and the [repository agent guidance](AGENTS.md).

## License

This repository currently contains separate license texts: `LICENSE` for the documentation and `LICENSE_CODE` for code and automation. The brand kit has its own `assets/license.md`. Review those files before reusing material; this README does not change their terms.
