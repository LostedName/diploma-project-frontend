import React from 'react';
import { InputChangeHandler } from '../../../types/types';
import './floatInput.scss';



type Input = {
  value: string,
  onChange: InputChangeHandler,
  label: string,
  type?: string,
  isFilled?: boolean,
}

const FloatInput: React.FC<Input> = ({value, onChange, label, type = "text", isFilled = true}) => {
    
  return (
    <div className={`container ${!isFilled ? "not_filled" : ""}`}>
        <label htmlFor={`${label}_float_input`} className={`${value ? "active" : ""} ${!isFilled ? "not_filled" : ""}`}>{label}</label>
        <input id={`${label}_float_input`} value={value} onChange={onChange} type={type} />
    </div>
  );
}

export default FloatInput;