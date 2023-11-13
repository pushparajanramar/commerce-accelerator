"use client";
import {
  setSelectedOptions,
  setShowFilters,
} from "../../../../store/slices/PLPFilterSlice";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterColorCheckbox from "./FilterColorCheckbox";
import FilterSizeCheckbox from "./FilterSizeCheckbox";
import FilterCategory from "./FilterCategory";
import FilterCheckbox from "./FilterCheckbox";
import { getSpecificLabel } from "@/lib/Common";
import { selectPLPLabel } from "@/store/slices/labelsSlice";

function FilterItem({ title, options }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { selected: selectedOption, showfilters: showFilters } = useSelector(
    (state) => state.plpfilter
  );
  const PLPLabel = useSelector(selectPLPLabel)

  let label = title;
  switch (label) {
    case "colorGroups":
      label = getSpecificLabel(PLPLabel, 'color')
      break
    case "sleeveLength":
      label = getSpecificLabel(PLPLabel, 'sleeve_length')
      break
    case "fabricTechnology":
      label = getSpecificLabel(PLPLabel, 'fabric_technology')
      break
    default:
      label = getSpecificLabel(PLPLabel, label)
      break
  }

  const selectedValues =
    selectedOption !== null && Array.isArray(selectedOption[title])
      ? selectedOption[title]
      : [];

  useEffect(() => {
    if (Array.isArray(showFilters) && showFilters.indexOf(title) !== -1) {
      setOpen(true);
    }
  }, []);

  const handleOpenAccordion = () => {
    let newValue = null;
    if (!open) {
      newValue = [...showFilters];
      newValue.push(title);
    } else {
      newValue = showFilters.filter((item) => item !== title);
    }
    dispatch(setShowFilters(newValue));
    setOpen((prev) => !prev);
  };

  const handleChangeOption = (e, selectedItem) => {
    const option = selectedItem?.name;
    const item = [option];
    const itemArray = selectedOption !== null ? selectedOption[title] : null; //check has in selected option
    if (itemArray) {
      const hasItem = itemArray.indexOf(option);
      if (hasItem !== -1) {
        // If has in array
        let newItem = [...itemArray];
        newItem.splice(hasItem, 1); // remove from array
        if (newItem.length === 0) {
          // if facet has no element
          const removeFilter = { ...selectedOption };
          delete removeFilter[title];
          dispatch(setSelectedOptions({ ...removeFilter }));
        } else {
          dispatch(
            setSelectedOptions({
              ...selectedOption,
              [title]: newItem,
            })
          );
        }
      } else {
        dispatch(
          setSelectedOptions({
            ...selectedOption,
            [title]: [...new Set([...itemArray, ...item])],
          })
        );
      }
    } else {
      dispatch(
        setSelectedOptions({
          ...selectedOption,
          [title]: item,
        })
      );
    }
  };

  if (
    !Array.isArray(options) ||
    (Array.isArray(options) && options.length === 0)
  ) {
    return null;
  }

  return (
    <>
      <div className="filter-section accordion">
        <div className="accordion-item" onClick={handleOpenAccordion}>
          <h4 className="accordion-title">
            {label}{" "}
            {selectedValues.length > 0 ? "(" + selectedValues.length + ")" : ""}
          </h4>
          <button className={`filter-btn ${open ? "active" : ""}`} />
        </div>
        <div className={open ? "accordion-content block" : "hidden"}>
          {title.toLowerCase() === "colorgroups" && (
            <FilterColorCheckbox
              label={label}
              options={options}
              selectedValues={selectedValues}
              handleChangeOption={handleChangeOption}
            />
          )}
          {title.toLowerCase() === "sizes" && (
            <FilterSizeCheckbox
              label={label}
              options={options}
              selectedValues={selectedValues}
              handleChangeOption={handleChangeOption}
            />
          )}
          {["colorgroups", "sizes", "categories"].indexOf(title.toLowerCase()) ===
            -1 && (
              <FilterCheckbox
                label={label}
                options={options}
                selectedValues={selectedValues}
                handleChangeOption={handleChangeOption}
              />
            )}
          {title.toLowerCase() === "categories" && (
            <FilterCategory
              label={label}
              options={options}
              selectedValues={selectedValues}
              handleChangeOption={handleChangeOption}
            />
          )}
        </div>
      </div>
      <hr />
    </>
  );
}

export default FilterItem;
