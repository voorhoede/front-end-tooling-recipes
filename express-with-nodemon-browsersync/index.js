const browserSync = require('browser-sync');
const express = require('express');

const app = express();
const port = 9777; // "xprs" in T9

// you can conditionally add routes and behaviour based on environment
const isDevelopment = 'development' === process.env.NODE_ENV;
const isProduction = 'production' === process.env.NODE_ENV;

// static example, add real routes here instead
app.use('/', express.static('src/'));

app.listen(port, listening);

function listening () {
    console.log('Demo server available on http://localhost:' + port);
    if(isDevelopment) {
        // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
        browserSync({
            files: ['src/**/*.{html,js,css}'],
            online: false,
            open: false,
            port: port + 1,
            proxy: 'localhost:' + port,
            ui: false
        });
    }
}
