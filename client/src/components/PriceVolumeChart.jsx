import React from 'react';
import $ from 'jquery';
import { runInThisContext } from 'vm';

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
            difference:0,
            currentPriceIndex:0,
            averagePriceIndex:0,
        } 
        this.findBarGraphIndex = this.findBarGraphIndex.bind(this);
        this.indexInRange = this.indexInRange.bind(this);
    }
    componentDidMount(){
        this.handleFetch();
    }

    handleFetch(id = '5bd277855f59f4e021dd7a62'){
        $.get(`http://localhost:3002/api/volumes/symbols/${id}`, (data)=>{
            console.log(data[0]);
            let diff = this.getDifference(data[0].averagePrice, data[0].currentPrice);
            console.log(diff);
            let currentPriceIndex = this.findBarGraphIndex(data[0].currentPrice, data[0].prices);
            let averagePriceIndex = this.findBarGraphIndex(data[0].averagePrice, data[0].prices);
            console.log(currentPriceIndex);
            console.log(averagePriceIndex);
            this.setState({
                symbol: data[0].symbol,
                name: data[0].name,
                prices: data[0].prices,
                volumes: data[0].volumes,
                lowest: data[0].lowest,
                heighest: data[0].heighest,
                averagePrice: data[0].averagePrice,
                currentPrice: data[0].currentPrice,
                difference: diff,
                currentPriceIndex: currentPriceIndex,
                averagePriceIndex: averagePriceIndex 
            });
        })
    }
    getDifference(averagePrice, currentPrice){
        return Math.round(currentPrice/averagePrice*100-100);
    }

    findBarGraphIndex(price, prices){
        let left = 0;
        let right = prices.length - 1;
        let mid = 0;
        while(left<=right){
            mid = Math.round((left+right)/2);
            if(prices[mid] === price) return mid;
            else if(prices[mid] < price){
                left = mid+1;
            }else{
                right = mid-1;
            }
        }
        return mid;
    }

    indexInRange(i){
        let index1 = this.state.currentPriceIndex;
        let index2 = this.state.averagePriceIndex;
        if(index1<index2){
            return (index1<=i) && (i<=index2);
        }
        return (index2<=i) && (i<=index1);
    }

    

    render(){
        return (
            <div>
                <h1>Price Paid on Robinhood</h1>
                {/* <h2>Name: <span id='name'>{this.state.name}</span></h2>
                <h2>52 Week Low: $<span id='lowest'>{this.state.lowest}</span></h2>
                <h2>52 Week High: $<span id='heighest'>{this.state.heighest}</span></h2>
                <h2>Average Price Paid: $<span id='average'>{this.state.averagePrice.toFixed(2)}</span></h2>
                <h2>Current Price: $<span id='current'>{this.state.currentPrice}</span></h2>
                <h2 id='difference'><span>{Math.abs(this.state.difference)}</span>% {this.state.difference>0 ? 'Higher':'Lower'}</h2> */}

                <svg viewBox="0 0 400 200" width="400" height="200">
                    <rect x="0" y="0" width="400" height="200" id="bargraph" fill="#1b1b1d">

                    </rect>
                    <g transform="translate(0,200) scale(1,-1)">
                    
                    {
                        this.state.volumes.map((h, i)=>{
                            return(
                            <rect rx="1" x={15*i} y="0" width="10" height={h} fill={this.indexInRange(i)?"#20ce99": "#0e0d0d"}>
                            
                            </rect>)
                        })
                    /*color Schemes*/
                    /*
                        avgText: #ffffff
                        text:#8c8c8e
                        not selected Bars: #0e0d0d 
                    */

                    }
                    
    
                    </g>
                    
                </svg>
            </div>
        )
    }
}
export default PriceVolumeChart;