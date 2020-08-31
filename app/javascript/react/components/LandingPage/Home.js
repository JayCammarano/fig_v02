import React, { Component } from "react";
import Registration from "../Auth/Registration";
import Login from "../Auth/Login";
import axios from "axios";
import NavBar from "../Global/navbar/NavBar";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }
  handleSuccessfulAuth(data) {
    this.props.history.push("/artists");
    this.props.handleLogin(data);
  }


  render() {
    return (
      <div> 
        <NavBar loggedInStatus={this.props.loggedInStatus}/>
        <div className="columns is-one-third center">
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      </div>
    );
  }
}

export default Home;
