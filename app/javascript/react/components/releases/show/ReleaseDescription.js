import React, { Fragment, useState, useEffect } from "react";
import ArtistTile from "../../artists/ArtistTile";
import ArtistInfoModal from "../../artists/ArtistInfoModal";
import DiscogsTab from "./infotabs/DiscogsTab";
import PitchforkReview from "./infotabs/PitchforkReview";
const ReleaseDescription = (props) => {
  const [p4kCollapse, setp4kCollapse] = useState("hide")
  const [whichTab, setWhichTab] = useState("pitchfork");

  let reviewData;
  const reviewSwitcher = (tab) => {
    setWhichTab(tab);
  };
  
    if (whichTab === "pitchfork") {
      reviewData = (
        <PitchforkReview p4kCollapse={p4kCollapse} setp4kCollapse={setp4kCollapse} reviews={props.description.search_for_review} />
      );
    } else{
      reviewData = <DiscogsTab description={props.description.discogs_info} />;
    }


  return (
    <section className="column m-lg">
      <div className="column">
        <div className="card has-background-light">
          <h4 className="card-header-title has-text-dark">{props.name}</h4>
          {reviewData}
          <p className="card-footer">
            <a
              className="card-footer-item has-text-dark"
              onClick={() => reviewSwitcher("pitchfork")}
            >
              Pitchfork
            </a>
            <a
              className="card-footer-item has-text-dark"
              onClick={() => reviewSwitcher("metacritic")}
            >
              Metacritic
            </a>
            <a
              className="card-footer-item has-text-dark"
              onClick={() => reviewSwitcher("discogs")}
            >
              Discogs
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReleaseDescription;
