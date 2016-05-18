# Travis CI: deploy to GitHub Pages

## Functionality

Automatically create distributions and deploy them to [GitHub Pages](https://pages.github.com/) using [Travis CI](https://travis-ci.org).


## Usage

While the aim is to get automatic deploys, you'll need to do some preparation and configuration once:


### Create `gh-pages` branch

To be able to automatically deploy to GitHub Pages, you first need to [manually create a `gh-pages` branch](https://help.github.com/articles/creating-project-pages-manually/):

```bash
git clone github.com/user/repository.git
```
```bash
cd repository
git checkout --orphan gh-pages
git rm -rf .
```
```bash
echo "Placeholder page" > index.html
git add index.html
git commit -a -m "Placeholder page"
git push origin gh-pages
```


### Configure globals

The deploy script ([`scripts/deploy.sh`](scripts/deploy.sh)) is configured to use your user- and repository name.
You need to configure these `global`s once in [`.travis.yml`](.travis.yml):

* Replace `user` after `GH_USER:` with the username the repository belongs to.
* Replace `repository` after `GH_REPO:` with the name of the repository this script is in.


### Set encrypted access token

Travis CI needs to be able to push to the `gh-pages` branch of your repository. In order to give Travis access, you need
to [create a personal access token on GitHub](https://github.com/settings/tokens/new) with *repo* scope.

To ensure only Travis is able to use the token, you need to encrypt it.
For this you need to install the [Travis Command Line Client](https://docs.travis-ci.com/user/encrypting-files/):

```bash
gem install travis
```

Now you can encrypt the token and add it directly to `.travis.yml` as an environment global named `GH_TOKEN`:

```bash
travis encrypt -r user/repo GH_TOKEN=yournewpersonalaccesstoken --add env.global
```

Check `.travis.yml`, you should see an encrypted string behind `env.global.secure`.


### Adjust pre-deploy scripts

[`.travis.yml`](.travis.yml) is pre-configured to run `npm run build` and `npm test` before each deploy.
These scripts are configured with dummy scripts inside of [`package.json`](package.json).
Only if these scripts are successful, the distribution is actually deployed.

You should adjust these scripts or change the configuration to meet your project's needs.


### Adjust deploy script

The deploy script is pre-configured to deploy everything inside the `dist/` directory to the root of the `gh-pages` branch.
If you have a different setup you need to change this inside [`scripts/deploy.sh`](scripts/deploy.sh).


### Enable on Travis

* Go to your [Travis profile](https://travis-ci.org/profile/) (create an account first if you don't have one yet).
* Find your repository (you may need to click "sync account" first).
* Enable Travis for your repository (use the switch).
* Go to the settings of your repository on Travis. Enable "Build only if .travis.yml is present", "Build pushes" and "Build pull requests".

Now each push to the `master` branch will result in a deploy to GitHub Pages on every successful build.
