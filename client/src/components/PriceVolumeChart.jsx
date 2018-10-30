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
        this.handleFetch();
    }

    handleFetch(id = '5bd277855f59f4e021dd7a62'){
        $.get(`http://localhost:3002/api/volumes/symbols/${id}`, (data)=>{
            console.log(data[0]);
            this.setState({
                symbol: data[0].symbol,
                name: data[0].name,
                prices: data[0].prices,
                volumes: data[0].volumes,
                lowest: data[0].lowest,
                heighest: data[0].heighest,
                averagePrice: data[0].averagePrice,
                currentPrice: data[0].currentPrice
            });
        })
    }


    render(){
        return (
            <div>
                <h1>Price Paid on Robinhood</h1>
                <h2 id='name'>Name: {this.state.name}</h2>
                <h2 id='lowest'>52 Week Low: ${this.state.lowest}</h2>
                <h2 id='heighest'>52 Week High: ${this.state.heighest}</h2>
                <h2 id='average'>Average Price Paid: ${this.state.averagePrice}</h2>
                <h2 id='current'>Current Price: ${this.state.currentPrice}</h2>
            </div>
        )
    }
}
export default PriceVolumeChart;