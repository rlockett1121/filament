import fs from 'fs'
import puppeteer from 'puppeteer'
import schema from './schema.js'

for (const [file, options] of Object.entries(schema)) {
    const directory = file.substring(0, file.lastIndexOf('/'))

    if (directory) {
        fs.mkdirSync(`images/${directory}`, { recursive: true })
    }

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost/${options.url}`, { waitUntil: 'networkidle2' });
        const element = await page.waitForSelector(options.selector);

        await element.screenshot({ path: `images/${file}.jpg` })

        await element.dispose();

        await browser.close();
    })();
}
