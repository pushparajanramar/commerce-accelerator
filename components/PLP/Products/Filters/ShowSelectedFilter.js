"use client"
import { resetFilter, setFilterOverlay, setSelectedOptions } from '../../../../store/slices/PLPFilterSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPLPLabel } from "../../../../store/slices/labelsSlice";
import { getSpecificLabel } from "../../../../lib/Common";
import SortOptions from './SortOptions';

function ShowSelectedFilter({ }) {
    const { selected: selectedOptions, showFilterOverlay } = useSelector(state => state.plpfilter)
    const dispatch = useDispatch();
    const allOptions = selectedOptions ? Object.entries(selectedOptions) : []
    const PLPLabel = useSelector(selectPLPLabel)

    const handleRemoveOption = (label, value) => {
        const itemArray = selectedOptions !== null ? selectedOptions[label] : null; //check has in selected option
        if (itemArray) {
            const hasItem = itemArray.indexOf(value)
            if (hasItem !== -1) { // If has in array
                let newItem = [...itemArray]
                newItem.splice(hasItem, 1) // remove from array
                if (newItem.length === 0) { // if facet has no element 
                    const removeFilter = { ...selectedOptions }
                    delete removeFilter[label]
                    dispatch(setSelectedOptions({ ...removeFilter }))
                } else {
                    dispatch(setSelectedOptions({
                        ...selectedOptions,
                        [label]: newItem
                    }))
                }
            }
        }

    }


    const handleResetFilter = () => {
        dispatch(resetFilter())
    }

    const handleToggleFilter = () => {
        const toggleValue = showFilterOverlay ? false : true
        dispatch(setFilterOverlay(toggleValue))
    }

    return (
        <div className='filters-section tm-width'>
            <div className="w1">
                <button type='button' className='w2' onClick={handleToggleFilter}>
                    <p className='p-sm'>{getSpecificLabel(PLPLabel, 'filter', 'Filter')}</p>
                    <i className='filter-icon'></i>
                </button>
                <ul>
                    {allOptions.map((value, index) => {
                        const label = value[0]
                        return value[1].map((item, key) => {
                            if (item === 'color_groups') {
                                item = 'Color'
                            }
                            const labelId = item.replace(/ /g, "_")
                            return <li key={'selectedOption' + labelId + index + key}>
                                <p className="p-sm">{item}</p>
                                <button type="button" className='clear-option' onClick={() => handleRemoveOption(label, item)}>
                                </button>
                            </li>
                        })
                    })}
                    {allOptions.length > 0 &&
                        <li key={'clearAllBtn'}>
                            <p className="p-sm">{getSpecificLabel(PLPLabel, 'clear_all', 'Clear All')}</p>
                            <button type="button" className='clear-option' onClick={handleResetFilter}>
                            </button>
                        </li>
                    }
                </ul>
            </div>
            <div className='sort-by-options'>
                <SortOptions />
            </div>
        </div>

    );
}

export default ShowSelectedFilter;