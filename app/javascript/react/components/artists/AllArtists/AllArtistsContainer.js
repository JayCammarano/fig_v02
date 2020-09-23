import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Global/navbar/NavBar";
import ArtistTile from "../ArtistTile";
import ArtistPlaceholderTile from "./ArtistPlaceholderTile";
import ArtistNewModal from "../NewArtist/ArtistNewModal";
import FetchAllArtists from "../../_assets/FetchAllArtists";
import { Redirect } from "react-router-dom";


const AllArtistsContainer = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [getArtists, setArtists] = useState([
    { id: "", name: "", description: "", image: "" },
  ]);
  const [toggleNewArtist, setToggleNewArtist] = useState("");
  const [postResponse, setPostResponse] = useState({id: ""})
  useEffect(() => {
    FetchAllArtists(setArtists);
  }, []);
  let artistTiles = getArtists.map((artist) => {
    return (
      <Link to={`/artists/${artist.id}`} className="m-md" key={artist.id}>
        <ArtistTile
          id={artist.id}
          key={artist.id}
          name={artist.name}
          description={artist.description}
          image={artist.imageCaller}
        />
      </Link>
    );
  });
  
  if (shouldRedirect == true && postResponse.id !== "") {
    return <Redirect to={`/artists/${postResponse.id}`} />;
  }

  return (
    <div>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <h3 className="title has-text-light pl-2 ml-5 pt-2">Artists</h3>
      <div className="columns is-multiline p-l-lg">
        <div className="is-one-fifth m-md">
          <ArtistPlaceholderTile
            toggleNewArtist={toggleNewArtist}
            setToggleNewArtist={setToggleNewArtist}
          />
        </div>
        {artistTiles}
      </div>
      <ArtistNewModal
        shouldRedirect={shouldRedirect}
        setShouldRedirect={setShouldRedirect}
        toggleNewArtist={toggleNewArtist}
        setToggleNewArtist={setToggleNewArtist}
        response={postResponse} setResponse={setPostResponse}
      />
    </div>
  );
};

export default AllArtistsContainer;
