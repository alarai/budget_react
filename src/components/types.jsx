import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getTypes, deleteTypes } from "../services/dataSources/typesService";
import TypesTable from "./tables/typesTable";
import _ from "lodash";

class Types extends Component {
  state = {
    types: [],
    sortColumn: {
      path: "name",
      order: "asc"
    }
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { types, sortColumn } = this.state;
    const sorted = _.orderBy(types, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        <h1>Types</h1>
        <Link className="btn btn-primary m-2" to="/types/new">
          New type
        </Link>
        <TypesTable
          categories={sorted}
          onDelete={this.handleDelete.bind(this)}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default Types;
