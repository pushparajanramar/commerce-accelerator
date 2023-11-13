import React from "react";
import PDPQuantity from "./PDPQuantity";
import PDPInventoryLevel from "./PDPInventoryLevel";

function PDPInventoryLevelAndQuantity({
  quantity,
  setQuantity,
  stockLevel,
  stockQty,
}) {
  return (
    <>
      <PDPQuantity quantity={quantity} setQuantity={setQuantity} />
      <PDPInventoryLevel stockLevel={stockLevel} stockQty={stockQty} />
    </>
  );
}

export default PDPInventoryLevelAndQuantity;
