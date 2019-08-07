import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Login from "./components/login";
import Logout from "./components/logout";
import Current from "./components/current";
import History from "./components/history";
import Graphics from "./components/graphics";
import Recuring from "./components/recuring";
import Categories from "./components/categories";
import Types from "./components/types";
import NotFound from "./components/notFound";
import CategoriesForm from "./components/forms/categoriesForm";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <ToastContainer />
        <main role="main">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/current" component={Current} />
            <Route path="/history" component={History} />
            <Route path="/graphics" component={Graphics} />
            <Route path="/recuring" component={Recuring} />
            <Route path="/categories/:id" component={CategoriesForm} />
            <Route path="/categories" component={Categories} />
            <Route path="/types" component={Types} />

            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/current" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
