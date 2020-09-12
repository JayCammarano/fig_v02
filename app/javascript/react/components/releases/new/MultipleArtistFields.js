import React, { useState, Fragment } from "react";
import ArtistField from "./ArtistField";
import DiscogsQuery from "./DiscogsQueryContainer";

const multipleArtistFields = (props) => {
  // number of fields to make state
  const [artistFields, setArtistFields] = useState(["input"]);

  const addArtistField = (event) => {
    let totalFields = ["input"];
    artistFields.forEach((artistFields) => {
      totalFields.push(artistFields);
    });
    setArtistFields(totalFields);
  };

  // define n for field id
  let n = -1;
  // artistField is iterrated through and each "input" entry creates an ArtistField Component
  let artistForms = artistFields.map((inputField) => {
    n = n + 1;
    return (
        <ArtistField
          handleArtistChange={props.handleArtistChange}
          artist={props.releaseRecord.artists}
          key={n}
          id={n}
          value={props.releaseRecord.artists[`${n}`]}
        />
    );
  });

  return (
    <>
      {artistForms}
      <a className="is-primary has-text-weight-bold" onClick={addArtistField}>
        + Add Artist
      </a>
    </>
  );
};

export default multipleArtistFields;
