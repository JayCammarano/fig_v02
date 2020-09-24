import React, { useState } from "react";
import ArtistInfoModal from "../../../artists/ArtistInfoModal";
import ArtistTile from "../../../artists/ArtistTile";
const ArtistsTab = (props) => {
  const [artistModalID, setartistModalID] = useState(null);
  const [showHide, setShowHide] = useState(null);
  const artistModalTrigger = (artistID) => {
    setartistModalID(artistID);
    setShowHide("is-active");
  };

  const artistListingArray = props.artists.map((artist) => {
    let image = null
    if(artist.image !== null){
      image = artist.image
    }
    return (
      <div
        className="column is-two-fifths"
        onClick={() => artistModalTrigger(artist.id)}
        key={artist.id}
      >
        <ArtistTile
          id={artist.id}
          key={artist.id}
          name={artist.name}
          description={artist.description}
          image={image}
        />
      </div>
    );
  });

  return (
    <section className="column m-lg">
      <p className="has-text-light has-text-weight-bold is-size-4 p-l-lg">
        Artists:
      </p>
      <div className="columns is-multiline p-lg">{artistListingArray}</div>
      <ArtistInfoModal
        artistID={artistModalID}
        showHide={showHide}
        setShowHide={setShowHide}
      />
    </section>
  );
};

export default ArtistsTab;
