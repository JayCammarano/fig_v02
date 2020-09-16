import React from 'react'
import Dropzone from "react-dropzone";


const ImageUploader = (props) => {
  const handleFileUpload = (acceptedFiles) => {
    props.setReleaseRecord({
      ...props.releaseRecord,
      image: acceptedFiles[0]
    })
  }
  return (
    <Dropzone onDrop={handleFileUpload}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            add an album cover
          </p>
        </div>
      </section>
    )}
  </Dropzone>

  )
}

export default ImageUploader
