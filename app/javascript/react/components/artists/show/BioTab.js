import React from "react";
import { Link } from "react-router-dom";

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
        <Link to={`/artists/${props.artistID}/releases/new`}>
          <div className="card has-background-light">
            <p className="has-text-weight-bold has-text-grey m-sm">
              <b>Add A New Release</b>
            </p>
            <figure className="image is-48by48 m-sm">
              <img
                src={props.description.imageCaller}
                className="card-image"
                alt="Cover Image"
              />
            </figure>
            <h4 className="card-header-title has-text-dark">
              Add A New Release by {props.name}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BioTab;
