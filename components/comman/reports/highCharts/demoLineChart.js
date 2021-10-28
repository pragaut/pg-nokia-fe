import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  HC_exporting(Highcharts);
}

function LineChart(props) {
  const chartOptions = {
    chart: {
      type: "column",
      height: 500
    },
    legend: {
      margin: 5,
      itemDistance: 10,
      enabled: false
    },
    xAxis: {
      stackLabels: {
        enabled: true,
        align: "center"
      },
      visible: true,
      stackLabels: "Total Score",
      title: { enabled: true, text: "Companys" },
      categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
    },
    yAxis: {
      stackLabels: {
        enabled: true,
        align: "center"
      },
      visible: true,
      title: { enabled: true, text: "Score %" }
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    //series: props.chartData
    series: [{
      type: 'column',
      name: 'Jane',
      data: [3, 2, 1, 3, 4]
    }, {
      type: 'column',
      name: 'John',
      data: [2, 3, 5, 7, 6]
    }, {
      type: 'column',
      name: 'Joe',
      data: [4, 3, 3, 9, 0]
    }, {
      type: 'spline',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33],
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      }
    }, {
      type: 'pie',
      name: 'Total consumption',
      data: [{
        name: 'Jane',
        y: 13,
        color: Highcharts.getOptions().colors[0] // Jane's color
      }, {
        name: 'John',
        y: 23,
        color: Highcharts.getOptions().colors[1] // John's color
      }, {
        name: 'Joe',
        y: 19,
        color: Highcharts.getOptions().colors[2] // Joe's color
      }],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default LineChart;
