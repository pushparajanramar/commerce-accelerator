"use client";
import React from "react";
import SizeCharts from "../PDPSizeCharts/SizeCharts";

function PDPColorAndSize({ codes, sizeCharts }) {
  return (
    <>
      {sizeCharts ? (
        <SizeCharts
          data={sizeCharts}
          categoryId={codes}
        />
      ) : null}
    </>
  );
}

export default PDPColorAndSize;
