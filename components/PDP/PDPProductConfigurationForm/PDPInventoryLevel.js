"use client";
import { useSelector } from "react-redux";
import configuration from "../../../constants/configuration";
import React from "react";
import { selectPDPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";

function PDPInventoryLevel({ stockLevel, stockQty }) {
  const PDPLabels = useSelector(selectPDPLabel);
  const lowStockLocaleMsg = getSpecificLabel(
    PDPLabels,
    "low_inventory_message",
    "Only {inventory} left!"
  );
  const lowStockMsg = lowStockLocaleMsg.replaceAll(/{inventory}/gi, stockQty);
  return (
    <>
      {stockLevel === configuration.lowStockStatus && stockQty >= 0 && (
        <p className="stock-notification p-sm">{lowStockMsg}</p>
      )}
    </>
  );
}

export default PDPInventoryLevel;
