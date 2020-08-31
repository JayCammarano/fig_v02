import React, { Component } from "react";
import axios from "axios";

export class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        this.props.handleSuccessfulAuth(response.data.status === "created");
      })
      .catch((error) => {
        console.log("resgistration error", error);
      });
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div className="card-content ">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">Welcome To Fig.</p>
            <p className="subtitle is-6">by Jay Cammarano</p>
          </div>
        </div>
        <div className="content center">
          <form onSubmit={this.handleSubmit}>
            <div className="center m-md">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="center m-md">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="center m-md">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="center m-md">
              <button type="submit" className="button center">
                Register
              </button>
            </div>
          </form>
        </div>{" "}
      </div>
    );
  }
}

export default Registration;
