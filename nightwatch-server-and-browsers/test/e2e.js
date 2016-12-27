/**
 * Starts a test server for the app.
 * Runs the entire end-to-end (e2e) test suite.
 * Stops the test server.
 */

const connect = require('gulp-connect');
const gulp = require('gulp');
const nightwatch = require('gulp-nightwatch');
const yargs = require('yargs');

runTests({
    configFile: __dirname + '/nightwatch.config.js',
    cliArgs: yargs.argv
});

function runTests(config) {
    startApp();
    gulp.src('')
        .pipe(nightwatch(config))
        .on('end', closeApp)
        .on('error', (err) => {
            console.error(err);
            closeApp();
            process.exit(1);
        });
}

function startApp() {
    connect.server({
        root: './',
        port: require('./nightwatch.config').app_port
    });
}

function closeApp() {
    connect.serverClose();
}