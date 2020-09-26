import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetchMock from "fetch-mock";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

import PleaseLogin from "../../../../app/javascript/react/components/Auth/PleaseLogin";
Enzyme.configure({ adapter: new Adapter() });

describe("AllArtistPlaceholderTile", () => {
  let wrapper, onClickMock;
  let user = { email: "test@gmail.com", password: "testtest" };
  const handleClick = jest.spyOn(React, "useState");
  beforeEach(() => {
    onClickMock = jest.fn();

    wrapper = shallow(<PleaseLogin />);
  });

  it("loads the login modal", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("have an email and password field", () => {
    expect(wrapper.find("[name='email']").exists()).toBe(true);
    expect(wrapper.find("[name='password']").exists()).toBe(true);
  });
});
