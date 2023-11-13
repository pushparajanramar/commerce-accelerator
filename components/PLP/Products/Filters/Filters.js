"use client";
import React from "react";
import FilterItem from "./FilterItem";
import { useDispatch, useSelector } from "react-redux";
import {
    resetFilter,
    setFilterOverlay,
} from "../../../../store/slices/PLPFilterSlice";
import { getSpecificLabel } from "../../../../lib/Common";
import { Button } from "../../../../components/Elements/Button";
import { selectPLPLabel } from "../../../../store/slices/labelsSlice";

function Filters() {
    const dispatch = useDispatch();
    const { options, totalResult } = useSelector(
        (state) => state.plpfilter
    );
    const PLPLabel = useSelector(selectPLPLabel)

    const handleCloseFilter = () => {
        dispatch(setFilterOverlay(false));
    };

    const handleClearAll = (e) => {
        e.preventDefault()
        dispatch(resetFilter())
        handleCloseFilter()
    }

    const handleViewResult = (e) => {
        e.preventDefault()
        handleCloseFilter()
    }
    const viewResultsLabel = getSpecificLabel(PLPLabel, 'view_results', 'View Results')
    return (
        <div className="plp-filter-section">
            <div className="filter-result-overlay">
                <div className="w1">
                    <h1>{getSpecificLabel(PLPLabel, 'filter', 'Filter')}</h1>
                    <button className="tm-close icon-md" onClick={handleCloseFilter} />
                </div>
                <div className="w2">
                    {Object.keys(options).map((item, key) => {
                        if (!["price_range"].includes(item)) {
                            return (
                                <FilterItem
                                    title={item}
                                    options={options[item]}
                                    key={"filter" + item.replace(/ /g, "_") + key}
                                />
                            );
                        }
                    })}
                </div>
                <div className="w3">
                    <Button
                        label={getSpecificLabel(PLPLabel, 'clear_all', 'Clear All')}
                        type='cta-black'
                        onClick={handleClearAll}
                        aria-label={getSpecificLabel(PLPLabel, 'clear_all', 'Clear All')}
                    ></Button>
                    <Button
                        label={totalResult && totalResult > 0 ? `${viewResultsLabel} (${totalResult})` : viewResultsLabel}
                        type='primary-black'
                        onClick={handleViewResult}
                        aria-label={viewResultsLabel}
                    ></Button>
                </div>
            </div>
            <div className="filter-overlay-bg"></div>
        </div>
    );
}

export default Filters;