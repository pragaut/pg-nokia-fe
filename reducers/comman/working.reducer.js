import { startOfYesterday } from 'date-fns';
import * as actions from '../../action-types/comman/working.action.types';


/**
 * 
 */
const initialState = {   

};


/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const workingReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }
    //console.log("action.type", action.type);
    switch (action.type) {

        //#region  Final Audit Section Details
       
        //#endregion

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

      

            };
    }
};

export default workingReducer;