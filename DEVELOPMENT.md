# Developing angular-fontawesome

## Tasks

The following commands are available through `yarn run`:

Command     | Purpose
---         | ---
build       | Build library using ng-pakagr
lint        | Verify code matches linting rules
start       | Run development server for demo application (uses Angular CLI)
test        | Execute unit tests

## Publishing

1. Set desired version in `package.json` and `src/lib/package.json`
1. `yarn build` - build project
1. Update CHANGELOG.md file
1. `git commit -a -m "Bump version"` - commit version bump and changelog
1. `cd dist && yarn publish` - publish to NPM
1. `git tag <version> && git push && git push --tags` - create a tag and push all changes to GitHub
