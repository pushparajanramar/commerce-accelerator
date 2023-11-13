"use client";
import React from "react";
import { Button } from "../../Elements/Button";
import { useSelector } from "react-redux";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";

const RelatedCategories = ({ relatedCategories }) => {
  const PLPLabels = useSelector(selectPLPLabel)

  return (
    <div className="related-items-categories">
      <h2>{getSpecificLabel(PLPLabels, 'related_categories', 'Related Categories')}</h2>
      <div className="items-categories-details">
        {relatedCategories?.length > 0 &&
          relatedCategories?.map((item, index) => (
            <ul key={'rl-categories' + index}>
              <li>
                <Button
                  className="cta-button p-sm"
                  url={item.url}
                  label={item.title}
                  type={"primary-white"}
                ></Button>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default RelatedCategories;
