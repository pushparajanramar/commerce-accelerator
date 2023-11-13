"use client";
import React from "react";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";

function HandOptions({ options, selectedValues, handleChangeOption }) {
  const PLPLabels = useSelector(selectPLPLabel);

  return (
    <ul className="size-chart">
      {options.map((item) => {
        let displayItem = item;
        switch (displayItem) {
          case "LH":
            displayItem = getSpecificLabel(PLPLabels, "left_hand", displayItem);
            break;
          case "RH":
            displayItem = getSpecificLabel(
              PLPLabels,
              "right_hand",
              displayItem
            );
            break;
          case "LC":
            displayItem = getSpecificLabel(
              PLPLabels,
              "left_cadet",
              displayItem
            );
            break;
          case "RC":
            displayItem = getSpecificLabel(
              PLPLabels,
              "right_cadet",
              displayItem
            );
            break;
        }
        return (
          <li
            key={"hand-option-link-checkbox" + item}
            className={`filter-items  ${
              selectedValues.indexOf(item) !== -1 ? "selected" : ""
            }`}
            onClick={() => handleChangeOption(item)}
          >
            <div className={`in-stock hand p-sm`}>{displayItem}</div>
          </li>
        );
      })}
    </ul>
  );
}

HandOptions.propTypes = {
  selectedValues: PropType.array,
  options: PropType.arrayOf(PropType.string),
  handleChangeOption: PropType.func,
};

export default HandOptions;
