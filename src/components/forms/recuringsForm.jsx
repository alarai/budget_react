import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  getRecuring,
  saveRecuring
} from "./../../services/dataSources/recuringService";
import { getCategories } from "../../services/dataSources/categoriesService";
import { getTypes } from "./../../services/dataSources/typesService";

class RecuringForm extends Form {
  state = {
    data: {
      name: "",
      value: ""
    },
    categories: [],
    types: [],
    errors: {}
  };

  schemas = {
    id: [Joi.string().optional(), Joi.allow(null)],
    name: Joi.string()
      .required()
      .max(45)
      .label("Name"),
    categoryId: Joi.string().required(),
    typeId: Joi.string().required(),
    value: Joi.number()
      .required()
      .label("Value")
  };

  doSubmit = async () => {
    await saveRecuring(this.state.data);
    this.props.history.push("/recurings");
  };

  mapToViewModel(recuring) {
    return {
      name: recuring.name,
      value: recuring.value,
      id: recuring.id
    };
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populateTypes() {
    const { data: types } = await getTypes();
    this.setState({ types });
  }

  async componentDidMount() {
    await this.populateCategories();
    await this.populateTypes();
    try {
      const recuringId = this.props.match.params["id"];

      if (recuringId === "new") return;

      const { data: recuring } = await getRecuring(
        this.props.match.params["id"]
      );
      this.setState({ data: this.mapToViewModel(recuring) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Recuring Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect(
            "categoryId",
            "Category",
            this.state.categories,
            "id",
            "name"
          )}
          {this.renderSelect("typeId", "Type", this.state.types, "id", "name")}
          {this.renderInput("value", "Value")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default RecuringForm;
