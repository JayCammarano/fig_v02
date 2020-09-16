import React from "react";
import { Link } from "react-router-dom";

const ReleaseTile = ({
  artist_id,
  title,
  original_release_year,
  release_type,
  release_id,

}) => {
  return (
    <div className="column is-one-third m-t-lg">
      <Link to={`/artists/${artist_id}/releases/${release_id}`}>
        <div className="card has-background-light">
          <p className="has-text-weight-bold has-text-grey m-sm">
            <b>{release_type}</b>
          </p>
          <figure className="image is-48by48 m-sm">
            <img src="" className="card-image" alt="Cover Image" />
          </figure>
          <h4 className="card-header-title has-text-dark">
            {title} - {original_release_year}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default ReleaseTile;
