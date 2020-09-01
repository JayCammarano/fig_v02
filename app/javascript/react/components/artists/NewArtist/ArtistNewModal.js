import React, { useState } from "react";

const ArtistNewTile = (props) => {
  const [artistRecord, setArtistRecord] = useState({
    name: "",
    description: "",
    alias: [""],
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
        <section class="modal-card-body">
          <form className="center">
            <div className="field">
              <label htmlFor="name"></label>
                <div class="control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    size="50"
                    className="is-rounded"
                    placeholder="Artist Name (required)"
                    onChange={handleInputChange}
                    value={artistRecord.name}
                    required
                  />
                </div>
              
            </div>

            <div className="field">
              <label htmlFor="description"></label>
                <div class="control">
                  <input
                    type="text"
                    id="description"
                    size="50"
                    name="description"
                    placeholder="Description/Bio"
                    onChange={handleInputChange}
                    value={artistRecord.description}
                  />
                </div>
         
            </div>
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
