import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getCurrents,
  deleteCurrents
} from "./../services/dataSources/currentsService";

class Currents extends Component {
  state = {
    currents: []
  };

  async componentDidMount() {
    const { data: currents } = await getCurrents();
    this.setState({ currents });
  }

  async handleDelete(current) {
    const beforeDeleteCurrents = this.state.currents;
    const currents = beforeDeleteCurrents.filter(c => c.id !== current.id);
    this.setState({ currents });

    try {
      await deleteCurrents(current.id);
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
