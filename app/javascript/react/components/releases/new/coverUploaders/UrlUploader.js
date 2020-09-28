import React from "react";

const URLUploader = (props) => {
  const changeUploadMethod=() =>{
    props.methodToggle("local")
  }

  return (
    <div>
      <input
        type="text"
        name="imageurl"
        id="imageurl"
        placeholder="Artwork URL"
        onChange={props.handleInputChange}
        className="input"
        value={props.releaseRecord.imageurl}

      />
      <p onClick={changeUploadMethod}>Upload from Device</p>
    </div>
  );
};

export default URLUploader;
