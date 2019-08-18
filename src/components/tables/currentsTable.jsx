import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CurrentsTable extends Component {
  columns = [
    { label: "date", path: "date", sortable: true },
    {
      label: "Name",
      path: "name",
      sortable: true,
      content: current => {
        return <Link to={"currents/" + current.id}>{current.name}</Link>;
      }
    },
    {
      label: "Category",
      key: "category",
      path: "category.name",
      content: current => {
        return current.category.name;
      },
      sortable: true,
      bodyClass: "d-none d-sm-table-cell",
      headerClass: "d-none d-sm-table-cell"
    },
    {
      label: "Type",
      key: "type",
      path: "type.name",
      content: current => {
        return current.type.name;
      },
      sortable: true,
      bodyClass: "d-none d-sm-table-cell",
      headerClass: "d-none d-sm-table-cell"
    },
    { label: "Value", path: "value", sortable: true },
    {
      key: "operations",
      content: current => {
        const buttonCheckClass =
          "d-none d-sm-inline btn btn-sm mr-2 " +
          (current.checked ? "btn-success" : "btn-danger");
        const buttonCheckIcon =
          "fa fa-fw " + (current.checked ? "fa-check" : "fa-times");
        return (
          <React.Fragment>
            <button
              className={buttonCheckClass}
              onClick={() => this.props.onChecked(current)}
            >
              <i className={buttonCheckIcon} />
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.props.onDelete(current)}
            >
              <i className="fa fa-trash fa-fw" />
            </button>
          </React.Fragment>
        );
      },
      bodyClass: "text-right",
      headerClass: "text-right"
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

CurrentsTable.propTypes = {
  currents: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default CurrentsTable;
