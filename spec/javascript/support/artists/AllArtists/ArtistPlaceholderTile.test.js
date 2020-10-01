import React from "react"
import Enzyme, { mount, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import ArtistPlaceHolderTile from "../../../../../app/javascript/react/components/artists/AllArtists/ArtistPlaceholderTile"

Enzyme.configure({ adapter: new Adapter() })

describe("AllArtistPlaceholderTile", () => {
  let wrapper, onClickMock

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = mount(
      <ArtistPlaceHolderTile
        launchModal={onClickMock}
        launchLogin={onClickMock}
      />
    );  })

  it("loads the placeholder tile", () => {
    expect(wrapper.exists()).toBe(true)
  })

  it("calls launchLogin onClick when logged out", () => {
    wrapper.simulate('click');
    expect(onClickMock).toHaveBeenCalled()
  })
})
