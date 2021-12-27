import { startOfYesterday } from 'date-fns';
import * as actions from '../../action-types/tmc/working.action.types';


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

        //#region  TMC Details 
            // case actions.DEVICELOCATIONDETAILS_LIST_SUCCESS:
            //     return {
            //         deviceLocationDetail: state.deviceLocationDetail,
            //         deviceLocationDetails: action.data,
            //         deviceLocationDetailActiontype: action.type,
            //         deviceLocationDetailRecordsCount: action.recordsCount,
    
            //         type: action.type,
            //     };

                case actions.DEVICEMAPPINGDETAILS_LIST_SUCCESS:
                return {
                    deviceMappingDetail: state.deviceMappingDetail,
                    deviceMappingDetails: action.data,
                    deviceMappingDetailActiontype: action.type,
                    deviceMappingDetailRecordsCount: action.recordsCount,
    
                    type: action.type,
                };

                case actions.TOWERNOTIFICATIONDETAILS_LIST_SUCCESS:
                return {
                    towerNotificationDetail: state.towerNotificationDetail,
                    towerNotificationDetails: action.data,
                    towerNotificationDetailActiontype: action.type,
                    towerNotificationDetailRecordsCount: action.recordsCount,
    
                    type: action.type,
                };

                case actions.TOWERNOTIFICATIONDETAILS_SAVE_SUCCESS:
                return {
                    towerNotificationDetail: action.data,
                    towerNotificationDetails: state.alarms,
                    towerNotificationDetailActiontype: action.type,
                    towerNotificationDetailRecordsCount: state.recordsCount,
            };
        //#endregion

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

                // deviceLocationDetail: state.deviceLocationDetail,
                // deviceLocationDetails: state.deviceLocationDetails,
                // deviceLocationDetailActiontype: state.deviceLocationDetailActiontype,
                // deviceLocationDetailRecordsCount: state.deviceLocationDetailRecordsCount, 

                deviceMappingDetail: state.deviceMappingDetail,
                deviceMappingDetails: state.deviceMappingDetails,
                deviceMappingDetailActiontype: state.deviceMappingDetailActiontype,
                deviceMappingDetailRecordsCount: state.deviceMappingDetailRecordsCount, 

                towerNotificationDetail: state.towerNotificationDetail,
                towerNotificationDetails: state.towerNotificationDetails,
                towerNotificationDetailActiontype: state.towerNotificationDetailActiontype,
                towerNotificationDetailRecordsCount: state.towerNotificationDetailRecordsCount,

            };
    }
};

export default workingReducer;