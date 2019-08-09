import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getTypes, deleteTypes } from "../services/dataSources/typesService";

class Types extends Component {
  state = {
    types: []
  };

  async componentDidMount() {
    const { data: types } = await getTypes();
    this.setState({ types });
  }

  async handleDelete(type) {
    const beforeDeleteTypes = this.state.types;
    const types = beforeDeleteTypes.filter(c => c.id !== type.id);
    this.setState({ types });

    try {
      await deleteTypes(type.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The type has already been removed");

      this.setState({ types: beforeDeleteTypes });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Types</h1>
        <Link className="btn btn-primary m-2" to="/types/new">
          New type
        </Link>
        <table className="table table-condensed">
          <tbody>
            {this.state.types.map(type => (
              <tr key={type.id}>
                <td>
                  <Link to={"/types/" + type.id}>{type.name}</Link>
                </td>
                <td className="text-right">
                  {type.recurings.length === 0 && type.currents.length === 0 && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(type)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Types;
