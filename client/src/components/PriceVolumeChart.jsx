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
            highest: 0,
            averagePrice: 0,
            currentPrice: 0,
            difference:0,
            currentPriceIndex:0,
            averagePriceIndex:0,
            barColor: 'red'
        } 
        this.findBarGraphIndex = this.findBarGraphIndex.bind(this);
        this.indexInRange = this.indexInRange.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.barWidth = 11.46;
        this.VolumeChartStyle = {
            head : {
                borderColor: 'black',
                borderStyle: 'solid',
                borderWidth: '1px',
                fontSize: '26px',
                letterSpacing: '-0.14px',
                height: '50px',
                marginBlockEnd: '0',
                marginBlockStart: '0',
                marginInlineEnd: '0',
                marginInlineStart: '0',
                width: '674px',
                backgroundColor: '#1b1b1d',
                color: '#ffffff'
            },
            chart : {
                    fontFamily: 'BlinkMacSystemFont',
                    fontStyle:'normal',
                    fontWeight:'500'
                    
            },
            textBottom: {
                fontSize  : '13px',
                fill       : '#cbcbcd'
            },
            textAverage: {
                fontSize  : '13px',
                fill : "#ffffff"
            }
        
        }
    }

    componentDidMount(){
        this.handleFetch();
    }

    handleFetch(id = '5bdb43778b266c1ae5deffe7'){
        $.get(`http://localhost:3002/api/volumes/symbols/${id}`, (data)=>{
            let diff = this.getDifference(data[0].averagePrice, data[0].currentPrice);
            let currentPriceIndex = this.findBarGraphIndex(data[0].currentPrice, data[0].prices);
            let averagePriceIndex = this.findBarGraphIndex(data[0].averagePrice, data[0].prices);
            let barColor = diff > 0 ? "#20ce99" : "#f45531";  
            let xPositionCurrentPrice = (data[0].currentPrice-data[0].lowest)/(data[0].highest-data[0].lowest)*676+this.barWidth; 
            this.setState({
                symbol: data[0].symbol,
                name: data[0].name,
                prices: data[0].prices,
                volumes: data[0].volumes,
                lowest: data[0].lowest,
                highest: data[0].highest,
                averagePrice: data[0].averagePrice,
                currentPrice: data[0].currentPrice,
                difference: diff,
                currentPriceIndex: currentPriceIndex,
                averagePriceIndex: averagePriceIndex,
                barColor: barColor,
                xPositionCurrentPrice:xPositionCurrentPrice
            });
            
        })
    }

    handleHover(e){
        console.log(e.target.id);
    }

    getDifference(averagePrice, currentPrice){
        return Math.round(currentPrice/averagePrice*100-100);
    }

    findBarGraphIndex(price, prices){
        let left = 0;
        let right = prices.length - 1;
        let mid = 0;
        while(left<=right){
            mid = Math.floor((left+right)/2);
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
            <div style={this.VolumeChartStyle.chart}>
                <h2 style={this.VolumeChartStyle.head} >Price Paid on Robinhood</h2>
                    <svg style={this.VolumeChartStyle.chart} viewBox="0 0 676 324" width="676" height="324">
                        <line x="0" y="0" width="676" fill="#f4f4f5"></line>
                        <rect x="0" y="0" width="676" height="324" id="bargraph" fill="#1b1b1d"></rect>
                        <g transform="translate(0,194) scale(1,-1)">
                            {
                                this.state.volumes.map((h, i)=>{
                                    return(
                                    <rect onMouseEnter={this.handleHover} rx="1" x={this.barWidth*2*i} y="0" width={this.barWidth} height={h} fill={this.indexInRange(i) ? this.state.barColor : "#0e0d0d"}>
                                    </rect>
                                    )
                                })
                            }
                        </g>
                
                        <g transform="translate(0,224) scale(1,-1)">
                            <line x1="0" x2="676" y1="10" y2="10" stroke="#8c8c8e"></line>
                            <line x1={this.state.xPositionCurrentPrice} x2={this.state.xPositionCurrentPrice} y1="10" y2="150" stroke={this.state.barColor}></line>
                            <circle r="7" cx={this.state.xPositionCurrentPrice} cy="10" fill={this.state.barColor}></circle>
                            
                        </g>
                        <g fill={this.state.barColor} transform="translate(0,24)" >
                                <text x={this.state.currentPriceIndex * this.barWidth * 2 - 35} y="20" >{Math.abs(this.state.difference)}% {this.state.difference>0 ? 'Higher':'Lower'}</text>
                                <text fontSize="13px" x={this.state.currentPriceIndex * this.barWidth * 2 - 28} y="40">Right Now</text>
                        </g>
                        <g style={this.VolumeChartStyle.textBottom} transform="translate(0,24)">
                                <text x="0" y="230" >52 Week Low</text>
                                <text x="0" y="250" >${this.state.lowest}</text>
                                <text x="593" y="230" >52 Week High</text>
                                <text x="630" y="250" >${this.state.highest}</text>
                        </g>
                        <g style={this.VolumeChartStyle.textAverage} transform="translate(0,24)">
                        <text x={this.state.averagePriceIndex*this.barWidth*2-30} y="230" >Average Price</text>
                        <text x={this.state.averagePriceIndex*this.barWidth*2} y="250" >Paid</text>
                        <text x={this.state.averagePriceIndex*this.barWidth*2-10} y="270" >${this.state.averagePrice.toFixed(2)}</text>
                        </g>
                    </svg>
            </div>
        )
    }
}
export default PriceVolumeChart;
