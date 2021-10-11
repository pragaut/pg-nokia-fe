import * as actions from '../action-types/masterDetails.action.types';

/**
 * 
 */
const initialState = {
    type: actions.MASTERDETAILS_MASTERCATEGORYID_INIT,
    masterDetailCategory: undefined,
    masterDetailsCategory: undefined,
    masterCode: undefined,
    recordsCount: 0
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const masterDetailByCategoryReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }
    
    switch (action.type) {
        case actions.MASTERDETAILS_GET_BY_MASTERCATEGORYID_SUCCESS:
            return {
                masterDetailCategory: state.masterDetailCategory,
                masterDetailsCategory: action.data,
                type: action.type,
                recordsCount: action.recordsCount,
                masterCode: action.masterCode
            };

        case actions.MASTERDETAILS_MASTERCATEGORYID_INIT:
            return {
                masterDetailCategory: state.masterDetailCategory,
                masterDetailsCategory: state.masterDetailsCategory,
                type: action.type,
                recordsCount: state.recordsCount,
                masterCode: action.masterCode
            };

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                masterDetailCategory: state.masterDetailCategory,
                masterDetailsCategory: state.masterDetailsCategory,
                recordsCount: state.recordsCount,
                masterCode: action.masterCode
            };
    }
};

export default masterDetailByCategoryReducer;