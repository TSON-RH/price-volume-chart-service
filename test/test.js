const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3002/';

let page;
let browser;
const width = 1280;
const height = 720

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        //slowMo: 80,
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

    test('Chart page loaded', async () =>{
        var div = '#priceVolumeChart h1';
        const title = await page.$eval(div, e=> e.textContent);
        expect(title).toEqual('Price Paid on Robinhood');

        //await page.waitFor(1500);
    });

    test('Loaded with specific data from a company' , async () =>{
        const divLowest = '#lowest';
        const divHeighest = '#heighest';
        const divAverage = '#average';
        const divCurrent = '#current';

        const loadedLowest = await page.$eval(divLowest, e => e.textContent);
        expect(loadedLowest).toEqual('52 Week Low: $5.83');

        const loadedHeighest = await page.$eval(divHeighest, e => e.textContent);
        expect(loadedHeighest).toEqual('52 Week High: $22.02');

        const loadedAverage = await page.$eval(divAverage, e => e.textContent);
        expect(loadedAverage).toEqual('Average Price Paid: $13.22858133669609');

        const loadedCurrent = await page.$eval(divCurrent, e => e.textContent);
        expect(loadedCurrent).toEqual('Current Price: $11.92');
        
    })

}); 