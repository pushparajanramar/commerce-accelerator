import configuration from "../../../../constants/configuration";
import React, { Fragment } from "react";
import PropType from "prop-types"
function FilterSizeCheckbox({
  label,
  options,
  selectedValues,
  handleChangeOption,
}) {
  const labelId = label.replace(/ /g, "_");
  return (
    <ul className="size-chart">
      {options.map((item, index) => {
        const value = item.name === "size" ? item.value : item.name;
        if (!value || value == "null") {
          return null;
        }

        return (
          <Fragment key={"link-checkbox" + labelId + index}>
            {item.stock &&
              item.stock.stockLevelStatus === configuration.outOfStockStatus ? (
              <li
                key={"link-checkbox" + labelId + index}
                className={`filter-items  ${selectedValues.indexOf(value) !== -1 ? "selected" : ""
                  }`}
              >
                <div
                  className={`out-off-stock p-sm`}
                >
                  {value}
                </div>
                <hr />
              </li>
            ) : (
              <li
                key={"link-checkbox" + labelId + index}
                className={`filter-items  ${selectedValues.indexOf(value) !== -1 ? "selected" : ""
                  }`}
                onClick={(e) => handleChangeOption(e, item)}
              >
                <div
                  className={`in-stock p-sm`}
                >
                  {value}
                </div>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}

FilterSizeCheckbox.propTypes = {
  label: PropType.string,
  selectedValues: PropType.array,
  options: PropType.arrayOf(PropType.shape({
    id: PropType.string,
    name: PropType.string,
    code: PropType.string,
    stock: PropType.shape({
      stockLevelStatus: PropType.string
    }),
  })),
  handleChangeOption: PropType.func,
}

export default FilterSizeCheckbox;
