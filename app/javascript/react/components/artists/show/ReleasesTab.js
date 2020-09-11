import React from "react";
import ReleaseTile from "../../releases/ReleaseTile";
import { Link } from "react-router-dom";

export const ReleasesTab = (props) => {
  // const releaseTiles = props.releases.map((release) => {
  //   return (
  //     <ReleaseTile
  //       key={release.id}
  //       title={release.title}
  //       embed_url={release.embed_url}
  //       original_release_year={release.year}
  //       release_type={release.release_type}
  //       release_id={release.id}
  //       label_id={release.label_id}
  //       artist_id={props.artistID}
  //       image={release.image}
  //     />
  //   );
  // });

  return (
    <div>
      <div>
        <section className="container">
          <div className="columns features is-multiline">
            <div className="column is-one-third m-t-lg">
              <Link to={`/artists/${props.artistID}/releases/new`}>
                <div className="card has-background-light">
                  <p className="has-text-weight-bold has-text-grey m-sm">
                    <b>Add A New Release</b>
                  </p>
                  <figure className="image is-48by48 m-sm">
                    <img
                      src={props.image}
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
        </section>
      </div>
    </div>
  );
};
export default ReleasesTab;
