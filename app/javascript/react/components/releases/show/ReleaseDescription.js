import React, { Fragment, useState, useEffect } from "react";
import ArtistTile from "../../artists/ArtistTile";
import ArtistInfoModal from "../../artists/ArtistInfoModal";
import DiscogsTab from "./DiscogsTab";
import PitchforkReview from "./PitchforkReview";
const ReleaseDescription = (props) => {
  const [showHide, setShowHide] = useState(null);
  const [artistModalID, setartistModalID] = useState(null);
  const [p4kCollapse, setp4kCollapse] = useState("hide")
  const [whichTab, setWhichTab] = useState("pitchfork");
  const artistModalTrigger = (artistID) => {
    setartistModalID(artistID);
    setShowHide("is-active");
  };

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


  const artistListingArray = props.artists.map((artist) => {
    return (
      <div
        className="column is-one-fifth"
        onClick={() => artistModalTrigger(artist.id)}
        key={artist.id}
      >
        <ArtistTile
          id={artist.id}
          key={artist.id}
          name={artist.name}
          description={artist.description}
          imageCaller={artist.image}
        />
      </div>
    );
  });

  return (
    <section className="column">
      <div className="column m-t-lg m-r-lg">
        <div className="card has-background-light">
          <h4 className="card-header-title has-text-dark">{props.name}</h4>
          {reviewData}
          <p className="card-footer">
            <a
              className="card-footer-item has-text-dark"
              onClick={() => reviewSwitcher("pitchfork")}
            >
              Pitchfork Full Review
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
      <p className="has-text-light has-text-weight-bold is-size-4 p-l-lg">
        Artists:
      </p>
      <div className="columns is-multilines p-lg">{artistListingArray}</div>
      <ArtistInfoModal
        artistID={artistModalID}
        showHide={showHide}
        setShowHide={setShowHide}
      />
    </section>
  );
};

export default ReleaseDescription;
