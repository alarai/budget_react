import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getCurrents,
  deleteCurrents,
  addRecuring
} from "./../services/dataSources/currentsService";
import { getUnusedRecurings } from "./../services/dataSources/recuringService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Currents extends Component {
  state = {
    currents: [],
    recurings: [],
    balanceOnAccount: 0,
    balanceEndMonth: 0,
    recuringValue: "",
    chartsOptions: {
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
          data: []
        }
      ]
    }
  };

  makeSeriesChart() {
    let expensesByCategories = [];
    const negatives = this.state.currents.filter(c => c.value < 0);
    negatives.map(
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
    const chartsOptions = { ...this.state.chartsOptions };
    chartsOptions.series[0].data = expensesByCategories;
    this.setState({
      chartsOptions: {
        series: [
          {
            id: "expenses",
            name: "Dépenses",
            animation: false,
            colorByPoint: true,
            data: data
          }
        ]
      }
    });
  }

  calculateBalance() {
    let balance = 0;
    this.state.currents.map(
      current => (balance += current.checked ? current.value : 0)
    );
    return balance;
  }

  calculateBalanceEndMonth() {
    let balance = 0;
    this.state.currents.map(current => (balance += current.value));
    this.state.recurings.map(recuring => (balance += recuring.value));
    return balance;
  }

  async populateCurrents() {
    const { data: currents } = await getCurrents();
    this.setState({ currents });
  }

  async populateRecurings() {
    const { data: recurings } = await getUnusedRecurings();
    this.setState({ recurings });
  }

  async reload() {
    await Promise.all([this.populateRecurings(), this.populateCurrents()]);

    const balanceOnAccount = this.calculateBalance();
    const balanceEndMonth = this.calculateBalanceEndMonth();
    this.setState({ balanceOnAccount, balanceEndMonth, recuringValue: "" });
    this.makeSeriesChart();
  }

  componentDidMount() {
    this.reload();
  }

  async handleDelete(current) {
    const beforeDeleteCurrents = this.state.currents;
    const currents = beforeDeleteCurrents.filter(c => c.id !== current.id);

    const recurings = [...this.state.recurings];
    recurings.push(current.recuring);

    this.setState({ currents, recurings });

    try {
      await deleteCurrents(current.id);
      const balanceOnAccount = this.calculateBalance();
      const balanceEndMonth = this.calculateBalanceEndMonth();
      this.setState({ balanceOnAccount, balanceEndMonth });
      this.makeSeriesChart();
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The current has already been removed");

      this.setState({ currents: beforeDeleteCurrents });
    }
  }

  handleAddRecuring = async e => {
    e.preventDefault();

    await addRecuring(this.state.recuringValue);

    this.reload();
  };

  handleHistorize = e => {
    e.preventDefault();
    console.log("historize");
  };

  handleSelectChange = ({ currentTarget }) => {
    this.setState({ recuringValue: currentTarget.value });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Currents</h1>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartsOptions}
        />
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
                value={this.state.recuringValue}
              >
                <option value="">
                  Add recuring ({this.state.recurings.length})
                </option>
                {this.state.recurings.map(recuring => (
                  <option key={recuring.id} value={recuring.id}>
                    {recuring.category.name} {recuring.name} ({recuring.value}{" "}
                    €)
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary ml-2 mr-2"
              disabled={this.state.recuringValue === ""}
              onClick={this.handleAddRecuring}
            >
              Add
            </button>
            Or
            <button
              className="btn btn-primary ml-2"
              onClick={this.handleHistorize}
            >
              Historize
            </button>
          </form>
        </div>
        <div className="row">
          <div className="card col-5">
            <div className="card-body">
              <h5 className="card-tile">Current Balance</h5>
              <p>{this.state.balanceOnAccount.toFixed(2)} €</p>
            </div>
          </div>
          <div className="card offset-2 col-5">
            <div className="card-body">
              <h5 className="card-tile">Current Planned End Month</h5>
              <p>{this.state.balanceEndMonth.toFixed(2)} €</p>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Value</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.currents.map(current => (
                <tr key={current.id}>
                  <td>
                    {new Intl.DateTimeFormat("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(new Date(current.date))}
                  </td>
                  <td>
                    <Link to={"/currents/" + current.id}>{current.name}</Link>
                  </td>

                  <td>{current.category.name}</td>
                  <td>{current.type.name}</td>
                  <td>{current.value} €</td>
                  <td>{current.checked ? "Oui" : "Non"}</td>
                  <td className="text-right">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(current)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Currents;
