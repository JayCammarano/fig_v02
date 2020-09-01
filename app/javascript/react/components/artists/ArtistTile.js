import React from "react";
import { Link } from "react-router-dom";

const ArtistTile = (props) => {
  return (
    <Link to={`/artists/`}>
      <div className="card has-background-light">
        <figure className="image is-48by48">
          <img src="" className="card-image" alt="Artist Image" />
        </figure>
        <h4 className="card-header-title has-text-dark">Hardcoded Name</h4>
      </div>
    </Link>
  );
};

export default ArtistTile;
