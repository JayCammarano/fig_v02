import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
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
    releases = [
      {
        id: 1,
        name: "Chance the Rapper",
        description: "",
        lastfmCaller: {
          similar: {
            artist: [
              {
                name: "Donnie Trumpet \u0026 The Social Experiment",
                url:
                  "https://www.last.fm/music/Donnie+Trumpet+\u0026+The+Social+Experiment",
                image: [],
              },
              {
                bio:
                  "Chancelor Bennett (born April 16, 1993), better known by his stage name Chance The Rapper, is an American hip hop recording artist from Chicago, Illinois. In 2013, he began to gain recognition following the release of his first two mixtapes. Chance first made some noise on the Chicago hip-hop blog Fake Shore Drive with his video for Nostalgia in early 2011. His latest mixtape, Coloring Book, was released for free on Apple Music on 12 May 2016.\n\nChance achieved some success with his first mixtape 10Day, which details his 10 day long suspension from his high school. On April 30, 2013, Chance's second mixtape, Acid Rap dropped. It received diamond status from Datpiff. The Social Experiment, Chance's band with Donnie Trumpet, Peter Cottontail, and members of the O'My's, released their free album, Surf, on May 28, 2015. Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.",
              },
            ],
          },
          bio:
            "Chancelor Bennett (born April 16, 1993), better known by his stage name Chance The Rapper, is an American hip hop recording artist from Chicago, Illinois. In 2013, he began to gain recognition following the release of his first two mixtapes. Chance first made some noise on the Chicago hip-hop blog Fake Shore Drive with his video for Nostalgia in early 2011. His latest mixtape, Coloring Book, was released for free on Apple Music on 12 May 2016.\n\nChance achieved some success with his first mixtape 10Day, which details his 10 day long suspension from his high school. On April 30, 2013, Chance's second mixtape, Acid Rap dropped. It received diamond status from Datpiff. The Social Experiment, Chance's band with Donnie Trumpet, Peter Cottontail, and members of the O'My's, released their free album, Surf, on May 28, 2015. Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.",
        },
        releaseImageCaller: [
          {
            release_type: "Album",
            year: 2020,
            id: 1,
            title: "Acid Rap",
            image: {
              id: 4,
              attachment: { url: null },
              imageable_id: 1,
              imageable_type: "Release",
              created_at: "2020-09-26T01:36:43.151Z",
              updated_at: "2020-09-26T01:36:43.212Z",
            },
          },
        ],
        imageCaller:
          "https://fig-music.s3.amazonaws.com/uploads/image/attachment/1/avatars-000035176561-rg0orz-t500x500.jpg",
      },
    ];
    onClickMock = jest.fn();
    artistid = 1;
    fetchMock.get(`/api/v1/artists/${artistid}/`, {
      body: releases,
    });

    wrapper = shallow(
        <ArtistShowPageContainer
          match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        />
    );
  });
  afterEach(fetchMock.restore);

  it("loads the login modal", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("loads the release tiles", () => {
    expect(wrapper.find({ children: releases[0].releaseImageCaller[0].title }))
      .toExist;
  });
  it("changes the tab onClick to bio", () => {
    act(() => {
      wrapper.find("[name='bio']").simulate("click");
    });
    wrapper.update();
    expect(wrapper.find("BioTab"))
  });
});
