import React, { useState, Fragment } from "react";
import AltNameField from "./AltNameField";

const MultiFieldContainer = (props) => {
  const [totalAltNameFields, setTotalAltNameFields] = useState(["input"]);
  const addAltNameField = () => {
    let addFieldArray = ["inputs"];
    totalAltNameFields.forEach((inputField) => {
      addFieldArray.push(inputField);
    });
    setTotalAltNameFields(addFieldArray);
  };
  let n = -1;
  let renderAltNameFields = totalAltNameFields.map((inputField) => {
    n = n + 1;
    return (
      <AltNameField
        handleAltNameChange={props.handleAltNameChange}
        altnName={props.newartistRecord.altName}
        key={n}
        id={n}
        value={props.newartistRecord.altName[`${n}`]}
      />
    );
  });

  return (
    <div>
      {renderAltNameFields}
      <a className="is-primary has-text-weight-bold" onClick={addAltNameField}>
        + Add Artist Alias
      </a>
    </div>
  );
};

export default MultiFieldContainer;
