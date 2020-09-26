import React from "react";
import { Link } from "react-router-dom";
import AddReleaseTile from "../../releases/new/AddReleaseTile"
const BioTab = (props) => {
  return (
    <div className="columns">
      <div className="column is-three-fifths center">
        <div className="card has-background-light m-lg">
          <h4 className="card-header-title has-text-dark m-l-md">
            Bio from Last.fm
          </h4>
          <p className="p-l-lg p-r-lg p-b-lg has-text-dark overflowMD">
            {props.description.lastfmCaller.bio}
          </p>
        </div>
      </div>
      <div className="column is-one-third m-t-lg">
      <AddReleaseTile
                artistID={props.artistID}
                setToggleNewRelease={props.setToggleNewRelease}
                toggleNewRelease={props.toggleNewRelease}
                name={props.name}
                image={props.image}
              />
      </div>
    </div>
  );
};

export default BioTab;
