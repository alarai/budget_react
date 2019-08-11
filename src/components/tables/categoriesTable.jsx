import React, { Component } from "react";
import Table from "./common/table";

class CategoriesTable extends Component {
  columns = [
    { label: "Name", path: "name" },
    {
      key: "delete",
      content: category => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(category)}
            disabled={
              category.recurings.length !== 0 || category.currents.length !== 0
            }
          >
            <i className="fa fa-trash" />
          </button>
        );
      }
    }
  ];

  render() {
    const { categories } = this.props;
    return <Table columns={this.columns} data={categories} />;
  }
}

export default CategoriesTable;
