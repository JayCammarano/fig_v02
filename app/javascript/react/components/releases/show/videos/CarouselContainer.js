import React from "react";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
const YoutubeSlide = ({ url, isSelected }) => (
  <ReactPlayer playing={isSelected} width="100%" url={url} />
);
const SoundcloudSlide = ({ url }) => <ReactPlayer key={0} width="100%" url={url} />;
const CarouselContainer = (props) => {
  const getVideoThumb = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) =>
    url.substr("https://www.youtube.com/watch?v=".length, url.length);

  const customRenderThumb = (children) =>
    children.map((item) => {
      if (item.type.name === "YoutubeSlide") {
        const videoId = getVideoId(item.props.url);
        n=n+1
        return <img key={n} src={getVideoThumb(videoId)} />;
      } else {
        n=n+1
        return (
          <img key={n}src="https://w.soundcloud.com/icon/assets/images/orange_white_32-94fc761.png" />
        );
      }
    });
  let n = 0;

  let videoCarousel = props.videos.map((video) => {
    n = n + 1;
    if (video.url !== null) {
      return <YoutubeSlide key={n} url={video.url} />;
    }
  });
  videoCarousel.splice(0, 0, <SoundcloudSlide key={n} url={props.embed_url} />);
  return (
    <div className="column is-two-fifths m-lg">
      <Carousel renderThumbs={customRenderThumb}>{videoCarousel}</Carousel>
    </div>
  );
};
export default CarouselContainer;
