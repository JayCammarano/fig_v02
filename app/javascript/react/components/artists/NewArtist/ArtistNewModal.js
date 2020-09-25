import React, { useState } from "react";
import MultiFieldContainer from "./MultiFieldContainer";
import postNewArtist from "../../_assets/PostNewArtist";
import ImageUploader from "./ImageUploader";

const ArtistNewModal = ({
  redirectSetter,
  showModal,
  showModalSetter,
  response,
}) => {
  const [newartistRecord, setnewArtistRecord] = useState({
    name: "",
    description: "",
    altName: [""],
    image: [""],
  });

  const handleInputChange = (event) => {
    setnewArtistRecord({
      ...newartistRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };
  const submitArtist = () => {
    event.preventDefault();
    postNewArtist(newartistRecord, redirectSetter, response);
  };
  const addNewArtistToggle = () => {
    showModalSetter("");
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
    <div className={`modal ${showModal}`}>
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

            <button id="submit" className="button is-success" type="submit">
              Submit
            </button>
            <button
              id="cancel"
              className="button is-warning"
              onClick={addNewArtistToggle}
            >
              Cancel
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ArtistNewModal;
