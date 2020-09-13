import React from "react";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
const YoutubeSlide = ({ url, isSelected }) => (
  <ReactPlayer playing={isSelected} width="100%" url={url} />
);
const SoundcloudSlide = ({ url }) => <ReactPlayer width="100%" url={url} />;
const CarouselContainer = (props) => {
  const getVideoThumb = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) =>
    url.substr("https://www.youtube.com/watch?v=".length, url.length);

  const customRenderThumb = (children) =>
    children.map((item) => {
      debugger
      if (item.type.name === "YoutubeSlide") { 
        debugger
        const videoId = getVideoId(item.props.url);
        
        return <img src={getVideoThumb(videoId)} />;
      } else {
        return (
          <img src="https://w.soundcloud.com/icon/assets/images/orange_white_32-94fc761.png" />
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
  videoCarousel.splice(0, 0, <SoundcloudSlide url={props.embed_url} />);
  return (
    <div className="column is-two-fifths m-lg">
      <Carousel renderThumbs={customRenderThumb}>{videoCarousel}</Carousel>
    </div>
  );
};
export default CarouselContainer;
