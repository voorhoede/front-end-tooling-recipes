# Conventional commits and changelog

## Functionality

Help commit in a [standard format](CONTRIBUTING.md#commit-message-format)
so the changelog can be updated automatically on every version bump.


## Usage

### Write standard commit messages

Write your commit messages in [standard format](CONTRIBUTING.md#commit-message-format).
You can do this in a step-by-step wizard by running:

```bash
npm run commit
```

### Bump version with updated changelog

When you bump the [version](https://docs.npmjs.com/cli/version) of the project, the [changelog](CHANGELOG.md) will be updated automatically.

```bash
npm version [major | minor | patch]
```

### Scripts

After installing dependencies (run `npm install`) the following scripts are available:

`npm run ...` | Description
---|---
`changelog` | Updates `CHANGELOG.md` based on commits. Done automatically via `version`.
`commit` | Prompts you to fill out your git commit message step-by-step.
`version patch` | Bump version with only backwards-compatible bug fixes.
`version minor` | Bump version with new functionality (and bug fixes).
`version major` | Bump version with breaking changes.