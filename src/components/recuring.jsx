import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getRecurings,
  deleteRecurings
} from "./../services/dataSources/recuringService";
import RecuringTable from "./tables/recuringTable";
import _ from "lodash";

class Recuring extends Component {
  state = {
    recurings: [],
    balance: 0,
    sortColumn: {
      path: "name",
      order: "asc"
    }
  };

  async componentDidMount() {
    const { data: recurings } = await getRecurings();
    this.setState({ recurings, balance: this.calculateBalance(recurings) });
  }

  handleDelete = async recuring => {
    const beforeDeleteRecurings = this.state.recurings;
    const recurings = beforeDeleteRecurings.filter(c => c.id !== recuring.id);
    const balance = this.calculateBalance(recurings);
    this.setState({ recurings, balance });

    try {
      await deleteRecurings(recuring.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The recuring has already been removed");

      this.setState({
        recurings: beforeDeleteRecurings,
        balance: this.calculateBalance(beforeDeleteRecurings)
      });
    }
  };

  calculateBalance(recurings) {
    let balance = 0;
    recurings.map(recuring => (balance += recuring.value));
    return balance;
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { recurings, sortColumn } = this.state;
    const sorted = _.orderBy(recurings, [sortColumn.path], [sortColumn.order]);

    return (
      <React.Fragment>
        <h1>Recurings</h1>
        <Link className="btn btn-primary m-2" to="/recurings/new">
          New recuring
        </Link>
        <div className="card col-3">
          <div className="card-body">
            <h5 className="card-tile">Recurings Balance</h5>
            <p>{this.state.balance} €</p>
          </div>
        </div>
        <RecuringTable
          recurings={sorted}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default Recuring;
