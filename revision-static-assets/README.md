# Revision static assets

## Functionality

Give files a unique filename based on their contents and update references to them. A hash is generated based on a file's contents and added to its filename. This ensures a filename only changes when a file's contents change.
Revisioning allows browsers to aggresively cache these assets by *setting their cache headers to never expire*. 


## Usage

### Install dependencies

All dependencies needed to run this recipe are pre-configured in [`package.json`](package.json). You just need to install these:

```bash
npm install
```

Note: it's smart to update to the latest versions of these dependencies.


### Configure working directory and file patterns

This recipe revisions files in a given working directory. You can adjust this `workingDir` in [`scripts/revision.js`](scripts/revision.js) (defaults to `dist/`).

Revision is done in 2 steps. During the first step (`revisionHash()`) all matching files are renamed with a hash based on their content added to their filename. A file's hash only changes when its contents changes. After all matching files are revisioned, the original files are removed. During the second step (`revisionReplace()`) references to the revisioned files in other files are updated to match the new hashed filenames. You can adjust the file patterns in these steps to match your setup.

In both steps glob patterns are used (`gulp.src([ filePatterns ]).pipe(filter( ... ))`) to match the desired files to revision or update references in. You can adjust these patterns to your liking.

The revision script ([`scripts/revision.js`](scripts/revision.js)) is annotated line-by-line explaining these steps in more detail.


### Run build and revision script

To demonstrate the revisioning script, this recipe has an example project in the [`src/` directory](src/) with an HTML file including a stylesheet, an image, a script file and registering a Service Worker. The stylesheet in turn uses custom font files. The Service Worker pre-caches all assets and serves them from cache.

A `build` script is pre-configured to copy this project to `dist/`. The `revision` script runs `postbuild` and revisions all matching static assets in the `dist/` directory.

You can find the `build`, `postbuild` and `revision` scripts in [`package.json`](package.json). To run the build and revision all files in the `workingDir`:

```bash
npm run build
```

Open the `dist/` directory to view the revisioned files or use `npm start` to view the result in the browser.


### Serve revisioned files with never expire cache strategy

You'll need to configure your server to serve the revisioned files with a *never expire* for the revisioning to have effect:

```
cache-control: public, max-age=31536000, immutable
```

The revisioned files match the following pattern: `/.*-[0-9a-f]{10}\..*/`, which can be used to selectively set this cache control header:

**Express**

```js
const app = app = express()
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => { 
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    next()
})
```

**Apache**

```
<filesMatch ".*-[0-9a-f]{10}\..*">
    Header set Cache-Control "public, max-age=31536000, immutable"
</filesMatch>
```

**Nginx**

```
location ~* .*-[0-9a-f]{10}\..* {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```


## More resources

* [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)
* [Improving Performance with Cache-Control: Immutable](https://www.keycdn.com/blog/cache-control-immutable/)
