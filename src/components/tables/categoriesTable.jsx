import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CategoriesTable extends Component {
  columns = [
    {
      key: "default",
      content: type => {
        return type.useForHistory && <i className="fa fa-bookmark" />;
      },
      bodyClass: "smallColumn",
      headerClass: "smallColumn"
    },
    {
      label: "Name",
      path: "name",
      sortable: true,
      content: category => {
        return <Link to={"categories/" + category.id}>{category.name}</Link>;
      }
    },
    {
      key: "delete",
      content: category => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(category)}
            disabled={category.useCount !== "0"}
          >
            <i className="fa fa-trash" />
          </button>
        );
      },
      sortable: false,
      bodyClass: "text-right",
      headerClass: "text-right"
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

CategoriesTable.propTypes = {
  categories: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default CategoriesTable;
