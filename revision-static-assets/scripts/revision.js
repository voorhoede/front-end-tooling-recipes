const filter = require('gulp-filter')
const gulp = require('gulp')
const override = require('gulp-rev-css-url')
const rev = require('gulp-rev')
const revDel = require('gulp-rev-delete-original')
const revReplace = require('gulp-rev-replace')

const workingDir = `${__dirname}/../dist/`
const manifestFilename = 'rev-manifest.json'
const pattern = /.*-[0-9a-f]{10}\..*/

function revision () {
  return revisionHash()
    .on('end', () => revisionReplace())
    .on('end', () => console.log(`Revisioned files in ${workingDir}`));
}

function revisionHash () {
  return gulp.src([
      `${workingDir}**/*.{css,css.map,js,js.map}`,
      `${workingDir}**/*.{gif,ico,jpg,png,svg,webp}`,
      `${workingDir}**/*.{woff,woff2}`,
    ])
    .pipe(filter(file => !pattern.test(file.path)))       // prevent files from being revisioned twice
    .pipe(filter(file => !file.path.endsWith('/sw.js')))  // service workers must always be unrevisioned
    .pipe(rev())                                          // revision matching files
    .pipe(override())                                     // update references in revisioned files
    .pipe(revDel())                                       // remove original files
    .pipe(gulp.dest(workingDir))                          // save revisioned files
    .pipe(rev.manifest(manifestFilename))                 // create a revision manifest
    .pipe(gulp.dest(workingDir))                          // save the manifest
}

function revisionReplace () {
  const manifestPath = `${workingDir}${manifestFilename}`
  return gulp.src([
      `${workingDir}**/*.html`,
      `${workingDir}sw.js`,
    ])
    .pipe(filter(file => !pattern.test(file.path)))       // exclude revisioned files as their content must not change
    .pipe(revReplace({                                    // replace referenced to revisioned files
        manifest: gulp.src(manifestPath)                  // which are listed in the revision manifest
    }))                                                   //
    .pipe(gulp.dest(workingDir))                          // save updated files
}

revision()
