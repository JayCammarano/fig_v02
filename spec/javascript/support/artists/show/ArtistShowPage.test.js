import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import ReleaseNewModal from "../../../../../app/javascript/react/components/releases/new/ReleaseNewModal";
import ArtistShowPageContainer from "../../../../../app/javascript/react/components/artists/show/ArtistShowPage";
Enzyme.configure({ adapter: new Adapter() });

describe("ArtistShowPage", () => {
  let wrapper, onClickMock, artistid, releases;

  beforeEach(() => {
    releases = { release: 1 };
    onClickMock = jest.fn();
    artistid = 1;
    fetchMock.get(`/api/v1/artists/${artistid}/`, {
      body: releases,
    });

    wrapper = mount(
      <BrowserRouter>
        <ArtistShowPageContainer
          match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        />
      </BrowserRouter>
    );
  });
  afterEach(fetchMock.restore);

  it("loads the login modal", () => {
    expect(wrapper.exists()).toBe(true);
  });

});
