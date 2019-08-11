import React, { Component } from "react";
import Table from "./common/table";

class CurrentsTable extends Component {
  columns = [
    { label: "date", path: "date", sortable: true },
    { label: "Name", path: "name", sortable: true },
    {
      label: "Category",
      key: "category",
      path: "category.name",
      content: current => {
        return current.category.name;
      },
      sortable: true
    },
    {
      label: "Type",
      key: "type",
      path: "type.name",
      content: current => {
        return current.type.name;
      },
      sortable: true
    },
    { label: "Value", path: "value", sortable: true },
    {
      label: "Checked",
      key: "checked",
      content: current => {
        return current.checked ? "Y" : "N";
      },
      sortable: true
    },
    {
      key: "delete",
      content: current => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(current)}
          >
            <i className="fa fa-trash" />
          </button>
        );
      }
    }
  ];

  render() {
    const { currents, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={currents}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default CurrentsTable;
