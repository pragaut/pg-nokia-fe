import { startOfYesterday } from 'date-fns';
import * as actions from '../../action-types/tmc/working.action.types';


/**
 * 
 */
const initialState = {
    type: actions.DEVICEBATTERYSTATUS_INIT,
    recordsCount: 0,

    deviceBatteryStatustype: actions.DEVICEBATTERYSTATUS_INIT,
    deviceBatteryStatus: undefined,
    deviceBatteryStatuss: undefined,
    deviceBatteryStatusRecordsCount: 0,

    deviceBatteryStatusLogtype: actions.DEVICEBATTERYSTATUSLOG_INIT,
    deviceBatteryStatusLog: undefined,
    deviceBatteryStatusLogs: undefined,
    deviceBatteryStatusLogRecordsCount: 0,

    towerMonitoringDetailtype: actions.TOWERMONITORINGDETAILS_INIT,
    towerMonitoringDetail: undefined,
    towerMonitoringDetails: undefined,
    towerMonitoringDetailRecordsCount: 0,

    deviceStatusDetailtype: actions.DEVICESTATUSDETAILS_INIT,
    deviceStatusDetail: undefined,
    deviceStatusDetails: undefined,
    deviceStatusDetailRecordsCount: 0,

    networkConnectivityStatuDetailtype: actions.NETWORKCONNECTIVITYSTATUSDETAILS_INIT,
    networkConnectivityStatuDetail: undefined,
    networkConnectivityStatuDetails: undefined,
    networkConnectivityStatuDetailRecordsCount: 0,

    towerMonitoringSubDetailtype: actions.TOWERMONITORING_SUBDETAILS_INIT,
    towerMonitoringSubDetail: undefined,
    towerMonitoringSubDetails: undefined,
    towerMonitoringSubDetailRecordsCount: 0,

    deviceMappingDetail: actions.DEVICEMAPPINGDETAILS_INIT,
    deviceMappingDetails: undefined,
    deviceMappingDetailActiontype: undefined,
    deviceMappingDetailRecordsCount: 0,

    towerNotificationDetail: actions.TOWERNOTIFICATIONDETAILS_INIT,
    towerNotificationDetails: undefined,
    towerNotificationDetailActiontype: undefined,
    towerNotificationDetailRecordsCount: 0,

    towerActiveDetail: actions.TOWERACTIVESTATUS_INIT,
    towerActiveDetails: undefined,
    towerActiveDetailActiontype: undefined,
    towerActiveDetailRecordsCount: 0,
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

        //#region  TMC Details  -- Battery Status
        case actions.DEVICEBATTERYSTATUS_LIST_SUCCESS:
            return {
                deviceBatteryStatus: state.deviceBatteryStatus,
                deviceBatteryStatuss: action.data,
                deviceBatteryStatustype: action.type,
                deviceBatteryStatusRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.DEVICEBATTERYSTATUS_INIT:
            return {
                deviceBatteryStatus: state.deviceBatteryStatus,
                deviceBatteryStatuss: state.deviceBatteryStatuss,
                deviceBatteryStatustype: action.type,
                deviceBatteryStatusRecordsCount: state.deviceBatteryStatusRecordsCount,

                type: action.type
            };

            case actions.DEVICEBATTERYSTATUSLOG_LIST_SUCCESS:
                return {
                    deviceBatteryStatusLog: state.deviceBatteryStatusLog,
                    deviceBatteryStatusLogs: action.data,
                    deviceBatteryStatusLogtype: action.type,
                    deviceBatteryStatusLogRecordsCount: action.recordsCount,
    
                    type: action.type,
                };
            case actions.DEVICEBATTERYSTATUSLOG_INIT:
                return {
                    deviceBatteryStatusLog: state.deviceBatteryStatusLog,
                    deviceBatteryStatusLogs: state.deviceBatteryStatusLogs,
                    deviceBatteryStatusLogtype: action.type,
                    deviceBatteryStatusLogRecordsCount: state.deviceBatteryStatusLogRecordsCount,
    
                    type: action.type
                };
        //#endregion


        //#region  Tower Monitoring Details -- Tower Monitoring Details data
        case actions.TOWERMONITORINGDETAILS_LIST_SUCCESS:
            return {
                towerMonitoringDetail: state.towerMonitoringDetail,
                towerMonitoringDetails: action.data,
                towerMonitoringDetailtype: action.type,
                towerMonitoringDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.TOWERMONITORINGDETAILS_INIT:
            return {
                towerMonitoringDetail: state.towerMonitoringDetail,
                towerMonitoringDetails: state.towerMonitoringDetails,
                towerMonitoringDetailtype: action.type,
                towerMonitoringDetailRecordsCount: state.towerMonitoringDetailRecordsCount,

                type: action.type
            };
        //#endregion

        //#region  Tower Monitoring Details -- Device Status
        case actions.DEVICESTATUSDETAILS_LIST_SUCCESS:
            return {
                deviceStatusDetail: state.deviceStatusDetail,
                deviceStatusDetails: action.data,
                deviceStatusDetailtype: action.type,
                deviceStatusDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.DEVICESTATUSDETAILS_INIT:
            return {
                deviceStatusDetail: state.deviceStatusDetail,
                deviceStatusDetails: state.deviceStatusDetails,
                deviceStatusDetailtype: action.type,
                deviceStatusDetailRecordsCount: state.deviceStatusDetailRecordsCount,

                type: action.type
            };
        //#endregion
        //#region  Tower Monitoring Details -- Network  Connectivity
        case actions.NETWORKCONNECTIVITYSTATUSDETAILS_LIST_SUCCESS:
            return {
                networkConnectivityStatuDetail: state.networkConnectivityStatuDetail,
                networkConnectivityStatuDetails: action.data,
                networkConnectivityStatuDetailtype: action.type,
                networkConnectivityStatuDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.NETWORKCONNECTIVITYSTATUSDETAILS_INIT:
            return {
                networkConnectivityStatuDetail: state.networkConnectivityStatuDetail,
                networkConnectivityStatuDetails: state.networkConnectivityStatuDetails,
                networkConnectivityStatuDetailtype: action.type,
                networkConnectivityStatuDetailRecordsCount: state.networkConnectivityStatuDetailRecordsCount,

                type: action.type
            };
        //#endregion
        //#region  Tower Monitoring Details -- Tower Monitoring Sub Details
        case actions.TOWERMONITORING_SUBDETAILS_LIST_SUCCESS:
            return {
                towerMonitoringSubDetail: state.towerMonitoringSubDetail,
                towerMonitoringSubDetails: action.data,
                towerMonitoringSubDetailtype: action.type,
                towerMonitoringSubDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.TOWERMONITORING_SUBDETAILS_INIT:
            return {
                towerMonitoringSubDetail: state.towerMonitoringSubDetail,
                towerMonitoringSubDetails: state.towerMonitoringSubDetails,
                towerMonitoringSubDetailtype: action.type,
                towerMonitoringSubDetailRecordsCount: state.towerMonitoringSubDetailRecordsCount,

                type: action.type
            };
        //#endregion 
        // case actions.DEVICELOCATIONDETAILS_LIST_SUCCESS:
        //     return {
        //         deviceLocationDetail: state.deviceLocationDetail,
        //         deviceLocationDetails: action.data,
        //         deviceLocationDetailActiontype: action.type,
        //         deviceLocationDetailRecordsCount: action.recordsCount,

        //         type: action.type,
        //     };
        //#region DEVICE MAPPING DETAILS 
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

            case actions.TOWERACTIVESTATUS_LIST_SUCCESS:
                return {
                towerActiveDetail: state.towerActiveDetail,
                towerActiveDetails: action.data,
                towerActiveDetailActiontype: action.type,
                towerActiveDetailRecordsCount: action.recordsCount,

                type: action.type,
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
                deviceBatteryStatus: state.deviceBatteryStatus,
                deviceBatteryStatuss: state.deviceBatteryStatuss,
                deviceBatteryStatustype: state.deviceBatteryStatustype,
                deviceBatteryStatusRecordsCount: state.deviceBatteryStatusRecordsCount,

                deviceBatteryStatusLog: state.deviceBatteryStatusLog,
                deviceBatteryStatusLogs: state.deviceBatteryStatusLogs,
                deviceBatteryStatusLogtype: state.deviceBatteryStatusLogtype,
                deviceBatteryStatusLogRecordsCount: state.deviceBatteryStatusLogRecordsCount,

                towerMonitoringDetail: state.towerMonitoringDetail,
                towerMonitoringDetails: state.towerMonitoringDetails,
                towerMonitoringDetailtype: state.towerMonitoringDetailtype,
                towerMonitoringDetailRecordsCount: state.towerMonitoringDetailRecordsCount,

                deviceStatusDetail: state.deviceStatusDetail,
                deviceStatusDetails: state.deviceStatusDetails,
                deviceStatusDetailtype: state.deviceStatusDetailtype,
                deviceStatusDetailRecordsCount: state.deviceStatusDetailRecordsCount,

                networkConnectivityStatuDetail: state.networkConnectivityStatuDetail,
                networkConnectivityStatuDetails: state.networkConnectivityStatuDetails,
                networkConnectivityStatuDetailtype: state.networkConnectivityStatuDetailtype,
                networkConnectivityStatuDetailRecordsCount: state.networkConnectivityStatuDetailRecordsCount,

                towerMonitoringSubDetail: state.towerMonitoringSubDetail,
                towerMonitoringSubDetails: state.towerMonitoringSubDetails,
                towerMonitoringSubDetailtype: state.towerMonitoringSubDetailtype,
                towerMonitoringSubDetailRecordsCount: state.towerMonitoringSubDetailRecordsCount,

                deviceMappingDetail: state.deviceMappingDetail,
                deviceMappingDetails: state.deviceMappingDetails,
                deviceMappingDetailActiontype: state.deviceMappingDetailActiontype,
                deviceMappingDetailRecordsCount: state.deviceMappingDetailRecordsCount,

                towerNotificationDetail: state.towerNotificationDetail,
                towerNotificationDetails: state.towerNotificationDetails,
                towerNotificationDetailActiontype: state.towerNotificationDetailActiontype,
                towerNotificationDetailRecordsCount: state.towerNotificationDetailRecordsCount,

                towerActiveDetail: state.towerActiveDetail,
                towerActiveDetails: state.towerActiveDetails,
                towerActiveDetailActiontype: state.towerActiveDetailActiontype,
                towerActiveDetailRecordsCount: state.towerActiveDetailRecordsCount,

            };
    }
};

export default workingReducer;