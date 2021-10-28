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
      stackLabels:"Total Score",
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
    series: props.chartData
  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default LineChart;
