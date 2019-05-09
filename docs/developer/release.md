# Releasing `angular-fontawesome`

1. Update `package.json` and `src/lib/package.json` and change `version` and add any contributors
2. Update the `docs/CHANGELOG.md`
3. `npm run build`
4. `cd dist`
5. `npm publish`
6. `git commit -a -m 'Release VERSION'`
7. `git tag <version> && git push && git push --tags` - create a tag and push all changes to GitHub
8. Create a [new release](https://github.com/FortAwesome/angular-fontawesome/releases/new) with CHANGELOG details
