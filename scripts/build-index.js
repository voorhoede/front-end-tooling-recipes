const formatter = require('voorhoede-ocelot-formatter');
const fs = require('fs');
const pkg = require('../package.json');
const rebaseRelativeUrls = require('../lib/rebase-relative-urls');

const masterBranchUrl = pkg.repository.url + '/blob/master/';
const outputFilename = 'dist/index.html';

fs.readFile('README.md', 'utf8', (err, readme) => {
    if (err) {
        console.error('Error reading README.md', err);
        return;
    }
    formatter(readme, { toc: false })
        .then(html => rebaseRelativeUrls(html, masterBranchUrl))
        .then(html => fs.writeFile(outputFilename, html));
});