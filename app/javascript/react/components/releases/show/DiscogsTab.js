import React from 'react'

const DiscogsTab = (props) => {
  const artistList = props.description.map((artist) => {
    
    return (<li>{artist.artist}, {artist.role} </li>)

  })
  return (
    <>
      <p className="has-text-dark has-text-weight-bold is-size-4 p-l-lg p-b-md">
        Additional Credits:
      </p>
      <p
        id="review"
        className="has-text-dark p-b-lg p-l-lg p-r-lg overflow"
      >{artistList}</p>
      <p className="has-text-dark p-l-lg p-b-md">
Via Discogs</p>
    </>
  )
}

export default DiscogsTab
