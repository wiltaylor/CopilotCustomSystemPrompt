# Copilot Custom System Prompt

Load replacement and appended system prompts into the ordinary GitHub Copilot
CLI interface. The extension uses Copilot SDK's supported `systemMessage` API,
so Copilot keeps its native authentication, subscription billing, tools, and
model routing.

## Requirements

- GitHub Copilot CLI 1.0.82 or later with experimental features enabled
- Node.js 20.19 or later
- A GitHub Copilot subscription, unless the CLI uses BYOK

## Install from npm

Install the package globally, then install its extension into Copilot CLI:

```sh
npm install --global copilot-custom-system-prompt
copilot-custom-system-prompt install
```

Restart Copilot CLI with extension support enabled:

```sh
copilot --experimental
```

Without `--experimental`, Copilot 1.0.82 discovers the plugin but does not load
its extension. To replace an existing installation
during an upgrade, run:

```sh
copilot-custom-system-prompt install --force
```

The package has not been published yet. During local development, run
`npm link` before the installation command.

To load the repository directly during development:

```sh
npm install
npm run build
copilot --experimental --plugin-dir .
```

## Configure prompts

Create either prompt file under `~/.copilot/`:

- `SYSTEM.md` replaces Copilot's SDK-managed system prompt.
- `APPEND_SYSTEM.md` appends instructions to Copilot's SDK-managed prompt.

When both files exist, the extension replaces Copilot's prompt with `SYSTEM.md`
and appends `APPEND_SYSTEM.md` to that replacement.

Restart Copilot CLI after you change either file. Set `COPILOT_HOME` if your
Copilot configuration lives somewhere other than `~/.copilot`.

## Development

Run the complete local check:

```sh
npm test
npm pack --dry-run
```

## Publish a release

Add an npm automation token to the GitHub repository as the `NPM_TOKEN` Actions
secret. Trigger a stable release by adding this trailer to the HEAD commit on
`main`:

```text
release: true
```

Use `pre-release: true` for an alpha release. The workflow calculates the next
version from Conventional Commit messages, publishes it to npm with provenance,
then creates the matching GitHub release and tag.
