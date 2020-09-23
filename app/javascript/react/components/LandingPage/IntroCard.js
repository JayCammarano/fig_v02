import React from "react";

const IntroCard = () => {
  return (
    <div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">Welcome To Fig.</p>
            <p className="subtitle is-6">by Jay Cammarano</p>
          </div>
        </div>
      </div>
      <div className="content p-md">
        <p>
          With Fig I brought together the extensive music metadata of Discogs
          and Last.fm with the streaming aspects of SoundCloud.
        </p>
        <p>
          I focus on user-curated selections rather than algorithms, which
          leave you listening to the same things over and over. This approach
          creates an even playing field for artists who would otherwise get
          pushed to the margins.
        </p>
        <p>
          I hope for a fulfilling experience for the user, where passion for
          information and learning meets a passion for community and music.""{" "}
          <br />
        </p>{" "}
      </div>
    </div>
  );
};

export default IntroCard;
