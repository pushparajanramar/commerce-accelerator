import React, { useState } from "react";

export const Checkbox = ({ label, type, ...props }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <>
      <div className="tm-checkbox">
        <ul>
          <li>
            <div
              role="checkbox"
              aria-checked={checked}
              tabIndex="0"
              onClick={handleCheckboxChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCheckboxChange();
                }
              }}
            >
              {label}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
