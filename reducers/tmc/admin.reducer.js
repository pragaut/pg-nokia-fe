import * as actions from '../../action-types/tmc/admin.action.types';

/**
 * 
 */
const initialState = {
    type: actions.TOWERMASTER_INIT,
    recordsCount: 0,

  
    towerActiontype: actions.TOWERMASTER_INIT,
    tower: undefined,
    towers: undefined,
    towerRecordsCount: 0,

    towerAllotmentActiontype: actions.TOWERALLOTMENTMASTER_INIT,
    towerAllotment: undefined,
    towerAllotments: undefined,
    towerAllotmentRecordsCount: 0,

};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const adminReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }

    switch (action.type) {

  
        //#region  Tower Master Reducer

        case actions.TOWERMASTER_LIST_SUCCESS:
            return {
                tower: state.tower,
                towers: action.data,
                towerActiontype: action.type,
                towerRecordsCount: action.recordsCount,

            };

        case actions.TOWERMASTER_GET_BY_ID_SUCCESS:
            return {
                towers: state.towers,
                tower: action.data,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_SAVE_SUCCESS:
            return {
                tower: action.data,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_DELETE_SUCCESS:
            return {
                tower: state.data,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_INIT:
            return {
                tower: state.tower,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        //#endregion

        //#region  Tower Allotment Master Reducer

        case actions.TOWERALLOTMENTMASTER_LIST_SUCCESS:
            return {
                towerAllotment: state.towerAllotment,
                towerAllotments: action.data,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: action.recordsCount,

            };

        case actions.TOWERALLOTMENTMASTER_GET_BY_ID_SUCCESS:
            return {
                towerAllotments: state.towerAllotments,
                towerAllotment: action.data,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_SAVE_SUCCESS:
            return {
                towerAllotment: action.data,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_DELETE_SUCCESS:
            return {
                towerAllotment: state.data,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_INIT:
            return {
                towerAllotment: state.towerAllotment,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        //#endregion
  
        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

                tower: state.tower,
                towers: state.towers,
                towerActiontype: state.towerActiontype,
                towerRecordsCount: state.towerRecordsCount,

                towerAllotment: state.towerAllotment,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: state.towerAllotmentActiontype,
                towerAllotmentRecordsCount: state.towerAllotmentRecordsCount,
            };
    }
};

export default adminReducer;