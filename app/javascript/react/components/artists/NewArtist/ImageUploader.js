import React from 'react'
import Dropzone from "react-dropzone";


const ImageUploader = (props) => {
  const handleFileUpload = (acceptedFiles) => {
    props.setnewArtistRecord({
      ...props.newartistRecord,
      image: acceptedFiles
    })
  }
  return (
    <Dropzone onDrop={handleFileUpload}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            add an artist image
          </p>
        </div>
      </section>
    )}
  </Dropzone>

  )
}

export default ImageUploader
