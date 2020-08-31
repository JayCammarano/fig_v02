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
            <p className="title is-4">Welcome To Fig</p>
            <p className="subtitle is-6">by Jay Cammarano</p>
          </div>
        </div>
      </div>
      <div className="content center">
        Here lies a paragraph or two about why fig is important. <br />
      </div>
    </div>
  );
};

export default IntroCard;
