const formatter = require('voorhoede-ocelot-formatter');
const fsp = require('fs-promise');
const promisify = require('bluebird').promisify;
const globp = promisify(require('glob'));
const path = require('path');
const pkg = require('../package.json');
const rebaseRelativeUrls = require('../lib/rebase-relative-urls');
const saveFile = require('../lib/save-file');

const githubUser = 'voorhoede';
const masterBranchUrl = `https://github.com/${githubUser}/${pkg.name}/blob/master/`;
const outputDir = 'dist/';

globp('**/README.md', { ignore: '**/node_modules/**'})
    .map(filename => buildPage(filename))
    .then(() => console.log(`Formatted all READMEs as HTML in \`${outputDir}\`.`))
    .catch(err => console.error('Error formatting READMEs', err));

function buildPage (filename) {
    const dirname = path.dirname(filename);
    const isIndex = (dirname === '.');
    return fsp.readFile(`${dirname}/README.md`, 'utf8')
        .then(readme => formatter(readme, { 
            github: `${githubUser}/${pkg.name}`, 
            toc: false 
        }))
        .then(html => isIndex ? html : rebaseRelativeUrls(html, `${masterBranchUrl}${dirname}/`))
        .then(html => saveFile(`${outputDir}${dirname}/index.html`, html));
}