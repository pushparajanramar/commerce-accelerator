"use client";
import React, { useEffect, useState } from "react";
import FilterSizeCheckbox from "./Filters/FilterSizeCheckbox";
import { Button } from "../../Elements/Button";
import { useSelector } from "react-redux";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";
import HandOptions from "./HandOptions";

function QuickAdd({
  showSizeLoaderBtn,
  showSizeOption,
  sizeVariants,
  handleSizeClickOption,
  handleShowSizeOption,
  isGloveProduct = false,
  handOptions,
}) {
  const PLPLabels = useSelector(selectPLPLabel);
  const [visibleSizes, setVisibleSizes] = useState(true);
  const [selectHandOption, setSelectHandOption] = useState(null);
  const [sizes, setSizes] = useState(sizeVariants);

  const handleClickOfHandOptions = (item) => {
    setSelectHandOption(item);
    const newSizes = sizeVariants?.filter((ele) => {
      return ele.code.search(new RegExp(`_${item}_`, "g")) !== -1;
    });
    setSizes(newSizes);
    setVisibleSizes(true);
  };

  useEffect(() => {
    if (isGloveProduct) {
      setVisibleSizes(false);
    }
  }, [isGloveProduct]);

  return (
    <div
      className="quick-add"
      onMouseEnter={() => handleShowSizeOption(true)}
      onMouseLeave={() => handleShowSizeOption(false)}
    >
      {showSizeLoaderBtn ? (
        <p>{getSpecificLabel(PLPLabels, "loading", "Loading...")}</p>
      ) : (
        <>
          {!showSizeOption && (
            <Button
              className="product-name add-button"
              label={`${getSpecificLabel(PLPLabels, "quick_add", "Quick Add")}`}
              type="primary-white"
            ></Button>
          )}
          {showSizeOption && sizeVariants && (
            <>
              {isGloveProduct && (
                <div className="size-swatch">
                  <label className="p-sm">
                    {getSpecificLabel(PLPLabels, "hand")}
                  </label>
                  <HandOptions
                    options={handOptions}
                    selectedValues={[selectHandOption]}
                    handleChangeOption={handleClickOfHandOptions}
                  />
                </div>
              )}
              {visibleSizes && (
                <div className="size-swatch">
                  {isGloveProduct && (
                    <label className="p-sm">
                      {getSpecificLabel(PLPLabels, "size")}
                    </label>
                  )}
                  <FilterSizeCheckbox
                    label={"plp"}
                    options={sizes}
                    selectedValues={[]}
                    handleChangeOption={handleSizeClickOption}
                  />
                </div>
              )}
            </>
          )}
          {showSizeOption && sizeVariants.length === 0 && (
            <span className="no-size-found p-xs">
              {getSpecificLabel(PLPLabels, "no_sizes_found", "No Sizes Found")}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default QuickAdd;
