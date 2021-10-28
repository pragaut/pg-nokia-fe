import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
    HC_exporting(Highcharts);
}


function LineChart(props) {
    var colors = [];


    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Plant Wise Total Score'
        },

        xAxis: {
            categories: props.axisData
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Score'
            }
        },
        tooltip: {
            formatter: function () {
                var stackName = this.series.userOptions.stack;
                return '<b>Audit Type : </b>' + stackName + '<br/><b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>';
                // 'Total: ' +  this.point.stackTotal;
            }
        },

        // tooltip: {
        //   formatter: function () {
        //     return '<b>' + this.x + '</b><br/>' +
        //       this.series.name + ': ' + this.y + '<br/>' +
        //       'Total: ' + this.point.stackTotal;
        //   }
        // },

        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                   // y: -20,
                    color: 'black',
                    inside: true,
                    formatter: function () {
                        return (this.y != 0) ? this.y : "";
                    }
                    // verticalAlign: 'center'
                }
            }
        },
        series: props.chartData

    };
    return <HighchartsReact
    container ={{ style: { height: "100%" } }}
    highcharts={Highcharts} options={chartOptions} />;
}

export default LineChart;
