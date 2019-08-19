import React, { Component } from "react";
import _ from "lodash";
import {
  getHistoryPeriods,
  getHistory
} from "./../services/dataSources/historyService";
import PieChart from "./graphics/pieChart";
import PeriodSelector from "./periodSelector";
import HistoryTable from "./tables/historyTable";

class Graphics extends Component {
  state = {
    history: [],
    sortColumn: {
      path: "date",
      order: "desc"
    },
    periods: [],
    selectedPeriod: "",
    selectedPeriodIndex: 0,
    chartData: []
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

  async makeHistory(year, month, skipCheck = false) {
    if (skipCheck || this.state.selectedPeriod !== year) {
      const { data: history } = await getHistory(year + "/" + month);
      const chartData = this.makeSeriesChart(history);
      this.setState({
        history,
        chartData
      });
    }
  }

  updateContent(period) {
    this.props.history.push("/history/" + period);
  }

  doPeriodChange(periodString) {
    const selectedPeriod = periodString;
    const selectedPeriodIndex = this.getIndexPeriod(selectedPeriod);
    this.setState({
      selectedPeriod,
      selectedPeriodIndex
    });

    this.updateContent(selectedPeriod);
  }

  handlePeriodChange = async ({ currentTarget }) => {
    this.doPeriodChange(currentTarget.value);
  };

  handlePeriodMove = async increment => {
    const selectedPeriodIndex = this.state.selectedPeriodIndex + increment;
    const selectedPeriod = this.state.periods[selectedPeriodIndex];

    await this.setState({
      selectedPeriod: selectedPeriod.periodString,
      selectedPeriodIndex: selectedPeriodIndex
    });
    this.updateContent(selectedPeriod.periodString);
  };

  makePeriodsItems = periodsRaw => {
    let periods = [];
    periodsRaw.map(period =>
      periods.push({
        month: period.month,
        year: period.year,
        periodString: period.year + "-" + String(period.month).padStart(2, "0")
      })
    );
    return periods;
  };

  async componentDidMount() {
    const { data: periodsRaw } = await getHistoryPeriods();
    if (periodsRaw.length > 0) {
      const periods = this.makePeriodsItems(periodsRaw);
      const selectedPeriod = this.props.match.params.period
        ? this.props.match.params.period
        : periods[0].periodString;
      this.setState({ periods, selectedPeriod });

      if (this.props.match.params.period) {
        await this.makeHistory(periods[0].year, periods[0].month, true);
      } else {
        this.props.history.replace("/history/" + selectedPeriod);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.period !== this.props.match.params.period) {
      if (this.props.match.params.period) {
        const selectedPeriodIndex = this.getIndexPeriod(
          this.props.match.params.period
        );
        this.setState({
          selectedPeriod: this.props.match.params.period,
          selectedPeriodIndex
        });
        this.makeHistory(
          this.state.periods[selectedPeriodIndex].year,
          this.state.periods[selectedPeriodIndex].month
        );
      } else {
        this.props.history.replace(
          "/history/" + this.state.periods[0].periodString
        );
      }
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
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
          <p>No data is yet available!</p>
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

export default Graphics;
