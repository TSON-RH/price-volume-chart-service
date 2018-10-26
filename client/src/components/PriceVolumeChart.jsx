import React from 'react';

class PriceVolumeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {    
        } 
    }

    componentDidMount(){
        $.get('http://localhost:3002/api/volumes/symbols/5bd277855f59f4e021dd7a62', (err, data)=>{
            if(err) console.log(err);
            console.log(JSON.parse(data));
        })

    }
    render(){
        return (
            <div>
                <h1>HELLO FROM REACT</h1>
            </div>
        )
    }
}
export default PriceVolumeChart;