import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import {
  getCurrent,
  saveCurrent
} from "./../../services/dataSources/currentsService";
import { getCategories } from "../../services/dataSources/categoriesService";
import { getTypes } from "./../../services/dataSources/typesService";

class CurrentsForm extends Form {
  state = {
    data: {
      date: new Date().toISOString().substring(0, 10),
      name: "",
      value: "",
      checked: false,
      categoryId: "",
      typeId: ""
    },
    categories: [],
    types: [],
    errors: {}
  };

  schemas = {
    id: [Joi.string().optional(), Joi.allow(null)],
    date: Joi.date().required(),
    name: Joi.string()
      .required()
      .max(45)
      .label("Name"),
    categoryId: Joi.number()
      .required()
      .label("Category"),
    typeId: Joi.number()
      .required()
      .label("Type"),
    value: Joi.number()
      .required()
      .label("Value"),
    checked: Joi.optional()
  };

  doSubmit = async () => {
    await saveCurrent(this.state.data);
    this.props.history.push("/currents");
  };

  mapToViewModel(current) {
    return {
      name: current.name,
      value: current.value,
      checked: current.checked,
      id: current.id,
      categoryId: current.category.id,
      typeId: current.type.id,
      date: new Date(current.date).toISOString().substring(0, 10)
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

  async populateCurrent() {
    try {
      const currentId = this.props.match.params["id"];

      if (currentId === "new") return;

      const { data: current } = await getCurrent(this.props.match.params["id"]);
      this.setState({ data: this.mapToViewModel(current) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await Promise.all([
      this.populateCurrent(),
      this.populateCategories(),
      this.populateTypes()
    ]);
  }

  render() {
    const { categories, types } = this.state;
    return (
      <React.Fragment>
        <h1>Current Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("date", "Date", false, "date")}
          {this.renderInput("name", "Name", true)}
          {this.renderSelect(
            "categoryId",
            "Category",
            categories,
            "id",
            "name"
          )}
          {this.renderSelect("typeId", "Type", types, "id", "name")}
          {this.renderInput("value", "Value")}
          {this.renderCheckbox("checked", "Checked")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default CurrentsForm;
