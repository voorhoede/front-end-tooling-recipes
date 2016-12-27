# Nightwatch server and browsers

## Functionality

This setup lets you run your project's end-to-end (e2e) tests in Chrome and Firefox using [Nightwatch.js](http://nightwatchjs.org/).

The setup is pre-configured to work out-of-the-box. It includes a local server and has Selenium adapters for Chrome and Firefox.


## Usage

### Install dependencies

All dependencies needed to run the tests are pre-configured in [`package.json`](package.json). You just need to install these:

```bash
npm install
```

Note: it's smart to update to the latest versions of these dependencies.


### Configure server and browsers

This setup is pre-configured to start a simple http server on `localhost:64448` before running the tests.
The setup is currently pre-configured to run in Chrome and Firefox.
You can change the configuration of the server and browsers in [`test/nightwatch.config.js`](test/nightwatch.config.js).


### Add e2e tests

This setup is pre-configured to run all e2e tests in [`test/e2e/`](test/e2e/). There is currently only a simple example in there.

Note: you can also use *page objects* inside your tests. You will need to enable these in [`test/nightwatch.config.js`](test/nightwatch.config.js).


### Run e2e tests

Run all e2e tests:

```bash
npm run test:e2e
```

Alternatively, run the standard `test` command, which is configured to also run the e2e tests:

```bash
npm run test
```

These scripts are pre-configured in [`package.json`](package.json). The browsers to test in are passed as script arguments.
