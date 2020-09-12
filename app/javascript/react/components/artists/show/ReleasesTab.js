import React from "react";
import ReleaseTile from "../../releases/ReleaseTile";
import { Link } from "react-router-dom";
import AddReleaseTile from "../../releases/new/AddReleaseTile";

export const ReleasesTab = (props) => {
  
  let releaseTiles = props.releases.map((release) => {
    return (
      <ReleaseTile
        key={release.id}
        title={release.title}
        embed_url={release.embed_url}
        original_release_year={release.year}
        release_type={release.release_type}
        release_id={release.id}
        label_id={release.label_id}
        artist_id={props.artistID}
        image={release.image}
      />
    );
  });

  return (
    <div>
      <div>
        <section className="container">
          <div className="columns features is-multiline">
            <div className="column is-one-third m-t-lg">
              <AddReleaseTile
                artistID={props.artistID}
                setToggleNewRelease={props.setToggleNewRelease}
                toggleNewRelease={props.toggleNewRelease}
              />
            </div>

            {releaseTiles}
          </div>
        </section>
      </div>
    </div>
  );
};
export default ReleasesTab;
