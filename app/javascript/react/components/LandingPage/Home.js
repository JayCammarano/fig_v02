import React, { Component } from "react";
import Registration from "../Auth/Registration";

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Registration />
      </div>
    );
  }
}

export default Home;
