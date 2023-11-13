"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPDPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";

function PDPQuantity({ quantity, setQuantity }) {
  const [qty, setQty] = useState(quantity);
  const PDPLabels = useSelector(selectPDPLabel);
  const handleChange = (e, status) => {
    if (status === "minus") {
      setQty((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return prev;
      });
    } else if (status === "input") {
      setQty((prev) => {
        if (Number(e.target.value) <= 999) {
          if (Number(e.target.value) <= 0) {
            return 1;
          }
          return Number(e.target.value);
        }
        return prev;
      });
    } else if (status === "plus") {
      setQty((prev) => {
        if (Number(qty) >= 999) {
          return 999;
        }
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (quantity !== qty && setQuantity) {
      setQuantity(qty);
    }
  }, [qty, quantity]);

  return (
    <>
      <p className="p-sm">
        {getSpecificLabel(PDPLabels, "quantity", "Quantity")} :
      </p>
      <div className="w2 p-md">
        <button
          onClick={(e) => handleChange(e, "minus")}
          className="minus"
          disabled={qty <= 1}
        ></button>

        <input
          type="number"
          name="custom-input-number"
          value={qty}
          min={1}
          max={1000}
          onChange={(e) => handleChange(e, "input")}
        />

        <button
          onClick={(e) => handleChange(e, "plus")}
          className="plus"
          disabled={qty >= 999}
        ></button>
      </div>
    </>
  );
}

export default PDPQuantity;
