import React from 'react'
import axios from "axios"
const SignOut = (props) => {
  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }
  return (
    <div className="navbar-item" onClick={handleLogoutClick}>logout</div>
    )
}

export default SignOut
