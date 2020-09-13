import React, { Fragment, useEffect } from "react";

const PitchforkReview = (props) => {
  useEffect(() => {
    if (props.p4kCollapse === "hide") {
      document.getElementById("review").innerHTML = props.reviews[0];
    } else {
      document.getElementById("review").innerHTML = props.reviews[1];
    }
  }),
    [props.reviews];
  const fullReview = () => {
    if (props.p4kCollapse === "hide") {
      props.setp4kCollapse("show");
    } else {
      props.setp4kCollapse("hide");
    }
  };
  return (
    <>
      <p className="has-text-dark has-text-weight-bold is-size-4 p-l-lg p-b-md">
        Review from Pitchfork:
      </p>
      <p
        id="review"
        className="has-text-dark p-b-lg p-l-lg p-r-lg overflow"
      ></p>
      <p
        onClick={fullReview}
        className="has-text-dark p-b-lg p-l-lg p-r-lg"
      >
        More/Less
      </p>
    </>
  );
};

export default PitchforkReview;
