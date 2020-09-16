import React from "react";

const ArtistField = (props) => {
  let handleChange = (event) => {
    props.handleArtistChange(event);
  };

  return (
    <div className="field">
    <label htmlFor="artist">
      <input
        key={props.id}
        type="text"
        id={props.id}
        name="artists"
        className="input is-medium"
        placeholder="Artists"
        onChange={handleChange}
        value={props.value}
      />
    </label>
    </div>
  );
};

export default ArtistField;
