import React, { Component } from "react";
import {
  getHistory,
  getHistoryPeriods
} from "./../services/dataSources/historyService";

import HistoryTable from "./tables/historyTable";
import _ from "lodash";
import PieChart from "./graphics/pieChart";
import PeriodSelector from "./periodSelector";

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

  makeSeriesChart(history) {
    let expensesByCategories = [];
    const negatives = history.filter(c => c.value < 0 && !c.was_recuring);
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
    return data;
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

  async makeHistory(year, month) {
    const { data: history } = await getHistory(year, month);
    this.setState({ history, chartData: this.makeSeriesChart(history) });
  }

  async componentDidMount() {
    const { data: periodsRaw } = await getHistoryPeriods();
    const periodItems = this.makePeriodsItems(periodsRaw);
    if (periodsRaw.length > 0) {
      this.setState({
        periods: periodItems,
        selectedPeriod: periodItems[0].periodString
      });
      this.makeHistory(periodItems[0].year, periodItems[0].month);
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getIndexPeriod = periodString => {
    const { periods } = this.state;
    for (let i = 0; i < periods.length; i++) {
      if (periods[i].periodString === periodString) {
        return i;
      }
    }
    return null;
  };

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

  handlePeriodChange = ({ currentTarget }) => {
    this.doPeriodChange(currentTarget.value);
  };

  handlePeriodMove = async increment => {
    const selectedPeriodIndex = this.state.selectedPeriodIndex + increment;
    const selectedPeriod = this.state.periods[selectedPeriodIndex];

    await this.setState({
      selectedPeriod: selectedPeriod.periodString,
      selectedPeriodIndex: selectedPeriodIndex
    });
    this.makeHistory(selectedPeriod.year, selectedPeriod.month);
  };

  handlePrevPeriod = async () => {
    this.handlePeriodMove(1);
  };

  handleNextPeriod = async () => {
    this.handlePeriodMove(-1);
  };

  render() {
    const {
      history,
      sortColumn,
      periods,
      selectedPeriod,
      selectedPeriodIndex,
      chartData
    } = this.state;
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
        <PeriodSelector
          periods={periods}
          selectedPeriod={selectedPeriod}
          selectedPeriodIndex={selectedPeriodIndex}
          onButtonChange={this.handlePeriodMove}
          onSelectChange={this.handlePeriodChange}
          periodValue="periodString"
        />
        <PieChart chartData={chartData} title="Expenses by Categories" />
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
