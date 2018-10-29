const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3002/';

let page;
let browser;
const width = 1280;
const height = 720

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({width, height});
})

afterAll(() => {
    browser.close();
});


describe('Render Volume and Prices Chart', () =>{
    //Preventing running testing before page load
    beforeEach(async () =>{
        await page.goto(pageUrl, {waitUntil: 'networkidle2'});
    });

    test('Initial chart', async () =>{
        var div = '#priceVolumeChart h1';
        const title = await page.$eval(div, e=> e.textContent);
        expect(title).toEqual('Price Paid on Robinhood');

        //await page.waitFor(1500);
    });

}); 