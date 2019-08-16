import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getType, saveType } from "./../../services/dataSources/typesService";

class TypesForm extends Form {
  state = {
    data: {
      name: "",
      use_for_history: false
    },
    errors: {}
  };

  schemas = {
    id: [Joi.string().optional(), Joi.allow(null)],
    name: Joi.string()
      .required()
      .max(45)
      .label("Name"),
    use_for_history: Joi.optional()
  };

  doSubmit = async () => {
    await saveType(this.state.data);
    this.props.history.push("/types");
  };

  mapToViewModel(type) {
    return {
      name: type.name,
      use_for_history: type.use_for_history,
      id: type.id
    };
  }

  async componentDidMount() {
    try {
      const typeId = this.props.match.params["id"];

      if (typeId === "new") return;

      const { data: type } = await getType(this.props.match.params["id"]);
      this.setState({ data: this.mapToViewModel(type) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Type Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderCheckbox("use_for_history", "Use for History")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default TypesForm;
