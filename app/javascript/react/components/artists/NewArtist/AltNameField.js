import React from 'react'

const AltNameField = (props) => {
  return (
    <div className="field">
    <label htmlFor="altName">
      <div className="control">
        <input
          key={props.id}
          type="text"
          id={props.id}
          name="altName"
          className="input"
          placeholder="Artist Alias"
          onChange={props.handleAltNameChange}
          value={props.value}
        />
    </div>
  </label>
</div>
  )
}

export default AltNameField
