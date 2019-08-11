import React, { Component } from "react";
import Table from "./common/table";

class CategoriesTable extends Component {
  columns = [
    { label: "Name", path: "name", sortable: true },
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
      },
      sortable: false
    }
  ];

  render() {
    const { categories, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={categories}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default CategoriesTable;
