import React, { Fragment } from "react";
import Dropzone from "react-dropzone";

const ImageUploader = (props) => {
  const handleFileUpload = (acceptedFiles) => {
    props.setReleaseRecord({
      ...props.releaseRecord,
      image: acceptedFiles,
    });
  };
  const changeUploadMethod=() =>{
    props.methodToggle("url")
  }
  return (
    <>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input   {...getInputProps()} />
              <p className="has-text-link has-text-weight-bold">+ Add Artwork from Device</p>
            </div>
          </section>
        )}
      </Dropzone>
      <p onClick={changeUploadMethod}>Upload Via URL</p>
    </>
  );
};

export default ImageUploader;
