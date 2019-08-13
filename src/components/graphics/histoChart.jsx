import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

(function(H) {
  // Pass error messages
  H.Axis.prototype.allowNegativeLog = true;

  // Override conversions
  H.Axis.prototype.log2lin = function(num) {
    var isNegative = num < 0,
      adjustedNum = Math.abs(num),
      result;
    if (adjustedNum < 10) {
      adjustedNum += (10 - adjustedNum) / 10;
    }
    result = Math.log(adjustedNum) / Math.LN10;
    return isNegative ? -result : result;
  };
  H.Axis.prototype.lin2log = function(num) {
    var isNegative = num < 0,
      absNum = Math.abs(num),
      result = Math.pow(10, absNum);
    if (result < 10) {
      result = (10 * (result - 1)) / (10 - 1);
    }
    return isNegative ? -result : result;
  };
})(Highcharts);

const HistoChart = ({ chartDataX, chartDataY }) => {
  const chartsOptions = {
    chart: {
      type: "column"
    },
    title: {
      text: "Balance mensuelle"
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true
    },
    xAxis: {
      categories: chartDataX
    },
    yAxis: {
      type: "logarithmic"
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Balance",
        data: chartDataY
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={chartsOptions} />;
};

export default HistoChart;
