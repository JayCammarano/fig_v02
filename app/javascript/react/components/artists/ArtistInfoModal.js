import React, { useState, useEffect } from "react";
import FetchArtistID from "../_assets/FetchArtistID";
const ArtistInfoModal = (props) => {
  const defaultArtist = {
    id: "",
    alias: [],
    name: "",
    description: "",
    imageCaller: "",
    lastfmCaller: {
      bio: ""
    },
    releaseImageCaller: [
      {
        id: "",
        title: "",
        release_type: "",
        embed_url: "",
        original_release_year: "",
        label_id: "",
        tag_id: "",
      },
    ],
  };
  const closeModal = () => {
    props.setShowHide(null);
  };
  const [getArtist, setArtist] = useState(defaultArtist);
  useEffect(() => {
    FetchArtistID(props.artistID, setArtist);
  }, [props.artistID]);
  return (
    <div className={`modal ${props.showHide}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{getArtist.name}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>{getArtist.lastfmCaller.bio}</p>
          <button className="button is-warning" onClick={closeModal}>
            Close
          </button>
        </section>
      </div>
    </div>
  );
};

export default ArtistInfoModal;
