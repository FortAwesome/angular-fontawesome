# Developing angular-fontawesome

## Tasks

The following commands are available through `npm run` or `yarn`:

Command     | Purpose
---         | ---
build       | Build library using ng-packagr
lint        | Verify code matches linting rules
start       | Run development server for demo application (uses Angular CLI)
test        | Execute unit tests

## Release this project
<a name="release"></a>

1. Bump version in `package.json`
1. Add contributors to `package.json` and `README.md`
1. Update the `CHANGELOG.md`
1. `npm run build`
1. `cd dist/angular-fontawesome`
1. `npm publish`
1. `git commit -a -m 'Release VERSION'`
1. `git tag <version> && git push && git push --tags` - create a tag and push all changes to GitHub
1. Create a [new release](https://github.com/FortAwesome/angular-fontawesome/releases/new) with CHANGELOG details
