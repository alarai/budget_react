import React, { Component } from "react";
import {
  getCategories,
  deleteCategories
} from "../services/dataSources/categoriesService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Categories extends Component {
  state = {
    categories: []
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

  render() {
    return (
      <React.Fragment>
        <h1>Categories</h1>
        <Link className="btn btn-primary m-2" to="/categories/new">
          New category
        </Link>
        <table className="table table-condensed">
          <tbody>
            {this.state.categories.map(category => (
              <tr key={category.id}>
                <td>
                  <Link to={"/categories/" + category.id}>{category.name}</Link>
                </td>
                <td className="text-right">
                  {category.recurings.length === 0 &&
                    category.currents.length === 0 && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(category)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Categories;
