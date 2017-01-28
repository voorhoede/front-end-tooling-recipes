# Rollup bundle and watch

## Functionality

Bundle JS files with support for ES2015/16, minification and sourcemaps using [Rollup](http://rollupjs.org/).

This setup works out-of-the-box. It also includes a watcher which re-bundles the JS files whenever a JS file changes.


## Usage

### Write modern JS

You can write modern JS with support for [ES modules](https://github.com/rollup/rollup/wiki/ES6-modules) using [`import` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [most ES2015/16 features](https://buble.surge.sh/guide/#supported-features) without worrying about transpiling to ES5 for older browsers.

[Rollup](http://rollupjs.org/) is used to write modular JS and tree-shake unused functions. This setup is pre-configured to compile all your JS in the [`src/`](src/) directory using the following plugins:

* [Node Resolve Plugin](https://github.com/rollup/rollup-plugin-node-resolve) to use external ES modules.
* [CommonJS Plugin](https://github.com/rollup/rollup-plugin-commonjs) to use external CommonJS modules.
* [Buble](https://buble.surge.sh/guide/) for fast and lightweight transpiling of your code to ES5. If you need more feature support, consider the heavier [Babel Plugin](https://github.com/rollup/rollup-plugin-babel).
* [Uglify](https://github.com/TrySound/rollup-plugin-uglify) to minify your JS for production.
* [ESLint](https://github.com/TrySound/rollup-plugin-eslint) to validate syntax and code style.
* [Rollup Watch](https://github.com/rollup/rollup-watch) for fast incremental rebuilds during development.

[`src/index.js`](src/index.js) is the main entry point for the JS compile script. So be sure to start there.


### Add & configure plugins

You can configure the plugins mentioned above or add your own [plugins](https://github.com/rollup/rollup/wiki/Plugins) in [`rollup.config.js`](rollup.config.js).


### Compile JS

To compile your JS for production (incl. minification), run:

```bash
npm run build:js
```

Or simply `npm run build` as this will also run `build:js`.

The compiled JS plus its sourcemap is written to the `dist/` directory.

Note: `console` and `debugger` are only allowed in [development](#development).


### Development

To compile your JS (excl. minification) whenever you make a change to a JS file:

```bash
npm run watch:js
```

Or simply `npm run watch` as this will also run `watch:js`.



These scripts are configured in [`package.json`](package.json).


## More resources

* [Riot with Rollup recipe](https://github.com/riot/examples/tree/gh-pages/rollup)