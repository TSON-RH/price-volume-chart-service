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

  it('renders header', () => {
    const wrapper = shallow(<PriceVolumeChart />);
    expect(wrapper.find('h2').text()).toEqual('Price Paid on Robinhood');
  });


  it('renders svg chart',  () => {
    const wrapper = shallow(<PriceVolumeChart />);
    expect(wrapper.exists('svg')).toEqual(true);

  });
  it('renders rect exists',  () => {
    const wrapper = shallow(<PriceVolumeChart />);
    expect(wrapper.find('rect.chartArea').exists()).toEqual(true);

  });

}); 

