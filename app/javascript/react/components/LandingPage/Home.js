import React, { Component } from "react";
import Registration from "../Auth/Registration";
import Login from "../Auth/Login";
import axios from "axios";
import NavBar from "../Global/navbar/NavBar";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.history.push("/dashboard");
    this.props.handleLogin(data);
  }
  handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <NavBar loggedInStatus={this.props.loggedInStatus}/>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;
