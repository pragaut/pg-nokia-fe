import * as actions from '../../action-types/comman/masterCategory.action.types';

/**
 * 
 */
const initialState = {
    type: actions.MASTERCATEGORY_INIT,
    masterCategory: undefined,
    masterCategorys: undefined,
    recordsCount: 0
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const masterCategoryReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case actions.MASTERCATEGORY_LIST_SUCCESS:
            return {
                masterCategory: state.masterCategory,
                masterCategorys: action.data,
                type: action.type,
                recordsCount: action.recordsCount
            };

        case actions.MASTERCATEGORY_GET_BY_ID_SUCCESS:
            return {
                masterCategorys: state.masterCategorys,
                masterCategory: action.data,
                type: action.type,
                recordsCount: state.recordsCount
            };

        // case actions.MASTERCATEGORY_GET_BY_CODE_SUCCESS:
        //     return {
        //         masterCategorys: state.masterCategorys,
        //         masterCategory: action.data,
        //         type: action.type,
        //         recordsCount: state.recordsCount
        //     };

        case actions.MASTERCATEGORY_SAVE_SUCCESS:
            return {
                masterCategory: action.data,
                masterCategorys: state.masterCategorys,
                type: action.type,
                recordsCount: state.recordsCount
            };

        case actions.MASTERCATEGORY_DELETE_SUCCESS:
            return {
                masterCategory: state.data,
                masterCategorys: state.masterCategorys,
                type: action.type,
                recordsCount: state.recordsCount
            };

        case actions.MASTERCATEGORY_INIT:
            return {
                masterCategory: state.masterCategory,
                masterCategorys: state.masterCategorys,
                type: action.type,
                recordsCount: state.recordsCount
            };

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                masterCategory: state.masterCategory,
                masterCategorys: state.masterCategorys,
                recordsCount: state.recordsCount
            };
    }
};

export default masterCategoryReducer;