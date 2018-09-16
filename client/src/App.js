import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearJobs } from "./actions/jobActions";
import PropTypes from "prop-types";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateJob from "./components/create-job/CreateJob";
import EditJob from "./components/create-job/EditJob";
import Notes from "./components/notes/Notes";
import NoMatch from "./components/common/NoMatch";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear jobs
    store.dispatch(clearJobs());
    // Redirect to landing
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route
              exact
              path={[
                "/login",
                "/signup",
                "/dashboard",
                "/add-job",
                "/edit-job",
                "/notes"
              ]}
              component={Navbar}
            />
            <div>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/add-job" component={CreateJob} />
                <PrivateRoute exact path="/edit-job/:id" component={EditJob} />
                <PrivateRoute exact path="/notes/:id" component={Notes} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            {/* <Route
              exact
              path={
                ("login",
                "signup",
                "dashboard",
                "add-job",
                "edit-job:id",
                "notes/:id")
              }
              component={Footer}
            /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

Route.propTypes = {
  computedMatch: PropTypes.object,
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  location: PropTypes.object
};

export default App;
