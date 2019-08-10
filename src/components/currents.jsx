import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getCurrents,
  deleteCurrents
} from "./../services/dataSources/currentsService";
import { getUnusedRecurings } from "./../services/dataSources/recuringService";

class Currents extends Component {
  state = {
    currents: [],
    recurings: [],
    balanceOnAccount: 0,
    balanceEndMonth: 0
  };

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

  async componentDidMount() {
    await Promise.all([this.populateRecurings(), this.populateCurrents()]);

    const balanceOnAccount = this.calculateBalance();
    const balanceEndMonth = this.calculateBalanceEndMonth();
    this.setState({ balanceOnAccount, balanceEndMonth });
  }

  async handleDelete(current) {
    const beforeDeleteCurrents = this.state.currents;
    const currents = beforeDeleteCurrents.filter(c => c.id !== current.id);
    this.setState({ currents });

    try {
      await deleteCurrents(current.id);
      const balanceOnAccount = this.calculateBalance();
      const balanceEndMonth = this.calculateBalanceEndMonth();
      this.setState({ balanceOnAccount, balanceEndMonth });
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The current has already been removed");

      this.setState({ currents: beforeDeleteCurrents });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Currents</h1>
        <Link className="btn btn-primary m-2" to="/currents/new">
          New Current
        </Link>
        Or
        <select>
          <option>Add recuring ({this.state.recurings.length})</option>
          {this.state.recurings.map(recuring => (
            <option key={recuring.id} value={recuring.id}>
              {recuring.name} {recuring.value} €
            </option>
          ))}
        </select>
        <div className="row">
          <div className="card col-5">
            <div className="card-body">
              <h5 className="card-tile">Current Balance</h5>
              <p>{this.state.balanceOnAccount} €</p>
            </div>
          </div>
          <div className="card offset-2 col-5">
            <div className="card-body">
              <h5 className="card-tile">Current Planned End Month</h5>
              <p>{this.state.balanceEndMonth} €</p>
            </div>
          </div>
        </div>
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
      </React.Fragment>
    );
  }
}

export default Currents;
