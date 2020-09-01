import React, { useState } from "react";
import MultiFieldContainer from "./MultiFieldContainer";

const ArtistNewTile = (props) => {
  const [artistRecord, setArtistRecord] = useState({
    name: "",
    description: "",
    altName: [""],
    image: "",
  });
  const handleInputChange = (event) => {
    setArtistRecord({
      ...artistRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const addNewArtistToggle = () => {
    props.setToggleNewArtist("");
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
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label htmlFor="name"></label>
              <div className="control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  placeholder="Artist Name (required)"
                  onChange={handleInputChange}
                  value={artistRecord.name}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description"></label>
              <div className="control">
                <input
                  type="text"
                  id="description"
                  size="50"
                  name="description"
                  placeholder="One Line Identifier"
                  className="input"
                  onChange={handleInputChange}
                  value={artistRecord.description}
                />
              </div>
            </div>
            <MultiFieldContainer
              handleInputChange={handleInputChange}
              artistRecord={artistRecord}
            />
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button">Submit</button>
          <button className="button is-warning" onClick={addNewArtistToggle}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ArtistNewTile;
