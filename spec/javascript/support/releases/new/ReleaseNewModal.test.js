import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";

import ReleaseNewForm from "../../../../../app/javascript/react/components/releases/new/ReleaseNewModal";
import MultipleArtistFields from "../../../../../app/javascript/react/components/releases/new/MultipleArtistFields";
Enzyme.configure({ adapter: new Adapter() });

describe("ReleaseNewModal", () => {
  let wrapper, onClickMock, releases;
  beforeEach(() => {
    onClickMock = jest.fn();
    releases = {
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

    wrapper = mount(
      <ReleaseNewForm
        toggleNewRelease="is-active"
        artist="test"
        artistID={1}
        shouldRedirect={false}
        setShouldRedirect={onClickMock}
      />
    );
  });

  it("loads the login modal", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("have a title, artist, embed, release_type, and year field", () => {
    expect(wrapper.find("[name='title']").exists()).toBe(true);
    expect(wrapper.find("[name='embed_url']").exists()).toBe(true);
    expect(wrapper.find("[name='release_type']").exists()).toBe(true);
    expect(wrapper.find("[name='original_release_year']").exists()).toBe(true);
  });

  it("adds a new artist field onClick", () => {
    act(() => {
      wrapper
        .find(MultipleArtistFields)
        .find({ children: "+ Add Artist" })
        .simulate("click");
    });
    wrapper.update();
    expect(wrapper.find(MultipleArtistFields).find("ArtistField")).toHaveLength(
      2
    );
  });

  // it("Release New Modal redirects on submit", () => {
  //   let fetchResponse =
  //     ({
  //       id: 4,
  //       release_type: "Album",
  //       embed_url: "",
  //       title: "test",
  //       original_release_year: 2020,
  //     },
  //     {
  //       status: 200,
  //     });

  //   act(() => {
  //     wrapper.
  //     wrapper
  //       .find({ children: "Submit" })
  //       .simulate("click");
  //   });
  //   wrapper.update();
  //   expect(wrapper.props().shouldRedirect).toBe(true);
  // });

});
