import React from 'react';
import $ from 'jquery';

class PriceVolumeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {    
            symbol: '',
            name: '',
            prices: [],
            volumes: [],
            lowest: 0,
            heighest: 0,
            averagePrice: 0,
            currentPrice: 0
        } 
    }
    componentDidMount(){
        $.get('http://localhost:3002/api/volumes/symbols/5bd277855f59f4e021dd7a62', (data)=>{
            console.log(data);
            this.setState({
                symbol: data.symbol,
                name: data.name,
                prices: data.prices,
                volumes: data.volumes,
                lowest: data.lowest,
                heighest: data.heighest,
                averagePrice: data.averagePrice,
                currentPrice: data.currentPrice
            });
        })
    }
    render(){
        return (
            <div class="main">
                <h1>Price Paid on Robinhood</h1>
                <h2 id='lowest'>52 Week Low: ${this.state.lowest}</h2>
                <h2 id='heighest'>52 Week High: ${this.state.heighest}</h2>
                <h2 id='average'>Average Price Paid: ${this.state.averagePrice}</h2>
                <h2 id='current'>Current Price: ${this.state.currentPrice}</h2>
            </div>
        )
    }
}
export default PriceVolumeChart;