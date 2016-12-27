# Contributing

The aim of this project is to provide developers with tooling setups which work out-of-the-box.
Contributions should be aimed towards this and / or improve the development workflow.


## Guidelines

### Pull Requests

For new additions or changes to the recipes, create a branch and submit a Pull Request.
Only add/change 1 recipe per Pull Request.

### Setup

* All recipes must be placed in the `recipes` directory.
* Within the `recipes` directory, each recipe must be placed in its own directory.
* Each recipe must have a `README.md` describing its purpose and usage.
* Each recipe must be linked to from the main [project readme](/README.md#recipes).

#### Readme file (`README.md`)

* Must have recipe name as title (`# My recipe`)
* Must have description of functionality in non-tech terms.
* Must have instructions for usage including re-configuration.

See existing recipes for examples.


### Commit message format

Each commit message must have a *header* and optionally a *body*. The header has a special format that includes a type, a scope and a summary:

```
<type>(<scope>): <summary>
<BLANK LINE>
<body>
```

Note: you can use `npm run commit`, prompting you to fill out the git commit message step-by-step.

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope
The scope could be anything specifying place of the commit change. The scope is optional.

In case of a feature or fix to a demo it would typically be the name of the module, e.g. `fix(todo-app):`.

#### Summary
The summary contains succinct description of the change. Keep it clear, but short. Put the rest in the body.

#### Body
The body should include the motivation for the change and contrast this with previous behavior.

Note: the commit message format guidelines are based on [Angular's Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).
