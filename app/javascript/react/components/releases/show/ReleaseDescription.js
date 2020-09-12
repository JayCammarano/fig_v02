import React, { Fragment, useState } from "react";
import ArtistTile from "../../artists/ArtistTile";
import ArtistInfoModal from "../../artists/ArtistInfoModal";
const ReleaseDescription = (props) => {
  const [showHide, setShowHide] = useState(null);
  const [artistModalID, setartistModalID] = useState(null)

  const artistModalTrigger = (artistID) => {
     setartistModalID(artistID)
    setShowHide("is-active");
  };

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
          <p className="has-text-dark has-text-weight-bold is-size-4 p-lg">
            Description:
          </p>
          <p className="has-text-dark p-lg">{props.description}</p>
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
