import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { BrowserRouter } from "react-router-dom";

import AllArtistsContainer from "../../../../../app/javascript/react/components/artists/AllArtists/AllArtistsContainer";
import ArtistPlaceHolderTile from "../../../../../app/javascript/react/components/artists/AllArtists/ArtistPlaceholderTile";

Enzyme.configure({ adapter: new Adapter() });

describe("AllArtistsContainer", () => {
  let wrapper, onClickMock, artists;

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
  });

  afterEach(fetchMock.restore);

  it("loads the container", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the artist tiles", () => {
    expect(wrapper.find({children: artists[0].name})).toExist
    expect(wrapper.find({children: artists[1].name})).toExist
  });
});
