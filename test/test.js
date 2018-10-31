import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
    
})

afterAll(() => {

});

describe('<PriceVolumeChart />', () =>{
    //Preventing running testing before page load
    beforeEach(() =>{
        
    });
  

    it('Renders react component', () =>{
        const wrapper = render(<PriceVolumeChart />);
        const title = wrapper.find('#title').text();
        expect(title).toEqual('Price Paid on Robinhood');
    });

    it('calls componentDidMount', () => {
        sinon.spy(Foo.prototype, 'componentDidMount');
        const wrapper = mount(<Foo />);
        expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
        Foo.prototype.componentDidMount.restore();
      });

    it('Displays with specific data from a company' , () =>{
       
        const wrapper = 
        expect(loadedLowest).toEqual('5.83');
        
        expect(loadedHeighest).toEqual('22.02');

        expect(loadedAverage).toEqual('13.23');

        expect(loadedCurrent).toEqual('11.92');
        
    })

    test('Displays the difference in average price and current value percentage correctely', async () =>{
        
        const loadedCurrent = await page.$eval(divCurrent, e => e.textContent);
        const loadedAverage = await page.$eval(divAverage, e => e.textContent);
    
        let actual = await page.$eval(divDifference, e => e.textContent);
        let expectedValue = Math.abs(Math.round((loadedCurrent/loadedAverage*100-100)));
        let expected = expectedValue+'% Lower';
        expect(actual).toEqual(expected);
        
    });
}); 

