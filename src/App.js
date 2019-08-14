import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Login from "./components/login";
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

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  userLoggedIn = true;

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <ToastContainer />
        {this.userLoggedIn && (
          <React.Fragment>
            <NavBar />
            <main role="main">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/currents/:id" component={CurrentsForm} />
                <Route path="/currents" component={Currents} />
                <Route path="/history" component={History} />
                <Route path="/graphics" component={Graphics} />
                <Route path="/recurings/:id" component={RecuringForm} />
                <Route path="/recurings" component={Recuring} />
                <Route path="/categories/:id" component={CategoriesForm} />
                <Route path="/categories" component={Categories} />
                <Route path="/types/:id" component={TypesForm} />
                <Route path="/types" component={Types} />

                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/currents" />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </React.Fragment>
        )}
        {!this.userLoggedIn && (
          <React.Fragment>
            <main role="main">
              <Switch>
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
              </Switch>
            </main>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
