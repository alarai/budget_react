import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getHistory } from "./../services/dataSources/historyService";

import HistoryTable from "./tables/historyTable";
import _ from "lodash";
import PieChart from "./graphics/pieChart";

class History extends Component {
  state = {
    history: [],
    recurings: [],
    recuringValue: "",
    sortColumn: {
      path: "date",
      order: "desc"
    },
    chartData: []
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

  async componentDidMount() {
    const { data: history } = await getHistory(2016, 1);
    this.setState({ history });
    this.makeSeriesChart();
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { history, sortColumn } = this.state;
    const sorted = _.orderBy(history, [sortColumn.path], [sortColumn.order]);

    return (
      <React.Fragment>
        <h1>Currents</h1>
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
