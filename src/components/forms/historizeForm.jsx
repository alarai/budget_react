import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { historize } from "./../../services/dataSources/currentsService";

class HistorizeForm extends Form {
  state = {
    data: {
      month: "",
      year: ""
    },
    errors: {}
  };

  schemas = {
    month: Joi.number()
      .integer()
      .required()
      .min(1)
      .max(12)
      .label("Month"),
    year: Joi.number()
      .integer()
      .required()
      .min(2000)
      .max(2100)
      .label("Year")
  };

  componentDidMount() {
    const date = new Date();
    const data = {
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.setState({ data });
  }

  doSubmit = async () => {
    await historize(this.state.data);
    this.props.history.push("/currents");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Historize current operations</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("month", "Month")}
          {this.renderInput("year", "Year")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default HistorizeForm;
