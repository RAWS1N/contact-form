import React from "react"

interface InputLabelProps {
    value : string
    required? : boolean
}

const InputLabel:React.FC<InputLabelProps> = ({value,required}) => {
  return (
    <span className="text-sm ml-1 tracking-wide">{value}{required && <sup className="mx-1 text-rose-500">*</sup>}</span>
  )
}

export default InputLabel