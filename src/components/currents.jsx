import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getCurrents,
  deleteCurrents,
  addRecuring,
  checkCurrent
} from "./../services/dataSources/currentsService";
import { getUnusedRecurings } from "./../services/dataSources/recuringService";

import CurrentsTable from "./tables/currentsTable";
import _ from "lodash";
import PieChart from "./graphics/pieChart";

class Currents extends Component {
  state = {
    currents: [],
    recurings: [],
    balanceOnAccount: 0,
    balanceEndMonth: 0,
    recuringValue: "",
    sortColumn: {
      path: "date",
      order: "desc"
    },
    chartData: []
  };

  makeSeriesChart(currents) {
    let expensesByCategories = [];
    const dataSet = currents.filter(c => c.value < 0 && !c.recuring);
    dataSet.map(
      current =>
        (expensesByCategories[current.category.name] = {
          y: expensesByCategories[current.category.name]
            ? expensesByCategories[current.category.name].y +
              Math.abs(current.value)
            : Math.abs(current.value),

          name: current.category.name
        })
    );
    let data = [];
    for (let expense in expensesByCategories) {
      data.push({ y: expensesByCategories[expense].y, name: expense });
    }

    return data;
  }

  calculateBalance(currents) {
    let balance = 0;
    currents.map(current => (balance += current.checked ? current.value : 0));
    return balance;
  }

  calculateBalanceEndMonth(currents, recurings) {
    let balance = 0;
    currents.map(current => (balance += current.value));
    recurings.map(recuring => (balance += recuring.value));
    return balance;
  }

  buildUpdate(currents, recurings) {
    const balanceOnAccount = this.calculateBalance(currents);
    const balanceEndMonth = this.calculateBalanceEndMonth(currents, recurings);
    const chartData = this.makeSeriesChart(currents);

    return {
      currents,
      recurings,
      chartData,
      balanceOnAccount,
      balanceEndMonth
    };
  }

  async reload() {
    const { data: currents } = await getCurrents();
    const { data: recurings } = await getUnusedRecurings();

    this.setState(this.buildUpdate(currents, recurings));
  }

  componentDidMount() {
    this.reload();
  }

  handleDelete = async current => {
    const previousState = this.state;
    const currents = previousState.currents.filter(c => c.id !== current.id);

    const recurings = [...this.state.recurings];
    if (current.recuring) {
      recurings.push(current.recuring);
    }

    this.setState(this.buildUpdate(currents, recurings));

    try {
      await deleteCurrents(current.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The current has already been removed");

      this.setState(previousState);
    }
  };

  handleChecked = async current => {
    const previousState = this.state;

    const currents = [...previousState.currents];
    const index = currents.indexOf(current);
    currents[index] = { ...current };
    currents[index].checked = !currents[index].checked;

    this.setState(this.buildUpdate(currents, previousState.recurings));

    try {
      await checkCurrent(current.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The current does not exists anymore");

      this.setState(previousState);
    }
  };

  handleAddRecuring = async e => {
    e.preventDefault();

    await addRecuring(this.state.recuringValue);

    this.reload();
  };

  handleSelectChange = ({ currentTarget }) => {
    this.setState({ recuringValue: currentTarget.value });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      currents,
      sortColumn,
      recurings,
      chartData,
      recuringValue,
      balanceEndMonth,
      balanceOnAccount
    } = this.state;
    const sorted = _.orderBy(currents, [sortColumn.path], [sortColumn.order]);

    return (
      <React.Fragment>
        <h1>Current Expenses</h1>
        {chartData.length > 0 && (
          <PieChart chartData={chartData} title="Expenses by Categories" />
        )}
        <div className="row">
          <form className="form-inline">
            <Link className="btn btn-primary m-2" to="/currents/new">
              New Current
            </Link>
            Or
            <div className="form-group">
              <select
                className="form-control ml-2"
                onChange={this.handleSelectChange}
                value={recuringValue}
              >
                <option value="">Add recuring ({recurings.length})</option>
                {recurings.map(recuring => (
                  <option key={recuring.id} value={recuring.id}>
                    {recuring.category.name} {recuring.name} ({recuring.value}{" "}
                    €)
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary ml-2 mr-2"
              disabled={recuringValue === ""}
              onClick={this.handleAddRecuring}
            >
              Add
            </button>
            {currents.filter(c => c.checked).length > 0 && (
              <React.Fragment>
                Or
                <Link className="btn btn-primary ml-2" to="/historize">
                  Historize
                </Link>
              </React.Fragment>
            )}
          </form>
        </div>
        <div className="row">
          <div className="card col-12 col-sm-12 col-md-6 col-lg-5">
            <div className="card-body">
              <h5 className="card-tile">Current Balance</h5>
              <p>{balanceOnAccount.toFixed(2)} €</p>
            </div>
          </div>
          <div className="card col-12 col-sm-12 col-md-6 offset-lg-2 col-lg-5">
            <div className="card-body">
              <h5 className="card-tile">Current Planned End Month</h5>
              <p>{balanceEndMonth.toFixed(2)} €</p>
            </div>
          </div>
        </div>
        <div className="row">
          <CurrentsTable
            currents={sorted}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onChecked={this.handleChecked}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Currents;
