"use client"
import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { setOptions } from '../../../../store/slices/PLPFilterSlice';
import PropType from "prop-types"
import ShowSelectedFilter from './ShowSelectedFilter';

function FilterNav({ facets, selectedFilter, sort }) {
    const dispatch = useDispatch();
    const showFilterOverlay = useSelector(state => state.plpfilter.showFilterOverlay)

    useEffect(() => {
        dispatch(setOptions(facets))
    }, [facets]);
    return (
        <div>
            {showFilterOverlay &&
                <div className="plp-filter-container">
                    <Filters />
                </div>
            }
            <ShowSelectedFilter />
        </div>
    );
}

FilterNav.propTypes = {
    facets: PropType.shape({
        [PropType.string]: PropType.arrayOf(PropType.shape({
            name: PropType.string.isRequired,
            count: PropType.number,
        }))
    })
}

export default FilterNav;