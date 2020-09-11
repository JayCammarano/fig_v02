import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Global/navbar/NavBar";
import FetchArtistID from "../../_assets/FetchArtistID";
import { Link } from "react-router-dom";
import ReleasesTab from "./ReleasesTab";
import BioTab from "./BioTab";

const ArtistShowPageContainer = (props) => {
  let artistID = props.match.params.id;
  const defaultArtist = {
    id: "",
    alias: [],
    name: "",
    description: "",
    imageCaller: "",
    relatedReleases: [
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
  const [getArtist, setArtist] = useState(defaultArtist);
  const [whichTab, setWhichTab] = useState({ id: "releases" });
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
        />
      );
    } else if (whichTab.id === "bio") {
      releaseClass = "";
      bioClass = "is-active";
      addClass = "";

      musicData = <BioTab description={getArtist} artistID={artistID} />;
    } else if (whichTab.id === "addArtist") {
      releaseClass = "";
      bioClass = "";
      addClass = "is-active";

      musicData = (
        <ReleaseNewForm artist={getArtist.name} artistID={artistID} />
      );
    }
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
              <Link className="" to={`/artists/${artistID}/update`}>
                Edit Info
              </Link>
              <li
                id="addArtist"
                onClick={() => changeTabs("addArtist")}
                className={addClass}
              >
                <a>Add Release</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {musicData}
    </>
  );
};

export default ArtistShowPageContainer;
