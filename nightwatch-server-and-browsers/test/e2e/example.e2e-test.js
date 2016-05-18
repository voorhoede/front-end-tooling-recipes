module.exports = {
    before: (browser) => browser.url(`${browser.launchUrl}example.html`),
    after:  (browser) => browser.end(),

    'Heading should be "Example"' : (browser) => browser
        .waitForElementVisible('h1', 1000)
        .assert.containsText('h1', 'Example')
};