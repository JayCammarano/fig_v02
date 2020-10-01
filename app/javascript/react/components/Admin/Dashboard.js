import React from "react";
import NavBar from "../Global/navbar/NavBar";

const Dashboard = (props) => {
  return (
    <div>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <h1>Dashboard</h1>
      <h1>Status: {props.loggedInStatus}</h1>
    </div>
  );
};

export default Dashboard;
