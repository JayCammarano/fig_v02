import React, { useState } from "react";
import axios from "axios";
const PleaseLogin = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    loginErrors: "",
  });
  const closeModal = () => {
    props.setShowStatus("");
  };

  const handleSubmit = (event) => {
    axios
      .post(
        `/sessions`,
        {
          user: {
            email: user.email,
            password: user.password,
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
  };
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={`modal ${props.showStatus}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Please Login First</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="content center">
            <div className="column is-two-thirds center">
              <form onSubmit={handleSubmit}>
                <div className="center m-md">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="center m-md">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="center">
                  <button type="submit" className="button is-success">
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="button is-warning"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PleaseLogin;
