# Contributing

## Contribution process

Create an issue before starting work or opening a pull request. Use the issue to
describe the problem, proposed change, and intended scope.

AI-assisted contributions are welcome. A human must review all contributed code
and all project communication, including issues, pull requests, reviews, and
comments, before submission.

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

## Commits

Write commit messages using the [Conventional Commits](https://www.conventionalcommits.org/)
format. For example:

```text
feat: add configurable prompt paths
fix: preserve trailing prompt content
docs: clarify installation steps
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
