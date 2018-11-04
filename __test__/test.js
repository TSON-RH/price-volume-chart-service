import React from 'react';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceVolumeChart from '../client/src/components/PriceVolumeChart';

Enzyme.configure({ adapter: new Adapter() });

const state = {    
  symbol: 'BAHRINGER INC',
  name: 'Bahringer Inc',
  prices: [3.29, 3.39, 3.49, 3.59, 3.69, 3.79, 3.89, 3.99, 4.09, 4.19, 4.29, 4.39, 4.49, 4.59, 4.69, 4.79, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2],
  volumes: [77, 66, 93, 78, 31, 75, 55, 1, 60, 87, 1, 76, 70, 60, 47, 6, 54, 46, 41, 85, 5, 99, 30, 20, 95, 43, 6, 63, 40, 21],
  lowest: 3.29,
  highest: 6.3,
  averagePrice: 4.60305029392554,
  currentPrice: 5.94,
  difference:29,
  currentPriceIndex:26,
  averagePriceIndex:13,
  barColor: '#20ce99',
  xPositionCurrentPrice: 606.6095016611298
} 

describe('<PriceVolumeChart />', () => {

  // beforeEach(() => {
  //   global.fetch = jest.fn().mockImplementation(() => {
  //     const p = new Promise((resolve, reject) => {
  //       resolve({
  //         ok: true,
  //         id: 0,
  //         json: () => {
  //           return [{id: 0, symbol: "JOD", name: "Schmidt, Price and Skiles", price: 573.43, date: "Thu Oct 25 2018 09:00:00 GMT-0700 (PDT)", rating: 22, owner: 692}];
  //         },
  //       });
  //     });

  //     return p;
  //   });
  // });


  it('renders header', () => {
    const wrapper = shallow(<PriceVolumeChart />);
    expect(wrapper.find('h2').text()).toEqual('Price Paid on Robinhood');
  });


  it('renders svg chart',  () => {
    const wrapper = shallow(<PriceVolumeChart />);
    expect(wrapper.exists('svg')).toEqual(true);

  });
  it('renders background',  () => {
    mount(<PriceVolumeChart />);
    // wrapper.setState(state);
    // expect(wrapper.find(rect)).to.have.lengthOf(1);
    
  });

  // it('caculates difference correctly', () =>{

  //   wrapper.handleFetch()
  // })

  // it('renders ',  () => {
    
  // });

//   it('renders an `.icon-star`', () => {
//     const wrapper = shallow(<MyComponent />);
//     expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
//   });

//   it('renders children when passed in', () => {
//     const wrapper = shallow((
//       <MyComponent>
//         <div className="unique" />
//       </MyComponent>
//     ));
//     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   });

//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick).to.have.property('callCount', 1);
//   });
// });
// describe('<PriceVolumeChart />', () =>{
//     //Preventing running testing before page load
//     beforeEach(() =>{
        
//     });
  

//     it('Renders Price Volume Chart Component', () =>{
//         const wrapper = render(<PriceVolumeChart />);
//         expect(wrapper.find(''))
//         expect(title).toEqual('Price Paid on Robinhood');

//     });

//     it('Renders 30 bars', () => {

//     });

//     it('Renders ')

//     it('Displays with specific data from a company' , async () =>{
       
//         expect(loadedLowest).toEqual('5.83');
        
//         expect(loadedHeighest).toEqual('22.02');

//         expect(loadedAverage).toEqual('13.23');

//         expect(loadedCurrent).toEqual('11.92');
        
//     })

//     it('Displays the difference in average price and current value percentage correctely', async () =>{
        
        
//     });
}); 

