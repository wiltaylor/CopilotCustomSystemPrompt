# Contributing

## Local development

Install the dependencies and build the extension:

```sh
npm install
npm run build
```

Load the repository directly in Copilot CLI:

```sh
copilot --experimental --plugin-dir .
```

To test the global installer during development, link the package and install the
extension:

```sh
npm link
copilot-custom-system-prompt install --force
```

## Tests

Run the tests and inspect the npm package contents:

```sh
npm test
npm pack --dry-run
```

## Releases

npm authenticates this repository through trusted publishing with GitHub Actions.
Trigger a stable release by adding this trailer to the HEAD commit on `main`:

```text
release: true
```

Use `pre-release: true` for an alpha release. The workflow calculates the next
version from Conventional Commit messages, publishes it to npm with provenance,
then creates the matching GitHub release and tag.
