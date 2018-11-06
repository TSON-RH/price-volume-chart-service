import React from 'react';
import $ from 'jquery';
import { runInThisContext } from 'vm';
import styles from './styles.css';
import { relativeTimeThreshold } from 'moment';

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
            barColor: 'black',
            selectedBarIndex: undefined,
            selectedBarHeight: 0,
            selectedBarPrice:0
        } 
        this.findBarGraphIndex = this.findBarGraphIndex.bind(this);
        this.indexInRange = this.indexInRange.bind(this);
        this.onBar = this.onBar.bind(this);
        this.offBar = this.offBar.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
        this.barWidth = 11.46;
    }

    componentDidMount(){
        this.handleFetch();
        
    }

    handleFetch(id = '2'){
        fetch(`http://localhost:3002/api/volumes/symbols/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data=>{
            let diff = this.getDifference(data[0].averagePrice, data[0].currentPrice);
            let currentPriceIndex = this.findBarGraphIndex(data[0].currentPrice, data[0].prices, diff>0);
            let averagePriceIndex = this.findBarGraphIndex(data[0].averagePrice, data[0].prices, diff>0);
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
                xPositionCurrentPrice:xPositionCurrentPrice,
            });
        })
        .catch(error=> console.log("Error: ", error))  
    }
    getDifference(averagePrice, currentPrice){
        return Math.round(currentPrice/averagePrice*100-100);
    }

    findBarGraphIndex(price, prices, isHigher){
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
        if(price < prices[left] && isHigher){
            return left-1;
        }else if(price < prices[left]){
            return left;
        }
        return left;
        
    }

    indexInRange(i){
        let index1 = this.state.currentPriceIndex;
        let index2 = this.state.averagePriceIndex;
        if(index1<index2){
            return (index1<=i) && (i<=index2);
        }
        return (index2<=i) && (i<=index1);
    }

    onBar(id, e){
        e.preventDefault();
        this.setState({
            selectedBarIndex: id,
            selectedBarHeight: this.state.volumes[id],
            selectedBarPrice: this.state.prices[id]
        });
        
    }

    offBar(id,e){
        this.setState({
            selectedBarIndex: undefined,
            selectedBarHeight: 0,
            selectedBarPrice: 0
        });
    }

    render(){
        return (
            <div>
                <h2 className={styles.head} >Price Paid on Robinhood</h2>
                <svg className={styles.chart} viewBox="0 0 676 324" width="676" height="324">
                    {/* Chart Box */}
                    <rect className={styles.chartArea} x="0" y="0" width="676" height="324"/>
                    {/* Bars */}
                    <g transform="translate(0,194) scale(1,-1)">
                    {
                        this.state.volumes.map((h, i)=>{
                            return(
                                <rect key={i}onMouseEnter={(e)=>this.onBar(i,e)} onMouseLeave={this.offBar} rx="1" x={this.barWidth*2*i} y="0" width={this.barWidth} height={h} stroke={this.state.selectedBarIndex===i?"white":"black"} fill={this.indexInRange(i) ? this.state.barColor : "#0e0d0d"}>
                                    <animate attributeType="CSS" attributeName="height" from="0" to={h} dur="1s"/>
                                </rect>
                            )
                        })
                    }
                    </g>
                    {/* Info box */}
                    <g>
                    {
                         
                        <g display={this.state.selectedBarIndex !== undefined ? "block":"none"}>,
                            <rect className={styles.infoBox} opacity='0.5' x={this.barWidth*2*this.state.selectedBarIndex-15 || 0} y={150-this.state.selectedBarHeight || 0} width="50" height="30"/>,
                            <text className={styles.infoBoxText} x={this.barWidth*2*this.state.selectedBarIndex-5 || 0} y={150-this.state.selectedBarHeight+10 || 0}>Week {this.state.selectedBarIndex}</text>,
                            <text className={styles.infoBoxText} x={this.barWidth*2*this.state.selectedBarIndex-7 || 0} y="204">${this.state.selectedBarPrice.toFixed(2) || 0}</text>,
                            <text className={styles.volumeText}x={this.barWidth*2*this.state.selectedBarIndex-10 || 0} y={150-this.state.selectedBarHeight+25 || 0}>Vol: {this.state.selectedBarHeight}</text>,
                        </g>
                            
                        
                    }           
                    </g>
                    {/* Gray/Green line and Circle */}
                    <g transform="translate(0,224) scale(1,-1)">
                        <line className={styles.grayLine} x1="0" x2="676" y1="10" y2="10"/>
                        <line x1={this.state.xPositionCurrentPrice} x2={this.state.xPositionCurrentPrice} y1="10" y2="150" stroke={this.state.barColor}/>
                        <circle r="7" cx={this.state.xPositionCurrentPrice} cy="10" fill={this.state.barColor}/>
                        
                    </g>
                    {/* Text On Top Tick */}
                    <g fill={this.state.barColor} transform="translate(0,24)">
                            <text className={styles.differenceText} x={this.state.currentPriceIndex * this.barWidth * 2 - 35} y="20">{Math.abs(this.state.difference)}% {this.state.difference>0 ? 'Higher':'Lower'}</text>
                            <text className={styles.rightNowText} x={this.state.currentPriceIndex * this.barWidth * 2 - 28} y="40">Right Now</text>
                    </g>
                    {/* Text under gray Line */}
                    <g className={styles.textBottom} transform="translate(0,24)">
                        {/* Text Week Low & High */}
                        <text x="0" y="230">52 Week Low</text>
                        <text x="0" y="250">${this.state.lowest}</text>
                        <text x="600" y="230">52 Week High</text>
                        <text x="635" y="250">${this.state.highest}</text>
                        {/* Text Average  */}
                        <g className={styles.averageText}>
                        <text x={this.state.averagePriceIndex*this.barWidth*2-30} y="230" >Average Price</text>
                        <text x={this.state.averagePriceIndex*this.barWidth*2-2} y="250" >Paid</text>
                        <text x={this.state.averagePriceIndex*this.barWidth*2-14} y="270" >${this.state.averagePrice.toFixed(2)}</text>
                    </g>
                    </g>
                    
                </svg>
            </div>
        )
    }
}
export default PriceVolumeChart;
