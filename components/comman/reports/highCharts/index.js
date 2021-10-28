import React, { Component } from "react";
import { data, data2 } from "./data";
//import LineChart from "./lineChart";
//import LineChart from "./demoLineChart";
import LineChart from "./demoLineChart2";

export class HighChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: []
        };
    }

    componentDidMount() {
        this.setState({ data, data2 });
    }

    render() {
        return (
            <div>
                <LineChart chartData={this.state.data2} />
                {/* <LineChart  /> */}
            </div>
        );
    }
}

export default HighChart;
