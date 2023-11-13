import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    PLP: {},
    PDP: {},
    header: {},
    footer: {},
    sizeChart: {},
    formValidation: {},
    responseCode: {},
    screenReader: {},
    userAuthModal: {},
};

export const LabelsSlice = createSlice({
    name: 'pageLabels',
    initialState,
    reducers: {
        setAllLabels(state, action) {
            if (action.payload.PLP) {
                state.PLP = action.payload.PLP;
            }
            if (action.payload.PDP) {
                state.PDP = action.payload.PDP;
            }
            if (action.payload.header) {
                state.header = action.payload.header;
            }
            if (action.payload.footer) {
                state.footer = action.payload.footer;
            }
            if (action.payload.sizeChart) {
                state.sizeChart = action.payload.sizeChart;
            }
            if (action.payload.formValidation) {
                state.formValidation = action.payload.formValidation;
            }
            if (action.payload.responseCode) {
                state.responseCode = action.payload.responseCode;
            }
            if (action.payload.screenReader) {
                state.screenReader = action.payload.screenReader;
            }
            if (action.payload.userAuthModal) {
                state.userAuthModal = action.payload.userAuthModal;
            }
        },
        resetLabels(state, action) {
            state = initialState
        },
    }
});




export const { setAllLabels, resetLabels } = LabelsSlice.actions;

export const selectPLPLabel = (state) => state.pageLabels.PLP;
export const selectPDPLabel = (state) => state.pageLabels.PDP;
export const selectHeaderLabel = (state) => state.pageLabels.header;
export const selectFooterLabel = (state) => state.pageLabels.footer;
export const selectSizeChartLabel = (state) => state.pageLabels.sizeChart;
export const selectFormValidationMessage = (state) => state.pageLabels.formValidation;
export const selectResponseCodeMessage = (state) => state.pageLabels.responseCode;
export const selectScreenReaderMessage = (state) => state.pageLabels.screenReader;
export const selectUserAuthModal = (state) => state.pageLabels.userAuthModal;

export default LabelsSlice;