import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loader: false,
    options: {},
    selected: null,
    sort: null,
    showfilters: [],
    showFilterOverlay: false,
    retrieveProduct: false,
    totalResult: 0,
};

export const PLPFilterSlice = createSlice({
    name: 'plpfilter',
    initialState,
    reducers: {
        setOptions(state, action) {
            state.options = action.payload;
        },
        setSelectedOptions(state, action) {
            state.selected = action.payload;
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
        setShowFilters(state, action) {
            state.showfilters = action.payload;
        },
        setCallProductRequest(state, action) {
            state.retrieveProduct = action.payload;
        },
        setFilterOverlay(state, action) {
            state.showFilterOverlay = action.payload;
        },
        setSortBy(state, action) {
            state.sort = action.payload;
        },
        setTotalResult(state, action) {
            if (!isNaN(action.payload)) {
                state.totalResult = Number(action.payload)
            }
        },
        resetFilter(state, action) {
            if (state.selected) {
                state.selected = {};
            } else {
                state.selected = null;
            }
            state.showfilters = initialState.showfilters;
        }
    }
});




export const { setOptions, setLoader, setSelectedOptions, setShowFilters, setCallProductRequest, resetFilter, setFilterOverlay, setSortBy, setTotalResult } = PLPFilterSlice.actions;

export default PLPFilterSlice;
