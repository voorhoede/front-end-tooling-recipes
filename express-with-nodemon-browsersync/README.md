# Express with Nodemon & Browsersync

## Functionality

Auto restart [ExpressJS](http://expressjs.com/) server and auto reload browser on file changes.

This setup uses file watchers when the server is started in development mode (see [usage](#usage)).
If server files change (e.g. [`index.js`](index.js)), the server itself automatically restarts (using [Nodemon](http://nodemon.io/)).
If browser files change (e.g. [`src/index.html`](src/index.html) or [`src/index.css`](src/index.html)) the browser automatically reloads (or injects) (using [Browsersync](https://www.browsersync.io/)).
Interactions are also synced when multiple browser windows are connected.

Note: Automatic browser reloading only happens on the proxy `http://localhost:9778`, not the regular `http://localhost:9777`.

## Usage

After installing dependencies using `npm install` the following scripts are available:

`npm run ...` | Description
---|---
`start` | Alias for `start:dev`.
`start:dev` | Starts a development server on `http://localhost:9777` ("xprs" in T9) and `http://localhost:9778` with live reload and synced interaction.
`start:prod` | Starts a production server on `http://localhost:9777`.

### Development server

* has caching disabled.
* auto-restarts server on server file changes.
* auto-reloads browser on browser file changes.

### Production server

* has caching enabled.
* has dynamic Brotli and Gzip compression enabled.
* has no auto-reload.


## More resources

* [Express - Production best practices](https://expressjs.com/en/advanced/best-practice-performance.html)
* [Next generation server compression with Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
* [Shrink-ray, Node.js compression middleware](https://github.com/aickin/shrink-ray)
