import React, { useState } from 'react'

const MultiFieldContainer = (props) => {
  const [totalAltNameFields, setTotalAltNameFields] = useState(["input"])
  const addAltNameField = () => {
    let addFieldArray = ["inputs"]
    totalAltNameFields.forEach((input){
      addFieldArray.push(addFieldArray)
    })
    setTotalAltNameFields(addFieldArray)
  }
  return (
    <div>
      
    </div>
  )
}

export default MultiFieldContainer
