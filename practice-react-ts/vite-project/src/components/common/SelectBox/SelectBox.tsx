import React, { ChangeEvent } from "react";
import "./selectBox.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  label: string;
  name:string
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  value,
  name,
  onChange,
}) => {

  return (
    <div className="select-wrapper">
      <label className="label-select">{label}</label>
      <select
        className="select-form"
        value={value}
        name={name}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
