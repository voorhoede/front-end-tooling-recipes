# PostCSS process and watch

## Functionality

Compile CSS with support for CSS imports, variables, vendor prefixing and minification using [PostCSS](http://postcss.org/).

This setup works out-of-the-box. It also includes a watcher which re-compiles the CSS whenever a CSS file changes.


## Usage

### Write modern CSS

You can write modern CSS with support for [CSS imports](https://developer.mozilla.org/en/docs/Web/CSS/@import) and
[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) without worrying about
[vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix).

[PostCSS](http://postcss.org/) is pre-configured to compile all your CSS in the [`src/`](src/) directory using the
following processors:

* [CSS `@import`s](https://github.com/postcss/postcss-import) to write modular CSS.
* [Custom properties](https://github.com/postcss/postcss-custom-properties) (CSS variables) for parametrised CSS.
* [Color functions](https://github.com/postcss/postcss-color-function) to adjust colors using modifier functions.
* [RGBA color fallback](https://github.com/postcss/postcss-color-rgba-fallback) adds a hex fallback value to every rgba value. 
* [Pixrem](https://github.com/robwierzbowski/node-pixrem) adds pixel fallback before every rem value.
* [Pre calculation](https://github.com/postcss/postcss-calc) for better `calc` support. 
* [Autoprefixer](https://github.com/postcss/autoprefixer) to auto vendor prefix your CSS.
* [cssnano](http://cssnano.co/) to minify your CSS for production.

[`src/index.css`](src/index.css) is the main entry point for the CSS compile script. So be sure to start there.

Note: the aim of this recipe is to write spec compliant CSS. All processors are selected to enable this and improve browser support. Processors adding non-standard features are avoided.


### Add & configure processors

You can configure the processors mentioned above or add your own processors in [`scripts/postcss.js`](scripts/postcss.js).


### Compile CSS

To compile your CSS for production (incl. minification), run:

```bash
npm run build:css
```

Or simply `npm run build` as this will also run `build:css`.

The compiled CSS plus its sourcemap is written to the `dist/` directory.


### Development

To compile your CSS (excl. minification) whenever you make a change to a CSS file:

```bash
npm run watch:css
```

Or simply `npm run watch` as this will also run `watch:css`.



These scripts are configured in [`package.json`](package.json).




