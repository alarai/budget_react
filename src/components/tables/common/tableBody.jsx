import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.length > 0 &&
          data.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <td
                  key={this.createKey(item, column)}
                  className={column.bodyClass}
                >
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length} className="text-center">
              No Data
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};

export default TableBody;
