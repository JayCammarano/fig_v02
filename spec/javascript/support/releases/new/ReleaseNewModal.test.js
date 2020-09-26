import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";

import ReleaseNewModal from "../../../../../app/javascript/react/components/releases/new/ReleaseNewModal";
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
      <ReleaseNewModal
        releases={releases}
        artistID={1}
        image={"www.fake.com"}
        name={"Chance the Rapper"}
        toggleNewRelease={onClickMock}
      />
    );
  });

  it("loads the login modal", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("have a title, artist, and embed field", () => {
    expect(wrapper.find("[name='title']").exists()).toBe(true);
    expect(wrapper.find("[name='embed_url']").exists()).toBe(true);
  });

  it("adds a new artist field onClick", () => {
    act(() => {
      wrapper
        .find(MultipleArtistFields)
        .find({ children: "+ Add Artist" })
        .simulate("click");
    });
    wrapper.update();
    expect(
      wrapper.find(MultipleArtistFields).find("ArtistField")
    ).toHaveLength(2);
  });
});
