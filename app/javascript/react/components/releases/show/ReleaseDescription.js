import React, { Fragment, useState, useEffect } from "react";
import ArtistTile from "../../artists/ArtistTile";
import ArtistInfoModal from "../../artists/ArtistInfoModal";
const ReleaseDescription = (props) => {
  const [showHide, setShowHide] = useState(null);
  const [artistModalID, setartistModalID] = useState(null);

  const artistModalTrigger = (artistID) => {
    setartistModalID(artistID);
    setShowHide("is-active");
  };
  

  useEffect(() => {
    document.getElementById("review").innerHTML = props.description[0]
  }, [props.description])

  const reviewSwitcher = () => {
    debugger
    if(document.getElementById("review").innerHTML === props.description[1]){
      debugger
      document.getElementById("review").innerHTML = props.description[0]}
      else{
        document.getElementById("review").innerHTML = props.description[1]
        debugger
      }
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
          <p className="has-text-dark has-text-weight-bold is-size-4 p-l-lg p-b-md">
            Review from Pitchfork:
          </p>
          <p id="review" className="has-text-dark p-b-lg p-l-lg p-r-lg overflow">
      
          </p>
          
          <p className="card-footer p-l-lg p-b-md">
            <a className="card-footer-item has-text-dark" onClick={reviewSwitcher}>Pitchfork</a>
            <a className="card-footer-item has-text-dark" onClick={reviewSwitcher}>Metacritic</a>
            <a className="card-footer-item has-text-dark" onClick={reviewSwitcher}>Discogs</a>

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
