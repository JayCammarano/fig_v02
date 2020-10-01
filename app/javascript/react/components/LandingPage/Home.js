import React, { Component } from "react";
import Registration from "../Auth/Registration";
import Login from "../Auth/Login";
import axios from "axios";
import NavBar from "../Global/navbar/NavBar";
import IntroCard from "./IntroCard";
import axiosUrl from "../_assets/axiosUrl"

export class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.cardLoad = <IntroCard />;
    if (props.loggedInStatus === "NOT_LOGGED_IN"){
      this.cardFooter = (
        <footer className="card-footer">
          <a
            href="#"
            className="card-footer-item"
            onClick={() => this.toggleLoginRegister("Intro")}
          >
            Welcome
          </a>
          <a
            href="#"
            className="card-footer-item"
            onClick={() => this.toggleLoginRegister("Login")}
          >
            Login
          </a>
          <a
            href="#"
            className="card-footer-item"
            onClick={() => this.toggleLoginRegister("Register")}
          >
            Register
          </a>
        </footer>
      );
    } else {
      this.cardFooter = (
        <footer className="card-footer">
          <a
            href="#"
            className="card-footer-item"
            onClick={() => this.toggleLoginRegister("Intro")}
          >
            Welcome
          </a>
        </footer>
      );
    }
    this.size = "is-three-fifths";
  }
  handleSuccessfulAuth(data) {
    this.props.history.push("/dashboard");
    this.props.handleLogin(data);
  }
  handleLogoutClick() {
    axios
      .delete(`/logout`, { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  toggleLoginRegister(formType) {
    if (this.props.loggedInStatus == "LOGGED_IN") {
      this.cardLoad = <IntroCard />;
    } else {
      if (formType === "Register") {
        this.size = "is-two-fifths";
        this.cardLoad = (
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        );
      } else if (formType === "Login") {
        this.size = "is-two-fifths";

        this.cardLoad = (
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        );
      } else if (formType === "Intro") {
        this.size = "is-three-fifths";

        this.cardLoad = <IntroCard />;
      }
    }
  }
  render() {
    return (
      <div>
        <NavBar loggedInStatus={this.props.loggedInStatus} />
        <section className="columns center">
          <div className={`column ${this.size} m-lg`}>
            <div className="card">
              {this.cardLoad}
              <br />
              {this.cardFooter}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
