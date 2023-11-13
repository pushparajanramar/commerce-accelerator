"use client"
import { resetFilter, setFilterOverlay } from '../../../../store/slices/PLPFilterSlice';
import Link from 'next/link';
import React from 'react';
import PropType from "prop-types"
import { useDispatch, useSelector } from 'react-redux';

function FilterCategory({ options }) {
    const dispatch = useDispatch();
    const { selected, sort } = useSelector(state => state.plpfilter)
    const queryString = `${selected && Object.keys(selected).length > 0 ? 'fq=' + JSON.stringify(selected) : ''}${sort ? '&sort=' + sort : ''}`

    const handleClick = (item) => {
        const isShopAll = item.name?.toLowerCase() === 'shop all'
        if (isShopAll) {
            dispatch(resetFilter())
        }
        dispatch(setFilterOverlay(false))
    }

    return (
        <ul className='category-options'>
            {options.map((item, index) => {
                const isShopAll = item.name?.toLowerCase() === 'shop all'
                const categoryLink = item.url + (queryString && !isShopAll ? '?' + queryString : '')
                return <li key={'categoryLink' + item.id + index}>
                    <Link className='p-sm' onClick={() => handleClick(item)} href={categoryLink}>{item.name}</Link>
                </li>
            })}
        </ul>
    );
}

FilterCategory.propTypes = {
    options: PropType.arrayOf(PropType.shape({
        id: PropType.string,
        name: PropType.string,
        count: PropType.number,
    }))
}


export default FilterCategory;