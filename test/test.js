const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:3002';
let page;
let browser;
const width = 1280;
const height = 720

beforeAll(async () => {
    browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 80,
        args: [`--window-size=${width},${height}`, '–no-sandbox’, ‘–disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setViewport({width, height});
})

afterAll(() => {
    browser.close();
});

describe('Render Data for Volume Chart', () =>{
    //Preventing running testing before page load
    beforeEach(async () =>{
        await page.goto(pageUrl, {waitUntil: 'networkidle2'});
    });
    const divLowest = '#lowest';
    const divHeighest = '#heighest';
    const divAverage = '#average';
    const divCurrent = '#current';
    const divDifference = '#difference';

    test('Chart page loaded', async () =>{
        var div = '#priceVolumeChart h1';
        const title = await page.$eval(div, e=> e.textContent);
        expect(title).toEqual('Price Paid on Robinhood');

    });

    test('Loaded with specific data from a company' , async () =>{
        const loadedLowest = await page.$eval(divLowest, e => e.textContent);
        expect(loadedLowest).toEqual('5.83');
        
        const loadedHeighest = await page.$eval(divHeighest, e => e.textContent);
        expect(loadedHeighest).toEqual('22.02');

        const loadedAverage = await page.$eval(divAverage, e => e.textContent);
        expect(loadedAverage).toEqual('13.23');

        const loadedCurrent = await page.$eval(divCurrent, e => e.textContent);  
        expect(loadedCurrent).toEqual('11.92');
        
    })

    test('Calculated the difference in average price and current value percentage correctely', async () =>{
        
        const loadedCurrent = await page.$eval(divCurrent, e => e.textContent);
        const loadedAverage = await page.$eval(divAverage, e => e.textContent);
    
        let actual = await page.$eval(divDifference, e => e.textContent);
        let expectedValue = Math.abs(Math.round((loadedCurrent/loadedAverage*100-100)));
        let expected = expectedValue+'% Lower';
        expect(actual).toEqual(expected);
        
    });
}); 

