import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  getRecurings,
  deleteRecurings
} from "./../services/dataSources/recuringService";

class Recuring extends Component {
  state = {
    recurings: []
  };

  async componentDidMount() {
    const { data: recurings } = await getRecurings();
    this.setState({ recurings });
  }

  async handleDelete(recuring) {
    const beforeDeleteRecurings = this.state.recurings;
    const recurings = beforeDeleteRecurings.filter(c => c.id !== recuring.id);
    this.setState({ recurings });

    try {
      await deleteRecurings(recuring.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The recuring has already been removed");

      this.setState({ recurings: beforeDeleteRecurings });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recurings</h1>
        <Link className="btn btn-primary m-2" to="/recurings/new">
          New recuring
        </Link>
        <table className="table table-condensed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Value</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.recurings.map(recuring => (
              <tr key={recuring.id}>
                <td>
                  <Link to={"/recurings/" + recuring.id}>{recuring.name}</Link>
                </td>
                <td>{recuring.category.name}</td>
                <td>{recuring.type.name}</td>
                <td>{recuring.value} €</td>
                <td className="text-right">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(recuring)}
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

export default Recuring;
