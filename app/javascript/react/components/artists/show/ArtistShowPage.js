import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Global/navbar/NavBar";
import FetchArtistID from "../../_assets/FetchArtistID";
import ReleasesTab from "./ReleasesTab";
import BioTab from "./BioTab";
import ReleaseNewForm from "../../releases/new/ReleaseNewModal";
import { Redirect } from "react-router-dom";

const ArtistShowPageContainer = (props) => {
  let artistID = props.match.params.id;
  const defaultArtist = {
    id: "",
    alias: [],
    name: "",
    description: "",
    imageCaller: "",
    releaseImageCaller: [
      {
        id: "",
        title: "",
        release_type: "",
        embed_url: "",
        original_release_year: "",
        label_id: "",
        tag_id: "",
      },
    ],
  };
  const [toggleNewRelease, setToggleNewRelease] = useState("");
  const [response, setResponse] = useState({id: ""})
  const [getArtist, setArtist] = useState(defaultArtist);
  const [whichTab, setWhichTab] = useState({ id: "releases" });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const changeTabs = (tab) => {
    setWhichTab({ id: tab });
  };

  useEffect(() => {
    FetchArtistID(artistID, setArtist);
  }, []);
  let musicData;
  let releaseClass = "is-active";
  let bioClass;
  let addClass;

  if (getArtist !== defaultArtist) {
    if (whichTab.id === "releases") {
      releaseClass = "is-active";
      bioClass = "";
      addClass = "";
      musicData = (
        <ReleasesTab
          releases={getArtist.releaseImageCaller}
          artistID={artistID}
          image={getArtist.imageCaller}
          name={getArtist.name}
          toggleNewRelease={toggleNewRelease}
          setToggleNewRelease={setToggleNewRelease}
        />
      );
    } else if (whichTab.id === "bio") {
      releaseClass = "";
      bioClass = "is-active";
      addClass = "";

      musicData = (
        <BioTab
          description={getArtist}
          artistID={artistID}
          image={getArtist.imageCaller}
          name={getArtist.name}
          toggleNewRelease={toggleNewRelease}
          setToggleNewRelease={setToggleNewRelease}
        />
      );
    }
  }
  if (shouldRedirect === true && response.id != "") {
    return <Redirect to={`/artists/${artistID}/releases/${response.id}`} />;
  }

  return (
    <>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <section className="hero is-dark">
        <h1 className=" title is-size-1 is-dark p-t-lg pl-2 ml-5">
          {getArtist.name}
        </h1>
        <div className="column">
          <a className="has-text-light is-size-4 pl-2 ml-5">
            {getArtist.description}
          </a>
        </div>
        <div className="column is-one-half">
          <div className="tabs is-boxed is-toggle pl-2 ml-5">
            <ul>
              <li
                id="bio"
                name="bio"
                className={bioClass}
                onClick={() => changeTabs("bio")}
              >
                <a>Info</a>
              </li>
              <li
                id="releases"
                onClick={() => changeTabs("releases")}
                className={releaseClass}
              >
                <a>Releases</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {musicData}
      <ReleaseNewForm
        toggleNewRelease={toggleNewRelease}
        setToggleNewRelease={setToggleNewRelease}
        artist={getArtist.name}
        artistID={artistID}
        shouldRedirect={shouldRedirect}
        setShouldRedirect={setShouldRedirect}
        setResponse={setResponse}
      />
    </>
  );
};

export default ArtistShowPageContainer;
