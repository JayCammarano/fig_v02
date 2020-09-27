import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import AllArtistsContainer from "../../../../../app/javascript/react/components/artists/AllArtists/AllArtistsContainer";
import ArtistPlaceHolderTile from "../../../../../app/javascript/react/components/artists/AllArtists/ArtistPlaceholderTile";
import ArtistNewModal from "../../../../../app/javascript/react/components/artists/NewArtist/ArtistNewModal";
import PleaseLogin from "../../../../../app/javascript/react/components/Auth/PleaseLogin";
Enzyme.configure({ adapter: new Adapter() });

describe("AllArtistsContainer", () => {
  let wrapper, artists, loggedOn;

  beforeEach(() => {
    artists = [
      {
        id: 1,
        name: "Chance the Rapper",
        description: "A Rapper from Chicago",
        imageCaller:
          "https://fig-music.s3.amazonaws.com/uploads/image/attachment/1/avatars-000035176561-rg0orz-t500x500.jpg",
      },
      {
        id: 2,
        name: "BJ The Chicago Kid",
        description: null,
        imageCaller: { error: "No artist image" },
      },
    ];

    fetchMock.get("/api/v1/artists", {
      body: artists,
    });

    wrapper = mount(
      <BrowserRouter>
        <AllArtistsContainer />
      </BrowserRouter>
    );
    loggedOn = mount(
      <BrowserRouter>
        <AllArtistsContainer loggedInStatus="LOGGED_IN" />
      </BrowserRouter>
    );
  });
  afterEach(fetchMock.restore);

  it("loads the container", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the artist tiles", () => {
    expect(wrapper.find({ children: artists[0].name })).toExist;
    expect(wrapper.find({ children: artists[1].name })).toExist;
  });

  it("displays pleaselogin modal", () => {
    act(() => {
      wrapper.find(ArtistPlaceHolderTile).simulate("click");
    });
    wrapper.update();
    expect(wrapper.find(PleaseLogin).props().showStatus).toEqual("is-active");
  });
  it("closes the pleaselogin onClick of cancel button", () => {
    act(() => {
      wrapper.find(ArtistPlaceHolderTile).simulate("click");
    });
    wrapper.update();

    act(() => {
      wrapper
        .find(PleaseLogin)
        .find({ children: "Close" })
        .simulate("click");
    });
    wrapper.update();

    expect(wrapper.find(PleaseLogin).props().showStatus).toEqual("");
  });
  it("closes the pleaselogin modal onClick of X", () => {
    act(() => {
      wrapper.find(ArtistPlaceHolderTile).simulate("click");
    });
    wrapper.update();
    act(() => {
      wrapper
        .find(ArtistNewModal)
        .find(".delete")
        .simulate("click");
    });
    wrapper.update();

    expect(wrapper.find(ArtistNewModal).props().showModal).toEqual("");
  });

  it("displays ArtistNewModal modal when logged in", () => {
    act(() => {
      loggedOn.find(ArtistPlaceHolderTile).simulate("click");
    });
    loggedOn.update();

    expect(loggedOn.find(AllArtistsContainer).find(ArtistNewModal).props().showModal).toEqual("is-active")
  });
  it("closes the ArtistNewModal modal onClick of X", () => {
    act(() => {
      loggedOn.find(ArtistPlaceHolderTile).simulate("click");
    });
    loggedOn.update();
    act(() => {
      loggedOn
        .find(ArtistNewModal)
        .find(".delete")
        .simulate("click");
    });
    loggedOn.update();

    expect(loggedOn.find(ArtistNewModal).props().showModal).toEqual("");
  });

  it("closes the ArtistNewModal modal onClick of Cancel button", () => {
    act(() => {
      loggedOn.find(ArtistPlaceHolderTile).simulate("click");
    });
    loggedOn.update();
    act(() => {
      loggedOn
        .find(ArtistNewModal)
        .find({children: "Cancel"})
        .simulate("click");
    });
    loggedOn.update();

    expect(loggedOn.find(ArtistNewModal).props().showModal).toEqual("");
  });


});
