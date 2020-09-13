import React, { useState, useEffect, Fragment } from "react";
import {Link} from "react-router-dom"
import NavBar from "../../Global/navbar/NavBar";
import ArtistTile from "../ArtistTile";
import ArtistPlaceholderTile from "./ArtistPlaceholderTile";
import ArtistNewModal from "../NewArtist/ArtistNewModal"
import AllArtistsFetch from "../../_assets/FetchAllArtists";
import FetchAllArtists from "../../_assets/FetchAllArtists";

const AllArtistsContainer = (props) => {
  const [getArtists, setArtists] = useState([
    { id: "", name: "", description: "" },
  ]);
  const [toggleNewArtist, setToggleNewArtist] = useState("");

  useEffect(() => {
    FetchAllArtists(setArtists)
  }, []);
  let artistTiles = getArtists.map((artist) => {
    return (
      <Link to={`/artists/${artist.id}`} className="m-md" 
      key={artist.id}>
        <ArtistTile
          id={artist.id}
          key={artist.id}
          name={artist.name}
          description={artist.description}
        />
        </Link>
    );
  });

  return (
    <div>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <h3 className="title has-text-light pl-2 ml-5 pt-2">Artists</h3>
      <div className="columns is-multiline p-l-lg">
        <div className="is-one-fifth m-md">
          <ArtistPlaceholderTile toggleNewArtist={toggleNewArtist} setToggleNewArtist={setToggleNewArtist}/>
        </div>
          {artistTiles}
        </div>
      <ArtistNewModal getArtists={getArtists} setArtist={setArtists} toggleNewArtist={toggleNewArtist} setToggleNewArtist={setToggleNewArtist}/>
    </div>
  );
};

export default AllArtistsContainer;
