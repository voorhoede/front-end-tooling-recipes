# Compress with Brotli and Gzip

## Functionality

Compress static files with Brotli and Gzip using maximum compression.
This greatly reduces file size. Which means files can download much faster.
For more background read [our blog post on static site implosion with Brotli and Gzip](https://www.voorhoede.nl/en/blog/static-site-implosion-with-brotli-and-gzip/).  


## Usage

### Install dependencies

All dependencies needed to run the tests are pre-configured in [`package.json`](package.json). You just need to install these:

```bash
npm install
```

Note: it's smart to update to the latest versions of these dependencies.


### Configure in- and output directory

Adjust the `inputDir` and `outputDir` in [`scripts/compress.js`](scripts/compress.js) (both default to `dist/`).


### Run compress script

Compress all files in `inputDir` and write to `outputDir`:

```bash
npm run compress
```

Note: This setup contains an example file in [`dist/examples/`](dist/examples/).
As this setup uses the `inputDir` as the `outputDir` the compressed files are placed right next to the original.


### Configure server to use precompressed files

You'll need to configure your server to serve the precompressed files when available.
In addition you can enable on-the-fly compression of dynamic assets.

* [Nginx configuration for serving precompressed files](lib/static-compression-nginx.conf)


## More resources

* [Next generation server compression with Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
* [Shrink-ray, Node.js compression middleware](https://github.com/aickin/shrink-ray)