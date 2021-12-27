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

        //#region  Tower Monitoring Details -- Device Battery Status
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
        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

                deviceLocationDetail: state.deviceLocationDetail,
                deviceLocationDetails: state.deviceLocationDetails,
                deviceLocationDetailActiontype: state.deviceLocationDetailActiontype,
                deviceLocationDetailRecordsCount: state.deviceLocationDetailRecordsCount,

                deviceBatteryStatus: state.deviceBatteryStatus,
                deviceBatteryStatuss: state.deviceBatteryStatuss,
                deviceBatteryStatustype: state.deviceBatteryStatustype,
                deviceBatteryStatusRecordsCount: state.deviceBatteryStatusRecordsCount,

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

            };
    }
};

export default workingReducer;