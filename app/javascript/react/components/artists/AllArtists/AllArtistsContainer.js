import React, { useState, useEffect } from "react";
import NavBar from "../../Global/navbar/NavBar";
import ArtistTile from "../ArtistTile";
import ArtistPlaceholderTile from "./ArtistPlaceholderTile";
import ArtistNewModal from "../NewArtist/ArtistNewModal"
const AllArtistsContainer = (props) => {
  const [getArtists, setArtists] = useState([
    { id: "", name: "", description: "" },
  ]);
  const [toggleNewArtist, setToggleNewArtist] = useState("");

  useEffect(() => {
    fetch("/api/v1/artists")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })

      .then((response) => response.json())
      .then((body) => {
        setArtists(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return (
    <div>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <h3 className="title has-text-light pl-2 ml-5 pt-2">Artists</h3>
      <div className="columns is-multilines p-l-lg">
        <div className="columnn is-one-fifth">
          <ArtistPlaceholderTile toggleNewArtist={toggleNewArtist} setToggleNewArtist={setToggleNewArtist}/>
        </div>
        <div className="column is-one-fifth">
          <ArtistTile />
        </div>
      </div>
      <ArtistNewModal getArtists={getArtists} setArtist={setArtists} toggleNewArtist={toggleNewArtist} setToggleNewArtist={setToggleNewArtist}/>
    </div>
  );
};

export default AllArtistsContainer;
