import { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
  }

  render() {
    return null;
  }
}

export default Logout;
