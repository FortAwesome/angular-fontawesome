# Developer Documentation

Thanks for taking the time to consider contributing to the project. You will find some example documentation here that will help you get a local environment setup for contributing to the project as well as some helpful guidance on how you can help keep `angular-fontawesome` going.

## Prerequisites

* [git](https://git-scm.com/downloads)
* [node](https://nodejs.org/en/download/)
* [yarn](https://yarnpkg.com/en/docs/install)

## Setting up the local environment

1. `git clone https://github.com/FortAwesome/angular-fontawesome`
2. `yarn` - install dependencies
3. `yarn start` - start sample application
4. Visit http://localhost:4200 and observe sample application running

## Make changes

1. Modify the code. You can use sample application from the previous step to check that your changes behave as intended.
2. Once you're done with the implementation add relevant tests and ensure that `yarn lint` and `yarn test` pass.
3. Submit a pull request.

## Development tasks

Development tasks are managed as `scripts` inside of `package.json`. Below are the description of the common tasks:

Command     | Purpose
---         | ---
`yarn lint`        | Verify code style
`yarn test`        | Execute unit tests
`yarn start`       | Run development server for the demo application
`yarn build`       | Build library

## Releasing

1. Bump version in `package.json`
1. Add contributors to `package.json` and `README.md`
1. Update Compatibility table in `README.md`
1. Update the `CHANGELOG.md`
1. Update the `UPGRADING.md` if necessary
1. `yarn build`
1. `cd dist/angular-fontawesome`
1. `npm publish`
1. `git commit -a -m 'Release VERSION'`
1. `git tag <version> && git push && git push --tags` - create a tag and push all changes to GitHub
1. Create a [new release](https://github.com/FortAwesome/angular-fontawesome/releases/new) with CHANGELOG details
