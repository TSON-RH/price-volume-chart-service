import React from 'react';
import ReactDOM from 'react-dom';


class PriceVolumeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          
        }
        
    }
    

    render(){
        return (
            <div>
                <h1>HELLO FROM REACT</h1>
            </div>
        )
    }
}

ReactDOM.render(<PriceVolumeChart />, document.getElementById('priceVolumeChart'));