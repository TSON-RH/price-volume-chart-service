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


describe('Render Volume and Prices', () =>{
    test('initial item page is correct', async () =>{
        // var div = '.main h1';
        // const title = await page.$eval(div, e=> e.textContent);
        // expect(title).toEqual('HELLO FROM REACT');
    });
}); 