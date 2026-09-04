import '.just/shared.just'

# Verification gate
mod ci '.just/ci'

[default, private]
main:
	@just --list

