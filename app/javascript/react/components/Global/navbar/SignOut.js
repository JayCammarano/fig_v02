import React from 'react'
import axios from "axios"
import axiosUrl from "../../_assets/axiosUrl"

const SignOut = (props) => {
  const handleLogoutClick = () => {
    axios
      .delete(`${axiosUrl}/logout`, { withCredentials: true })
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
