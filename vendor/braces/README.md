# Local `braces` security fork

This directory contains a minimal local fork of the MIT-licensed npm package `braces` 3.0.3. The original source and license are retained. It is maintained here because the upstream release has no patched version for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

The fork rejects patterns nested deeper than 100 brace or parenthesis levels before recursive AST processing. This bounds recursion in `compile`, `expand`, and `stringify`, which share the parser's AST. The parser's 10,000-character limit remains in place.

The local package version `3.0.4-zarishhealth.1` identifies this downstream patch; it is not an upstream release. `package.json` overrides all transitive `braces` dependencies to use this directory. Do not remove the override or replace this code with the vulnerable upstream version until a reviewed upstream fix is available.

Run the focused regression tests with `npm run test:security`; run `npm audit` and the repository checks after changing this fork.
