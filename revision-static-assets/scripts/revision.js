const filter = require('gulp-filter')
const gulp = require('gulp')
const override = require('gulp-rev-css-url')
const path = require('path')
const rev = require('gulp-rev')
const revDel = require('gulp-rev-delete-original')
const revReplace = require('gulp-rev-replace')

const projectDir = path.join(__dirname, '..')
const workingDir = path.join(projectDir, 'dist')
const manifestFilename = 'rev-manifest.json'
const revPattern = /.*-[0-9a-f]{10}\..*/

function revision () {
  return revisionHash()
    .on('end', () => revisionReplace())
    .on('end', () => console.log(`Revisioned files in ${ path.relative(projectDir, workingDir) }`));
}

function revisionHash () {
  return gulp.src([                                       // revision files matching these patterns
      `${workingDir}/**/*.{css,css.map,js,js.map}`,
      `${workingDir}/**/*.{gif,ico,jpg,png,svg,webp}`,
      `${workingDir}/**/*.{woff,woff2}`,
    ])
    .pipe(filter(file => !revPattern.test(file.path)))    // prevent files from being revisioned twice
    .pipe(filter(file => !file.path.endsWith('/sw.js')))  // service workers must always be unrevisioned
    .pipe(rev())                                          // revision matching files
    .pipe(override())                                     // update references in revisioned files
    .pipe(revDel())                                       // remove original files
    .pipe(gulp.dest(workingDir))                          // save revisioned files
    .pipe(rev.manifest(manifestFilename))                 // create a revision manifest
    .pipe(gulp.dest(workingDir))                          // save the manifest
}

function revisionReplace () {
  const manifestPath = path.join(workingDir, manifestFilename)
  return gulp.src([                                       // update references in files matching these patterns
      `${workingDir}/**/*.html`,
      `${workingDir}/sw.js`,
    ])
    .pipe(filter(file => !revPattern.test(file.path)))    // exclude revisioned files as their content must not change
    .pipe(revReplace({                                    // replace referenced to revisioned files
        manifest: gulp.src(manifestPath)                  // which are listed in the revision manifest
    }))                                                   //
    .pipe(gulp.dest(workingDir))                          // save updated files
}

revision()
