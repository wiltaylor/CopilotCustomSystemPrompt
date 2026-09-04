# Verification gate
mod ci '.just/ci'

alias build := ci::build
alias check := ci::check
alias dependencies-install := ci::dependencies-install
alias extension-install := ci::extension-install
alias format := ci::format
alias format-check := ci::format-check
alias lint := ci::lint
alias package-check := ci::package-check
alias test := ci::test
alias typecheck := ci::typecheck

[default, private]
main:
	@just --list
