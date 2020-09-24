import React, { useState, useEffect, Fragment } from "react";
import NavBar from "../../Global/navbar/NavBar";
import ReleaseDescription from "./ReleaseDescription";
import ReleaseUpdatePage from "../update/ReleaseUpdatePage";
import FetchRelease from "../../_assets/FetchRelease";
import ArtistsTab from "./infotabs/ArtistsTab";
import CarouselContainer from "./videos/CarouselContainer"
const ReleaseShowContainer = (props) => {
  const artistID = props.match.params.artistid;
  const releaseID = props.match.params.id;
  const [whichTab, setWhichTab] = useState({ id: "description" });
  const changeTabs = (tab) => {
    setWhichTab({ id: tab });
  };
  let defaultRelease = {
    id: "",
    title: "",
    release_type: "",
    embed_url: "",
    original_release_year: "",
    relatedArtists: [{ id: "", name: "", description: "", alias: [] }],
    relatedLabels: [{ name: "" }],
    embed_url: "",
    description: "",
    search_for_review: "",
    discogs_info: [[{}], [{url: "", title: "" }]]
    
  };

  const [getRelease, setRelease] = useState(defaultRelease);
  useEffect(() => {
    FetchRelease(artistID, releaseID, setRelease);
  }, [artistID]);
  let musicData;
  let editClass = "";
  let creditsClass = "";
  let descriptionClass = "is-active";
  if (getRelease !== defaultRelease) {
    if (whichTab.id === "description") {
      descriptionClass = "is-active";
      editClass = "";
      creditsClass = "";

      musicData = <ReleaseDescription description={getRelease} />;
    } else if (whichTab.id === "edit") {
      descriptionClass = "";
      editClass = "is-active";
      creditsClass = "";

      musicData = (
        <ReleaseUpdatePage artistID={artistID} releaseID={releaseID} />
      );
    } else if (whichTab.id === "credits") {
      descriptionClass = "";
      editClass = "";
      creditsClass = "is-active";

      musicData = (
        <ArtistsTab
          artists={getRelease.relatedArtists}
          labels={getRelease.relatedLabels}
        />
      );
    }
  }

  return (
    <>
      <NavBar loggedInStatus={props.loggedInStatus} />
      <section className="hero is-dark">
        <h1 className="title is-dark p-t-lg p-l-lg m-l-lg p-t-sm is-size-1">
          {getRelease.title}
        </h1>
        <div className="tabs is-4 pt-4 p-r-lg m-r-lg is-boxed is-toggle is-one-half is-right">
          <ul>
            <li
              id="description"
              className={descriptionClass}
              onClick={() => changeTabs("description")}
            >
              <a>info</a>
            </li>
            <li
              id="credits"
              className={creditsClass}
              onClick={() => changeTabs("credits")}
            >
              <a>credits</a>
            </li>
          </ul>
        </div>
      </section>
      <div>
        <div className="columns">
        <CarouselContainer embed_url={getRelease.embed_url} videos={getRelease.discogs_info[1]} />
          {musicData}
        </div>
      </div>
    </>
  );
};

export default ReleaseShowContainer;
