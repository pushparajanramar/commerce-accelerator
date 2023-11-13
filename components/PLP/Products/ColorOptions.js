"use client";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import SingleImage from "./SingleImage";
import { selectPLPLabel } from "../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../lib/Common";
import { useSelector } from "react-redux";

function ColorOptions({ options, handleChangeImageBasedOnColor, productUrl, viewport }) {
    const [showColor, setShowColor] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const PLPLabels = useSelector(selectPLPLabel)
    const moreBtnLabel = getSpecificLabel(PLPLabels, 'more', "more")


    const handleClick = (colorItem, position) => {
        if (colorItem.code !== options[selectedColor]?.code) {
            handleChangeImageBasedOnColor(colorItem, "in");
            setSelectedColor(position);
        }
    };

    const showHide = viewport === 'desktop' ? 8 : 5
    const totalShowColor = options && (options.length > (showHide * 2)) ? (showHide * 2) - 1 : (showHide * 2)

    return (
        <ul className={`color-options ${showColor ? "expanded" : "limited"} `}>
            {options?.slice(0, totalShowColor).map((item, index) => (
                <li key={"color" + item.code + index}
                    className={`colors-list ${(index > (showHide - 2) && options.length > showHide && !showColor) ? 'hidden' : ''}`}>
                    <Link
                        href="javascript:void(0)"
                        className={`option-link ${index === selectedColor ? "selected" : ""}`}
                        onClick={() => handleClick(item, index)}
                    >
                        {item.hexCode ?
                            <div className={`color-checkbox`} style={{ backgroundColor: item.hexCode }}>
                            </div>
                            :
                            <SingleImage
                                src={item.media.url}
                                alt={item?.media?.altText ?? item.value}
                                width={24}
                                height={24}
                                notshowdefaultimg="true"
                                extraClass=""
                            />
                        }
                    </Link>
                </li>
            ))}

            {options.length > showHide && !showColor && (
                <li className={`color-more-btn ${viewport}`}>
                    <button type="button" onClick={() => setShowColor(true)}>
                        +{moreBtnLabel}
                    </button>
                </li>
            )}
            {options.length > totalShowColor && (
                <li className={`color-more-next-btn ${showColor ? 'block' : 'hidden'}`}>
                    <Link href={productUrl}>
                        +{moreBtnLabel}
                    </Link>
                </li>
            )}

        </ul>
    );
}

ColorOptions.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            code: PropTypes.string,
            stock: PropTypes.shape({
                stockLevelStatus: PropTypes.string,
            }),
            url: PropTypes.string,
            value: PropTypes.string,
            hexCode: PropTypes.string,
            media: PropTypes.shape({
                altText: PropTypes.string,
                isVideoMedia: PropTypes.bool,
                url: PropTypes.string,
            }),
        })
    ),
    productUrl: PropTypes.string
};

export default ColorOptions;