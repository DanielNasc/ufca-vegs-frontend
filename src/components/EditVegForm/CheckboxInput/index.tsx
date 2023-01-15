import React, { forwardRef } from "react";
import { CheckboxInputContainer, CheckboxInputBaseInput } from "./styles";

interface ICheckboxInputProps {
  name: string
  label: string
}

const Base = ({ name, label, ...rest }: ICheckboxInputProps, ref: any) => {
  return (
    <CheckboxInputContainer>
      <label htmlFor={name}>{label}</label>
      <CheckboxInputBaseInput
        type="checkbox"
        name={name}
        id={name}
        {...rest} 
        ref={ref} 
      />
    </CheckboxInputContainer>
  )
}

export const CheckboxInput = forwardRef(Base)
