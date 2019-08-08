import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  getCategory,
  saveCategory
} from "./../../services/dataSources/categoriesService";

class CategoriesForm extends Form {
  state = {
    data: {
      name: ""
    },
    errors: {}
  };

  schemas = {
    id: [Joi.string().optional(), Joi.allow(null)],
    name: Joi.string()
      .required()
      .max(45)
      .label("Name")
  };

  doSubmit = async () => {
    await saveCategory(this.state.data);
    this.props.history.push("/categories");
  };

  mapToViewModel(category) {
    return {
      name: category.name,
      id: category.id
    };
  }

  async componentDidMount() {
    try {
      const categoryId = this.props.match.params["id"];

      if (categoryId === "new") return;

      const { data: category } = await getCategory(
        this.props.match.params["id"]
      );
      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Categories Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default CategoriesForm;
