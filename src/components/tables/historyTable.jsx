import React, { Component } from "react";
import Table from "./common/table";
import PropTypes from "prop-types";

class HistoryTable extends Component {
  columns = [
    { label: "date", path: "date", sortable: true },
    {
      label: "Name",
      path: "name",
      sortable: true
    },
    {
      label: "Category",
      key: "category",
      path: "category_name",
      sortable: true
    },
    {
      label: "Type",
      key: "type",
      path: "type_name",
      sortable: true
    },
    {
      label: "Value",
      path: "value",
      sortable: true,
      content: history => {
        return history.value.toFixed(2);
      }
    }
  ];

  render() {
    const { history, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={history}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

HistoryTable.propTypes = {
  history: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default HistoryTable;
