import CategoriesTable from "./categoriesTable";
import React from "react";
import { Link } from "react-router-dom";

class TypesTable extends CategoriesTable {
  columns = [
    {
      label: "Name",
      path: "name",
      sortable: true,
      content: type => {
        return <Link to={"types/" + type.id}>{type.name}</Link>;
      }
    },
    {
      label: "Actions",
      key: "delete",
      content: type => {
        return (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(type)}
            disabled={type.recurings.length !== 0 || type.currents.length !== 0}
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
}

export default TypesTable;
