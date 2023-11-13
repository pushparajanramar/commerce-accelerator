import React, { useState } from "react";

export const RadioButton = ({
  label,
  checked,
  value,
  onChange,
  groupLabel,
}) => {
  const handleRadioChange = () => {
    onChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRadioChange();
    }
  };

  const radioId = `${groupLabel}-${value}`;

  return (
    <div>
      <input
        type="radio"
        id={radioId}
        value={value}
        checked={checked}
        onChange={handleRadioChange}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={radioId}>{label}</label>
    </div>
  );
};

export const RadioButtonGroup = ({ labels, groupLabel }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const handleKeyDown = (e) => {
    const currentIndex = labels.indexOf(selectedValue);
    const lastIndex = labels.length - 1;

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
      setSelectedValue(labels[newIndex]);
      const currentRadio = document.getElementById(
        `${groupLabel}-${labels[newIndex]}`
      );
      if (currentRadio) {
        currentRadio.focus();
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
      setSelectedValue(labels[newIndex]);
      const currentRadio = document.getElementById(
        `${groupLabel}-${labels[newIndex]}`
      );
      if (currentRadio) {
        currentRadio.focus();
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
      const prevRadio = document.getElementById(
        `${groupLabel}-${labels[prevIndex]}`
      );
      if (prevRadio) {
        e.preventDefault();
        setSelectedValue(labels[prevIndex]);
        prevRadio.focus();
      }
    } else if (e.key === "Tab") {
      const nextIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
      const nextRadio = document.getElementById(
        `${groupLabel}-${labels[nextIndex]}`
      );
      if (nextRadio) {
        e.preventDefault();
        setSelectedValue(labels[nextIndex]);
        nextRadio.focus();
      }
    }
  };

  return (
    <div
      className="tm-radio"
      role="radiogroup"
      aria-labelledby={groupLabel}
      id={groupLabel}
      onKeyDown={handleKeyDown}
    >
      <h2 id={groupLabel}>{groupLabel}</h2>
      {labels.map((label, index) => (
        <RadioButton
          key={index}
          label={label}
          value={label}
          groupLabel={groupLabel}
          checked={selectedValue === label}
          onChange={handleRadioButtonChange}
        />
      ))}
    </div>
  );
};
