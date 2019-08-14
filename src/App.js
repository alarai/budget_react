import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Logout from "./components/logout";
import Currents from "./components/currents";
import History from "./components/history";
import Graphics from "./components/graphics";
import Recuring from "./components/recuring";
import Categories from "./components/categories";
import Types from "./components/types";
import NotFound from "./components/notFound";
import CategoriesForm from "./components/forms/categoriesForm";
import TypesForm from "./components/forms/typesForm";
import RecuringForm from "./components/forms/recuringsForm";
import CurrentsForm from "./components/forms/currentsForm";
import LoginForm from "./components/forms/loginForm";
import ProtectedRoute from "./components/router/protectedRoute";
import auth from "./services/authService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <ToastContainer />

        <NavBar user={user} />
        <main role="main">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/currents/:id" component={CurrentsForm} />
            <ProtectedRoute path="/currents" component={Currents} />
            <ProtectedRoute path="/history" component={History} />
            <ProtectedRoute path="/graphics" component={Graphics} />
            <ProtectedRoute path="/recurings/:id" component={RecuringForm} />
            <ProtectedRoute path="/recurings" component={Recuring} />
            <ProtectedRoute path="/categories/:id" component={CategoriesForm} />
            <ProtectedRoute path="/categories" component={Categories} />
            <ProtectedRoute path="/types/:id" component={TypesForm} />
            <ProtectedRoute path="/types" component={Types} />

            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/currents" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
