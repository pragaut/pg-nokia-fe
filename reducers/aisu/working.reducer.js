import { startOfYesterday } from 'date-fns';
import * as actions from '../../action-types/aisu/working.action.types';


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

        //#region  Antenna Rotation Details
        case actions.ANTENNAROTATIONDETAILS_LIST_SUCCESS:
            return {
                antennaRotationDetail: state.antennaRotationDetail,
                antennaRotationDetails: action.data,
                antennaRotationDetailActiontype: action.type,
                antennaRotationDetailRecordsCount: action.recordsCount,

                type: action.type,  
            }; 
        //#endregion
         //#region  Antenna Rotation Detail Logs
         case actions.ANTENNAROTATIONDETAILLOGS_LIST_SUCCESS:
            return {
                antennaRotationDetailLog: state.antennaRotationDetailLog,
                antennaRotationDetailLogs: action.data,
                antennaRotationDetailLogActiontype: action.type,
                antennaRotationDetailLogRecordsCount: action.recordsCount,

                type: action.type,  
            }; 
        //#endregion

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount, 

                antennaRotationDetail: state.antennaRotationDetail,
                antennaRotationDetail: state.antennaRotationDetails,
                antennaRotationDetailActiontype: state.antennaRotationDetailActiontype,
                antennaRotationDetailRecordsCount: state.antennaRotationDetailRecordsCount,

                antennaRotationDetailLog: state.antennaRotationDetailLog,
                antennaRotationDetailLogs: state.antennaRotationDetailLog,
                antennaRotationDetailLogActiontype: state.antennaRotationDetailLogActiontype,
                antennaRotationDetailLogRecordsCount: state.antennaRotationDetailLogRecordsCount

            };
    }
};

export default workingReducer;