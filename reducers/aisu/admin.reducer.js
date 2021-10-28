import * as actions from '../../action-types/aisu/admin.action.types';

/**
 * 
 */
const initialState = {
    type: actions.TOWERANTENNASMASTER_INIT,
    recordsCount: 0,
 

    towerAntennasActiontype: actions.TOWERANTENNASMASTER_INIT,
    towerAntennas: undefined,
    towerAntennass: undefined,
    towerAntennasRecordsCount: 0, 
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

 
        //#region  Tower Antennas Master Reducer

        case actions.TOWERANTENNASMASTER_LIST_SUCCESS:
            return {
                towerAntennas: state.towerAntennas,
                towerAntennass: action.data,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: action.recordsCount,

            };

        case actions.TOWERANTENNASMASTER_GET_BY_ID_SUCCESS:
            return {
                towerAntennass: state.towerAntennass,
                towerAntennas: action.data,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_SAVE_SUCCESS:
            return {
                towerAntennas: action.data,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_DELETE_SUCCESS:
            return {
                towerAntennas: state.data,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_INIT:
            return {
                towerAntennas: state.towerAntennas,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        //#endregion
      
        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount, 

                towerAntennas: state.towerAntennas,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: state.towerAntennasActiontype,
                towerAntennasRecordsCount: state.towerAntennasRecordsCount, 
            };
    }
};

export default adminReducer;