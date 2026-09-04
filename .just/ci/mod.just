set working-directory := '../..'

import '../shared.just'

[default, private]
main:
	@just --list ci

# Run everything a change must pass before merge
[group('ci')]
check: dependencies-install lint test
