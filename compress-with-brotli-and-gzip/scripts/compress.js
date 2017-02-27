// include depenencies (a-z)

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const brotli = require('gulp-brotli');
const merge = require('event-stream').merge;
const path = require('path');
const ora = require('ora');

// configure input, output and processors:

const inputDir = `${__dirname}/../dist/`;
const outputDir = inputDir;
const fileStream = () => gulp.src([
    `${inputDir}**/*.*`,
    `!${inputDir}**/*.br`,
    `!${inputDir}**/*.gz`
]);

const brotliSettings = {
    extension: 'br',
    skipLarger: true,
    mode: 0,
    quality: 11, // maximum compression
    lgblock: 0
};
const gzipSettings = {
    gzipOptions: { level: 9 }, // maximum compression
    skipGrowingFiles: true
};

// process input and write output to disk:

const brotliCompress = () => fileStream()
    .pipe(brotli.compress(brotliSettings))
    .pipe(gulp.dest(outputDir));

const gzipCompress = () => fileStream()
    .pipe(gzip(gzipSettings))
    .pipe(gulp.dest(outputDir));

const compress = () => {
    const spinner = ora('Compressing files').start();
    merge([
        gzipCompress(),
        brotliCompress()
    ])
    .on('end', () => spinner.succeed(`Compressed files saved to \`${path.relative(process.cwd(), outputDir)}/\`.`));
};

compress();
