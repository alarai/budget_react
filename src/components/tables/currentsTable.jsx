import React, { Component } from "react";
import Table from "./common/table";

class CurrentsTable extends Component {
  columns = [
    { label: "date", path: "date" },
    { label: "Name", path: "name" },
    {
      label: "Category",
      key: "category",
      content: current => {
        return current.category.name;
      }
    },
    {
      label: "Type",
      key: "type",
      content: current => {
        return current.type.name;
      }
    },
    { label: "Value", path: "value" },
    {
      label: "Checked",
      key: "checked",
      content: current => {
        return current.checked ? "Y" : "N";
      }
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
    const { currents } = this.props;
    return <Table columns={this.columns} data={currents} />;
  }
}

export default CurrentsTable;
