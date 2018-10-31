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
            currentPrice: 0,
            difference:0
        } 
    }
    componentDidMount(){
        this.handleFetch();
    }

    handleFetch(id = '5bd277855f59f4e021dd7a62'){
        $.get(`http://localhost:3002/api/volumes/symbols/${id}`, (data)=>{
            console.log(data[0]);
            let diff = this.getDifference(data[0].averagePrice, data[0].currentPrice);

            this.setState({
                symbol: data[0].symbol,
                name: data[0].name,
                prices: data[0].prices,
                volumes: data[0].volumes,
                lowest: data[0].lowest,
                heighest: data[0].heighest,
                averagePrice: data[0].averagePrice,
                currentPrice: data[0].currentPrice,
                difference: diff
            });
        })
    }
    getDifference(averagePrice, currentPrice){
        return Math.round(currentPrice/averagePrice*100-100);
    }
    render(){
        return (
            <div>
                <h1>Price Paid on Robinhood</h1>
                <h2>Name: <span id='name'>{this.state.name}</span></h2>
                <h2>52 Week Low: $<span id='lowest'>{this.state.lowest}</span></h2>
                <h2>52 Week High: $<span id='heighest'>{this.state.heighest}</span></h2>
                <h2>Average Price Paid: $<span id='average'>{this.state.averagePrice.toFixed(2)}</span></h2>
                <h2>Current Price: $<span id='current'>{this.state.currentPrice}</span></h2>
                <h2 id='difference'><span>{Math.abs(this.state.difference)}</span>% {this.state.difference>0 ? 'Higher':'Lower'}</h2>
            </div>
        )
    }
}
export default PriceVolumeChart;