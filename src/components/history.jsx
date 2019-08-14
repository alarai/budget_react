import React, { Component } from "react";
import {
  getHistory,
  getHistoryPeriods
} from "./../services/dataSources/historyService";

import HistoryTable from "./tables/historyTable";
import _ from "lodash";
import PieChart from "./graphics/pieChart";

class History extends Component {
  state = {
    history: [],
    sortColumn: {
      path: "date",
      order: "desc"
    },
    chartData: [],
    periods: [],
    selectedPeriod: "",
    selectedPeriodIndex: 0
  };

  makeSeriesChart() {
    let expensesByCategories = [];
    const negatives = this.state.history.filter(
      c => c.value < 0 && !c.was_recuring
    );
    negatives.map(
      item =>
        (expensesByCategories[item.category_name] = {
          y: expensesByCategories[item.category_name]
            ? expensesByCategories[item.category_name].y + Math.abs(item.value)
            : Math.abs(item.value),

          name: item.category_name
        })
    );
    let data = [];
    for (let expense in expensesByCategories) {
      data.push({ y: expensesByCategories[expense].y, name: expense });
    }
    this.setState({ chartData: data });
  }

  makePeriodsItems = periodsRaw => {
    let periods = [];
    periodsRaw.map(period =>
      periods.push({
        month: period.month,
        year: period.year,
        periodString: period.year + "/" + String(period.month).padStart(2, "0")
      })
    );
    return periods;
  };

  async makeHistory() {
    const { periods, selectedPeriodIndex } = this.state;
    const { data: history } = await getHistory(
      periods[selectedPeriodIndex].year,
      periods[selectedPeriodIndex].month
    );
    this.setState({ history });
    this.makeSeriesChart();
  }

  async componentDidMount() {
    const { data: periodsRaw } = await getHistoryPeriods();
    this.setState({ periods: this.makePeriodsItems(periodsRaw) });
    if (periodsRaw.length > 0) {
      await this.makeHistory();
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getIndexPeriod = periodString => {
    for (let i = 0; i < this.state.periods.length; i++) {
      if (this.state.periods[i].periodString === periodString) {
        return i;
      }
    }
    return null;
  };

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
      selectedPeriod: this.state.periods[newPeriod].periodString,
      selectedPeriodIndex: newPeriod
    });
    this.makeHistory();
  };

  handleNextPeriod = async () => {
    const newPeriod = this.state.selectedPeriodIndex - 1;

    await this.setState({
      selectedPeriod: this.state.periods[newPeriod].periodString,
      selectedPeriodIndex: newPeriod
    });
    this.makeHistory();
  };

  render() {
    const { history, sortColumn, periods } = this.state;
    const sorted = _.orderBy(history, [sortColumn.path], [sortColumn.order]);
    if (periods.length === 0) {
      return (
        <React.Fragment>
          <h1>History</h1>
          <p>No history is yet available!</p>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h1>History</h1>
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
              {this.state.periods.map(({ periodString }) => {
                return (
                  <option key={periodString} value={periodString}>
                    {periodString}
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
        <PieChart chartData={this.state.chartData} />
        <div className="row">
          <HistoryTable
            history={sorted}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default History;
