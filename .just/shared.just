[private]
require-node:
	@command -v node > /dev/null 2>&1 || (echo "node is required" && exit 1)
	@command -v npm > /dev/null 2>&1 || (echo "npm is required" && exit 1)

# Install locked npm dependencies
[group('dependencies')]
dependencies-install: require-node
	npm ci

# Build the distributable extension and installer
[group('development')]
build: require-node
	npm run build

# Format source code and project files
[group('development')]
format: require-node
	npm run format

# Check source code and project file formatting
[group('development')]
format-check: require-node
	npm run format:check

# Run the TypeScript compiler checks
[group('development')]
typecheck: require-node
	npm run check

# Run the test suite
[group('development')]
test: require-node
	npm test

# Inspect the files that would be published to npm
[group('package')]
package-check: require-node
	npm pack --dry-run

# Install the extension into Copilot CLI
[group('copilot')]
extension-install: require-node
	npm run build
	node dist/install.js install --force
