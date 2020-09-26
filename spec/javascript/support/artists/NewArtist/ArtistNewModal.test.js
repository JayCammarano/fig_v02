import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils"

import ArtistNewModal from "../../../../../app/javascript/react/components/artists/NewArtist/ArtistNewModal";

Enzyme.configure({ adapter: new Adapter() });

describe("AllArtistPlaceholderTile", () => {
  let wrapper, onClickMock, toggleNewArtist;

  beforeEach(() => {
    onClickMock = jest.fn();
    wrapper = mount(
      <ArtistNewModal
      redirectSetter={onClickMock}
      showModal={toggleNewArtist}
      showModalSetter={onClickMock}
      response={onClickMock}
    />
    );
  });

  it("loads the new artist modal", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("loads the multifield component", () => {
    expect(wrapper.find("MultiFieldContainer").exists()).toBe(true);
  });
  it("has an name and description fields", () => {
    expect(wrapper.find("[name='name']").exists()).toBe(true);
    expect(wrapper.find("[name='description']").exists()).toBe(true);
  });

  it("adds a new altname field onClick", () => {
    act(() => {
      wrapper
        .find("MultiFieldContainer").find({children: "+ Add Artist Alias"})
        .simulate('click');
    })
    wrapper.update()
    expect(wrapper.find("MultiFieldContainer").find("AltNameField")).toHaveLength(2)
  })
});
