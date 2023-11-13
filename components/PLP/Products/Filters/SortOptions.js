"use client"

import { setSortBy } from '../../../../store/slices/PLPFilterSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPLPLabel } from '../../../../store/slices/labelsSlice';
import { getSpecificLabel } from '../../../../lib/Common';

function SortOptions(props) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const dispatch = useDispatch();
    const sortValue = useSelector(state => state.plpfilter.sort)
    const PLPLabel = useSelector(selectPLPLabel)

    const optionsList = [
        { name: getSpecificLabel(PLPLabel, 'relevance', "Relevance"), code: "Relevance", sort: null },
        { name: getSpecificLabel(PLPLabel, 'name_ascending_', "Name (Ascending)"), code: "NameAsc", sort: "title asc" },
        { name: getSpecificLabel(PLPLabel, 'name_ascending_', "Name (Descending)"), code: "NameDes", sort: "title desc" },
        { name: getSpecificLabel(PLPLabel, 'price_lowest_first_', "Price (Lowest First)"), code: "PriceLow", sort: "price asc" },
        { name: getSpecificLabel(PLPLabel, 'price_highest_first_', "Price (Highest First)"), code: "PriceHigh", sort: "price desc" },
        { name: getSpecificLabel(PLPLabel, 'best_seller', "Best Seller"), code: "week_selling_count", sort: "week_selling_count desc" },
        { name: getSpecificLabel(PLPLabel, 'newest', "Newest"), code: "Newest", sort: "approved_date desc" },
        { name: getSpecificLabel(PLPLabel, 'top_rated', "Top Rated"), code: "TopRated", sort: "average_overall_rating desc" },
    ];

    const setSelectedThenCloseDropdown = (index) => {
        handleSelectOption(index);
        setIsOptionsOpen(false);
    };



    useEffect(() => {
        if (sortValue !== optionsList[selectedOption].sort) {
            const indexValue = optionsList.findIndex(item => item.sort == sortValue);
            setSelectedOption(indexValue);
        }
    }, [sortValue, selectedOption])

    const handleSelectOption = (index) => {
        setSelectedOption(index);
        setIsOptionsOpen(false);
        const _sortValue = optionsList[index].sort;
        dispatch(setSortBy(_sortValue));
    }

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const handleKeyDown = (index) => (e) => {
        switch (e.key) {
            case " ":
            case "SpaceBar":
            case "Enter":
                e.preventDefault();
                handleSelectOption(index);
                break;
            default:
                break;
        }
    };


    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                handleSelectOption(
                    selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                handleSelectOption(
                    selectedOption == optionsList.length - 1 ? 0 : selectedOption + 1
                );
                break;
            default:
                break;
        }
    };

    return (
        <div className="sort-by-selector p-xs" onMouseLeave={() => setIsOptionsOpen(false)}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOptionsOpen}
                className={`sort-button ${isOptionsOpen ? "expanded" : ""}`}
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
            >
                {optionsList[selectedOption]?.name}
            </button>
            <ul
                className={`options ${isOptionsOpen ? "show" : ""}`}
                role="listbox"
                aria-activedescendant={optionsList[selectedOption]?.name}
                tabIndex={-1}
                onKeyDown={handleListKeyDown}
            >
                {optionsList.map((option, index) =>
                    selectedOption !== index ? (
                        <li
                            className={`sort-option`}
                            id={`option-${option.code}`}
                            key={`option-${option.code}`}
                            role="option"
                            aria-selected={selectedOption == index}
                            tabIndex={0}
                            onKeyDown={handleKeyDown(index)}
                            onClick={() => {
                                handleSelectOption(index);
                            }}
                        >
                            {option.name}
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
}

export default SortOptions;