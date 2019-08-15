import React, { Component } from "react";
import {
  getHistoryYears,
  getHistoryByYear
} from "./../services/dataSources/historyService";
import HistoChart from "./graphics/histoChart";
import PeriodSelector from "./periodSelector";

class Graphics extends Component {
  state = {
    periods: [],
    selectedPeriod: "",
    selectedPeriodIndex: 0,
    chartDataX: [],
    chartDataY: []
  };

  getIndexPeriod = periodString => {
    const { periods } = this.state;
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].year.toString() === periodString) {
        return i;
      }
    }
    return null;
  };

  makeSeriesChart(data) {
    let chartDataX = [];
    let chartDataY = [];

    data.map(function(item) {
      chartDataX.push(item.period);
      chartDataY.push(Number.parseFloat(item.sum));
      return null;
    });

    return { chartDataX, chartDataY };
  }

  async makeHistory(year) {
    const { data: history } = await getHistoryByYear(year);
    const chartData = this.makeSeriesChart(history);
    this.setState({
      history,
      chartDataX: chartData.chartDataX,
      chartDataY: chartData.chartDataY
    });
  }

  doPeriodChange(periodString) {
    const { periods } = this.state;
    const selectedPeriod = periodString;
    const selectedPeriodIndex = this.getIndexPeriod(selectedPeriod);
    this.setState({
      selectedPeriod,
      selectedPeriodIndex
    });
    this.makeHistory(
      periods[selectedPeriodIndex].year,
      periods[selectedPeriodIndex].month
    );
  }

  handlePeriodChange = async ({ currentTarget }) => {
    this.doPeriodChange(currentTarget.value);
  };

  handlePeriodMove = async increment => {
    const selectedPeriodIndex = this.state.selectedPeriodIndex + increment;
    const selectedPeriod = this.state.periods[selectedPeriodIndex];

    await this.setState({
      selectedPeriod: selectedPeriod.year,
      selectedPeriodIndex: selectedPeriodIndex
    });
    this.makeHistory(selectedPeriod.year);
  };

  async componentDidMount() {
    const { data: periods } = await getHistoryYears();
    if (periods.length > 0) {
      this.setState({ periods, selectedPeriod: periods[0].year });
      await this.makeHistory(periods[0].year);
    }
  }

  render() {
    const {
      periods,
      selectedPeriod,
      selectedPeriodIndex,
      chartDataX,
      chartDataY
    } = this.state;
    if (periods.length === 0) {
      return (
        <React.Fragment>
          <h1>Graphics</h1>
          <p>No data is yet available!</p>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h1>Graphics</h1>
        <PeriodSelector
          periods={periods}
          selectedPeriod={selectedPeriod}
          selectedPeriodIndex={selectedPeriodIndex}
          onButtonChange={this.handlePeriodMove}
          onSelectChange={this.handlePeriodChange}
          periodValue="year"
        />
        <HistoChart chartDataX={chartDataX} chartDataY={chartDataY} />
      </React.Fragment>
    );
  }
}

export default Graphics;
