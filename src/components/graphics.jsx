import React, { Component } from "react";
import {
  getHistoryYears,
  getHistoryByYear
} from "./../services/dataSources/historyService";
import HistoChart from "./graphics/histoChart";

class Graphics extends Component {
  state = {
    periods: [],
    selectedPeriod: "",
    selectedPeriodIndex: 0,
    chartDataX: [],
    chartDataY: []
  };

  getIndexPeriod = periodString => {
    for (let i = 0; i < this.state.periods.length; i++) {
      if (this.state.periods[i].year.toString() === periodString) {
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

    this.setState({ chartDataX, chartDataY });
  }

  async makeHistory() {
    const { periods, selectedPeriodIndex } = this.state;
    const { data: history } = await getHistoryByYear(
      periods[selectedPeriodIndex].year
    );
    this.makeSeriesChart(history);
  }

  handlePeriodChange = async ({ currentTarget }) => {
    await this.setState({
      selectedPeriod: currentTarget.value,
      selectedPeriodIndex: this.getIndexPeriod(currentTarget.value)
    });
    this.makeHistory();
  };

  handlePrevPeriod = async () => {
    const newPeriod = this.state.selectedPeriodIndex + 1;

    await this.setState({
      selectedPeriod: this.state.periods[newPeriod].year,
      selectedPeriodIndex: newPeriod
    });
    this.makeHistory();
  };

  handleNextPeriod = async () => {
    const newPeriod = this.state.selectedPeriodIndex - 1;

    await this.setState({
      selectedPeriod: this.state.periods[newPeriod].year,
      selectedPeriodIndex: newPeriod
    });
    this.makeHistory();
  };

  async componentDidMount() {
    const { data: periods } = await getHistoryYears();
    this.setState({ periods });
    if (periods.length > 0) {
      await this.makeHistory();
    }
  }

  render() {
    if (this.state.periods.length === 0) {
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
        <div className="row form-inline">
          <div className="col-2">
            <button
              id="btnNextPeriod"
              className="btn btn-primary"
              onClick={this.handlePrevPeriod}
              disabled={
                this.state.selectedPeriodIndex === this.state.periods.length - 1
              }
            >
              &lt;&lt;
            </button>
          </div>
          <div className="col-8 text-center">
            <select
              className="form-control"
              value={this.state.selectedPeriod}
              onChange={this.handlePeriodChange}
            >
              {this.state.periods.map(({ year }) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-2 text-right">
            <button
              id="btnPrevPeriod"
              className="btn btn-primary"
              onClick={this.handleNextPeriod}
              disabled={this.state.selectedPeriodIndex === 0}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
        <HistoChart
          chartDataX={this.state.chartDataX}
          chartDataY={this.state.chartDataY}
        />
      </React.Fragment>
    );
  }
}

export default Graphics;
