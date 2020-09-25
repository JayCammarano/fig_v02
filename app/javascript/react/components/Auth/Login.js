import React, { Component } from "react";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    const { email, password } = this.state;
    axios
      .post(
        `/sessions`,
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data.status === "created");
        }
      })
      .catch((error) => {
        console.log("login error", error);
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
      <div className="card-content">
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
        <div className="content">
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
              <button type="submit" className="button center">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
