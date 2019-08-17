import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class RecuringTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      sortable: true,
      content: recuring => {
        return <Link to={"recurings/" + recuring.id}>{recuring.name}</Link>;
      }
    },
    {
      label: "Category",
      key: "category",
      path: "categoryName",
      sortable: true
    },
    {
      label: "Type",
      key: "type",
      path: "typeName",
      sortable: true
    },
    { label: "Value", path: "value", sortable: true },
    {
      key: "delete",
      content: recuring => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(recuring)}
            disabled={recuring.currentsCount !== "0"}
          >
            <i className="fa fa-trash" />
          </button>
        );
      },
      bodyClass: "text-right",
      headerClass: "text-right"
    }
  ];

  handleNone() {}

  render() {
    const { recurings, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={recurings}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default RecuringTable;
