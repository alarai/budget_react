import CategoriesTable from "./categoriesTable";
import React from "react";
import { Link } from "react-router-dom";

class TypesTable extends CategoriesTable {
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
      content: type => {
        return <Link to={"types/" + type.id}>{type.name}</Link>;
      }
    },
    {
      label: "Actions",
      key: "actions",
      content: type => {
        return (
          <React.Fragment>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.props.onDelete(type)}
              disabled={type.useCount !== "0"}
            >
              <i className="fa fa-trash" />
            </button>
          </React.Fragment>
        );
      },
      sortable: false,
      bodyClass: "text-right",
      headerClass: "text-right"
    }
  ];
}

export default TypesTable;
