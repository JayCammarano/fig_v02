import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import MultipleArtistFields from "./MultipleArtistFields";
import PostNewRelease from "../../_assets/PostNewRelease";
import DiscogsAutofill from "../../_assets/DiscogsAutofill";
import ImageUploader from "./ImageUploader";

const ReleaseNewForm = (props) => {
  let artist = props.artist;
  let artistID = props.artistID;
  const starterArray = [{ title: "" }, { artist: "" }, {year: ""}];
  const [autoFill, setAutofill] = useState(starterArray);
  const [releaseRecord, setReleaseRecord] = useState({
    title: "",
    description: "",
    artists: [""],
    release_type: "Album",
    original_release_year: 2020,
    embed_url: "",
    image: [""]
  });
  useEffect(() => {
    setReleaseRecord({
      ...releaseRecord,
      artists: [artist],
    });
  }, [artist]);

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState("");
  const validForSubmission = () => {
    let nameError = "Title can't be blank.";
    if (!releaseRecord.title) {
      setErrors(nameError);
    } else {
      return true;
    }
  };

  const handleInputChange = (event) => {
    setReleaseRecord({
      ...releaseRecord,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const onSubmitHandeler = (event) => {
    event.preventDefault();
    if (validForSubmission() === true) {
      addNewRelease(releaseRecord);
    }
  };

  const addNewRelease = (release) => {
    event.preventDefault();
    PostNewRelease(release, setShouldRedirect, artistID);
  };

  if (shouldRedirect) {
    return <Redirect to={`/artists/${artistID}/`} />;
  }

  const handleArtistChange = (event) => {
    let artists = releaseRecord.artists;
    artists[event.currentTarget.id] = event.currentTarget.value;

    setReleaseRecord({
      ...releaseRecord,
      artists,
    });
  };
  const addNewReleaseToggle = () => {
    props.setToggleNewRelease("");
  };

  const FetchDiscogs = () => {
    DiscogsAutofill(artistID, releaseRecord, setAutofill);
  };

  useEffect(() => {
    let n = 1;
    if (autoFill !== starterArray) {
      autoFill.map((infoPiece) => {
        if (Object.keys(infoPiece)[0] == "title") {
          setReleaseRecord({
            ...releaseRecord,
            title: infoPiece["title"],
          });
        } else if (Object.keys(infoPiece)[0] === "artist") {
          let artists = releaseRecord.artists;
          artists[n] = Object.values(infoPiece)[0];

          setReleaseRecord({
            ...releaseRecord,
            artists,
          });
          n = n + 1;
        } else if (Object.keys(infoPiece)[0] === "year") {
          setReleaseRecord({
            ...releaseRecord,
            original_release_year: infoPiece["year"],
          });
        }
      });
    }
  }, [autoFill]);
  return (
    <section className="columns center">
      <div className="column m-lg">
        <div className={`modal ${props.toggleNewRelease}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Release</p>
              <button
                className="delete"
                aria-label="close"
                onClick={addNewReleaseToggle}
              ></button>
            </header>
            <form onSubmit={onSubmitHandeler}>
              <section className="modal-card-body overflowLG">
                <div className="field">
                  <label htmlFor="name">
                    <div className="control">
                      <select
                        className="select"
                        type="text"
                        id="release_type"
                        name="release_type"
                        onChange={handleInputChange}
                        value={releaseRecord.release_type}
                      >
                        <option value="Album">Album</option>
                        <option value="EP">EP</option>
                        <option value="Single">Single</option>
                        <option value="Dj Set">DJ Set</option>
                        <option value="Anthology">Anthology</option>
                        <option value="Compilation">Compilation</option>
                        <option value="Mixtape">Mixtape</option>
                        <option value="Demo">Demo</option>
                        <option value="Concert Recording">
                          Concert Recording
                        </option>
                      </select>
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="name">
                    <div className="control">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="input is-medium"
                        placeholder="Release Title (required)"
                        onChange={handleInputChange}
                        value={releaseRecord.title}
                      />
                    </div>
                  </label>
                </div>
                <button
                  type="button"
                  className="button is-primary p-b-md"
                  onClick={FetchDiscogs}
                >
                  Autofill
                </button>
                <div className="field">
                  <label htmlFor="embed_url">
                    <div className="control">
                      <input
                        type="text"
                        id="embed_url"
                        name="embed_url"
                        className="input is-medium"
                        placeholder="Soundcloud URL"
                        onChange={handleInputChange}
                        value={releaseRecord.embed_url}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="original_release_year">
                    <div className="control">
                      <input
                        type="text"
                        id="original_release_year"
                        name="original_release_year"
                        className="input is-medium"
                        placeholder="Year"
                        onChange={handleInputChange}
                        value={releaseRecord.original_release_year}
                      />
                    </div>
                  </label>
                </div>
                <MultipleArtistFields
                  handleArtistChange={handleArtistChange}
                  releaseRecord={releaseRecord}
                />
                <ImageUploader releaseRecord={releaseRecord} setReleaseRecord={setReleaseRecord}/>
                <br />
                <button className="button is-success" type="submit">
                  Submit
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleaseNewForm;
