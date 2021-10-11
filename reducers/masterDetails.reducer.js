import * as actions from '../action-types/masterDetails.action.types';

/**
 * 
 */
const initialState = {
    type: actions.MASTERDETAILS_INIT,
    masterDetail: undefined,
    masterDetails: undefined,
    masterDetailsCategory: undefined,
    recordsCount: 0
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const masterDetailReducer = (state, action) => {
	if (!state || typeof action.type === 'undefined') {
		return initialState;
    }

	switch (action.type) {
        case actions.MASTERDETAILS_LIST_SUCCESS:
            return {
                masterDetail: state.masterDetail, 
                masterDetails: action.data,
                type: action.type,
                recordsCount: action.recordsCount
            };
           
        case actions.MASTERDETAILS_GET_BY_ID_SUCCESS:
            return {
                masterDetails: state.masterDetails, 
                masterDetail: action.data,
                type: action.type,
                recordsCount: state.recordsCount
            };

        case actions.MASTERDETAILS_SAVE_SUCCESS:
            return {
                masterDetail: action.data,
                masterDetails: state.masterDetails, 
                type: action.type,
                recordsCount: state.recordsCount
            };

        case actions.MASTERDETAILS_DELETE_SUCCESS:
            return {
                masterDetail: state.data,
                masterDetails: state.masterDetails, 
                type: action.type,
                recordsCount: state.recordsCount
            };

        case actions.MASTERDETAILS_INIT:
            return {
                masterDetail: state.masterDetail,
                masterDetails: state.masterDetails, 
                type: action.type,
                recordsCount: state.recordsCount
            };

		// important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
			return {
                type: state.type,
                masterDetail: state.masterDetail, 
                masterDetails: state.masterDetails,
                recordsCount: state.recordsCount
            };
        }
};

export default masterDetailReducer;