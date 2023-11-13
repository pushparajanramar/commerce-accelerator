import React from "react";
import { useState } from "react";

export const InputField = ({ type, ...props }) => {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (props.onChange) props.onChange(newValue);
  }

  return (
    <>
      <div className={`tm-input ${type === "input-search" ? "search" : ""}`}>
        <span className="label">{props?.label ? props.label : ""}</span>
        <input
          className="tm-input"
          type={inputType}
          value={inputValue}
          name="input-form"
          onChange={handleChange}
          placeholder={props?.placeholder}
        />
        <button type="submit" aria-label="submit search"></button>
      </div>
    </>
  );
};
