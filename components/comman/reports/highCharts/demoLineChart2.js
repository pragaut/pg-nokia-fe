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
      type: 'column'
    },

    title: {
      text: 'Company Wise Total Score'
    },

    xAxis: {
      categories: ['Total Score', 'Company 1 Score', 'Company 2 Score', 'Company 3 Score', 'Company 4 Score']
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Number of fruits'
      }
    },

    tooltip: {
      formatter: function() {
        var stackName = this.series.userOptions.stack;
  
        return '<b>Audit Type : </b>' + stackName + '<br/><b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
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
        stacking: 'normal'
      }
    },
    series: props.chartData

  };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default LineChart;
