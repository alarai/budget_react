import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

const PieChart = ({ chartData, serieName, title }) => {
  const chartsOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: title
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
        name: serieName,
        animation: false,
        colorByPoint: true,
        data: chartData
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={chartsOptions} />;
};

const dataShape = {
  y: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

PieChart.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape(dataShape)).isRequired,
  serieName: PropTypes.string,
  title: PropTypes.string
};

export default PieChart;
