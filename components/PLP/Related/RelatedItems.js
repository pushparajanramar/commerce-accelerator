"use client"
import React from "react";
import { Button } from "../../Elements/Button";
import { useSelector } from "react-redux";
import { selectPLPLabel } from '../../../store/slices/labelsSlice'
import { getSpecificLabel } from '../../../lib/Common'

const RelatedItems = ({ relatedItems }) => {
  const PLPLabels = useSelector(selectPLPLabel)

  return (
    <div className="related-items-categories">
      <h2>{getSpecificLabel(PLPLabels, 'related_items', 'Related Items')}</h2>
      <div className="items-categories-details">
        {relatedItems?.length > 0 &&
          relatedItems?.map((item, index) => (
            <ul key={'rl-items' + index}>
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

export default RelatedItems;
