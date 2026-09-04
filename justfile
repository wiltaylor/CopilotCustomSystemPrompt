# Verification gate
mod ci '.just/ci'

[default, private]
main:
	@just --list

# Build the distributable extension and installer
[group('development')]
build: ci::build

# Run the complete merge gate
[group('development')]
check: ci::check

# Install locked npm dependencies
[group('dependencies')]
dependencies-install: ci::dependencies-install

# Install the extension into Copilot CLI
[group('copilot')]
extension-install: ci::extension-install

# Format source code and project files
[group('development')]
format: ci::format

# Check source code and project file formatting
[group('development')]
format-check: ci::format-check

# Run all static checks
[group('development')]
lint: ci::lint

# Inspect the files that would be published to npm
[group('package')]
package-check: ci::package-check

# Run the test suite
[group('development')]
test: ci::test

# Run the TypeScript compiler checks
[group('development')]
typecheck: ci::typecheck
