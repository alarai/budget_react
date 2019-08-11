import React, { Component } from "react";
import {
  getCategories,
  deleteCategories
} from "../services/dataSources/categoriesService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoriesTable from "./tables/categoriesTable";
import _ from "lodash";

class Categories extends Component {
  state = {
    categories: [],
    sortColumn: {
      path: "name",
      order: "asc"
    }
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async handleDelete(category) {
    const beforeDeleteCategories = this.state.categories;
    const categories = beforeDeleteCategories.filter(c => c.id !== category.id);
    this.setState({ categories });

    try {
      await deleteCategories(category.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The category has already been removed");

      this.setState({ categories: beforeDeleteCategories });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { categories, sortColumn } = this.state;
    const sorted = _.orderBy(categories, [sortColumn.path], [sortColumn.order]);
    return (
      <React.Fragment>
        <h1>Categories</h1>
        <Link className="btn btn-primary m-2" to="/categories/new">
          New category
        </Link>
        <CategoriesTable
          categories={sorted}
          onDelete={this.handleDelete.bind(this)}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
      </React.Fragment>
    );
  }
}

export default Categories;
