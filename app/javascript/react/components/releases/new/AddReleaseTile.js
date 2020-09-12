import React from 'react'

const AddReleaseTile = (props) => {
  const addNewReleaseToggle=()=>{
    props.setToggleNewRelease("is-active")
  }

  return (
    <div className="card has-background-light" onClick={addNewReleaseToggle}>
      <p className="has-text-weight-bold has-text-grey m-sm">
        <b>Add A New Release</b>
      </p>
      <figure className="image is-48by48 m-sm">
        <img
          src={props.image}
          className="card-image"
          alt="Cover Image"
        />
      </figure>
      <h4 className="card-header-title has-text-dark">
        Add A New Release by {props.name}
      </h4>
    </div>
  )
}

export default AddReleaseTile
