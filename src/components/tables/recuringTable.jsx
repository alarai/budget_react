import React, { Component } from "react";
import Table from "./common/table";

class RecuringTable extends Component {
  columns = [
    { label: "Name", path: "name" },
    {
      label: "Category",
      key: "category",
      content: recuring => {
        return recuring.category.name;
      }
    },
    {
      label: "Type",
      key: "type",
      content: recuring => {
        return recuring.type.name;
      }
    },
    { label: "Value", path: "value" },
    {
      key: "delete",
      content: recuring => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(recuring)}
            disabled={recuring.currents.length !== 0}
          >
            <i className="fa fa-trash" />
          </button>
        );
      }
    }
  ];

  handleNone() {}

  render() {
    const { recurings } = this.props;
    return <Table columns={this.columns} data={recurings} />;
  }
}

export default RecuringTable;
