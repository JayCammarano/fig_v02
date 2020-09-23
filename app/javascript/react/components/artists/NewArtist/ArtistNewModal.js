import React, { useState } from "react";
import MultiFieldContainer from "./MultiFieldContainer";
import postNewArtist from "../../_assets/PostNewArtist";
import ImageUploader from "./ImageUploader"

const ArtistNewTile = (props) => {
  const [newartistRecord, setnewArtistRecord] = useState({
    name: "",
    description: "",
    altName: [""],
    image: [""]
  });

  const handleInputChange = (event) => {
    setnewArtistRecord({
      ...newartistRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  const submitArtist = () => {
    event.preventDefault();
    postNewArtist(newartistRecord, props.setShouldRedirect, props.setResponse);
  };
  const addNewArtistToggle = () => {
    props.setToggleNewArtist("");
  };
  const handleAltNameChange = (event) => {
    let altName = newartistRecord.altName;
    altName[event.currentTarget.id] = event.currentTarget.value;

    setnewArtistRecord({
      ...newartistRecord,
      altName,
    });
  };

  return (
    <div className={`modal ${props.toggleNewArtist}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Artist</p>
          <button
            className="delete"
            onClick={addNewArtistToggle}
            aria-label="close"
          ></button>
        </header>
        <form onSubmit={submitArtist}>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="name">
                <div className="control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    placeholder="Artist Name (required)"
                    onChange={handleInputChange}
                    value={newartistRecord.name}
                    required
                  />
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="description">
                <div className="control">
                  <input
                    type="text"
                    id="description"
                    size="50"
                    name="description"
                    placeholder="One Line Identifier"
                    className="input"
                    onChange={handleInputChange}
                    value={newartistRecord.description}
                  />
                </div>
              </label>
            </div>
            <MultiFieldContainer
              handleAltNameChange={handleAltNameChange}
              newartistRecord={newartistRecord}
            />
            <ImageUploader
              setnewArtistRecord={setnewArtistRecord}
              newartistRecord={newartistRecord}
            />

            <button className="button is-success" type="submit">
              Submit
            </button>
            <button className="button is-warning" onClick={addNewArtistToggle}>
              Cancel
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ArtistNewTile;
