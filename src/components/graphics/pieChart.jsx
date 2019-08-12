import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ chartData }) => {
  const chartsOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Répartition"
    },
    tooltip: {
      pointFormat:
        "{series.name}: <b>{point.y:.2f} ({point.percentage:.1f}%)</b>"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black"
          }
        }
      }
    },
    series: [
      {
        id: "expenses",
        name: "Dépenses",
        animation: false,
        colorByPoint: true,
        data: chartData
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={chartsOptions} />;
};

export default PieChart;
