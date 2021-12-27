import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service';
import * as workingTypes from '../../action-types/tmc/working.action.types';
import * as util from '../../utils'
import config from '../../config';
import * as errorTypes from '../../action-types/comman/error.action.types';


/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} data 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, data, error, message, recordsCount) => {
    dispatch({
        type,
        message,
        data,
        error,
        recordsCount
    });
};

// //#region  device location details
// export const getDeviceLocationDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
//     dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
//     try {
//         let pageIndex = 0;

//         //console.log("ActionPlan filters : ", filters);
//         let deviceLocationDetailId = filters && filters.id ? filters.id : '';
//         let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
//         let macAddress = filters && filters.macAddress ? filters.macAddress : '';

//         let url = config.NOKIA_URL + `nokia/nokiaworking/deviceLocationDetails?pageIndex=${pageIndex}`;

//         if (deviceLocationDetailId) {
//             url = url + `&deviceLocationDetailId=${deviceLocationDetailId}`;
//         }
//         if (deviceRegistrationDetailId) {
//             url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
//         }
//         if (macAddress) {
//             url = url + `&macAddress=${macAddress}`;
//         }

//         const data = await service.get(url, true);
//         console.log("Device Location Details:  ", data);

//         if (data && !data.errorMessage) {
//             dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
//             dispatchAction(dispatch, workingTypes.DEVICELOCATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
//         }
//         else {
//             dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
//             dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Location Details error'), null, null);
//         }
//     }
//     catch (error) {
//         dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
//         dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
//     }
// };
// //#endregion

//#region  Device Battery Status
export const getDeviceBatteryStatus = (filters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        console.log('----------batery-filters---------', filters);
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceBatteryStatus?pageIndex=${pageIndex}`;
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        const data = await service.get(url, true);

        console.log('----------batery-data---------', data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICEBATTERYSTATUS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Battery Status Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Tower Monitoring Details
export const getTowerMonitoringDetails = (filters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';
        let towerMasterId = filters && filters.towerMasterId && filters.towerMasterId !== null && filters.towerMasterId !== '' && filters.towerMasterId !== '-1' ? filters.towerMasterId : '';
        let riggerEmployeeId = filters && filters.riggerEmployeeId && filters.riggerEmployeeId !== null && filters.riggerEmployeeId !== '' && filters.riggerEmployeeId !== '-1' ? filters.riggerEmployeeId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let uniqueId = filters && filters.uniqueId ? filters.uniqueId : '';
        let isOnlyTodayDataRequired = filters && filters.isOnlyTodayDataRequired ? filters.isOnlyTodayDataRequired : '0';
        let url = config.NOKIA_URL + `nokia/nokiaworking/towerMonitoringDetails?pageIndex=${pageIndex}`;

        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        if (towerMasterId) {
            url = url + `&towerMasterId=${towerMasterId}`;
        }
        if (riggerEmployeeId) {
            url = url + `&riggerEmployeeId=${riggerEmployeeId}`;
        }
        if (uniqueId) {
            url = url + `&uniqueId=${uniqueId}`;
        }
        if (isOnlyTodayDataRequired) {
            url = url + `&isOnlyTodayDataRequired=${isOnlyTodayDataRequired}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERMONITORINGDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Monitoring Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Device Status Details
export const getDeviceStatusDetails = (filters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let deviceStatusDetailId = filters && filters.deviceStatusDetailId ? filters.deviceStatusDetailId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceStatusDetails?pageIndex=${pageIndex}`;

        if (deviceStatusDetailId) {
            url = url + `&deviceStatusDetailId=${deviceStatusDetailId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICESTATUSDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Status Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Network Connectivity Status
export const getNetworkConnectivityStatuDetails = (filters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let networkConnectivityStatusId = filters && filters.networkConnectivityStatusId ? filters.networkConnectivityStatusId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let uniqueId = filters && filters.uniqueId ? filters.uniqueId : '';
        let url = config.NOKIA_URL + `nokia/nokiaworking/networkConnectivityStatuDetails?pageIndex=${pageIndex}`;

        if (networkConnectivityStatusId) {
            url = url + `&networkConnectivityStatusId=${networkConnectivityStatusId}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (uniqueId) {
            url = url + `&uniqueId=${uniqueId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.NETWORKCONNECTIVITYSTATUSDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'network connectivity status details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion



//#region   Tower Monitoring Sub Details
export const getTowerMonitoringSubDetails = (filters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let towerMonitoringSubDetailId = filters && filters.towerMonitoringSubDetailId ? filters.towerMonitoringSubDetailId : '';
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let isOnlyTodayDataRequired = filters && filters.isOnlyTodayDataRequired ? filters.isOnlyTodayDataRequired : '0';
        let url = config.NOKIA_URL + `nokia/nokiaworking/towerMonitoringSubDetails?pageIndex=${pageIndex}`;

        if (towerMonitoringSubDetailId) {
            url = url + `&towerMonitoringSubDetailId=${towerMonitoringSubDetailId}`;
        }
        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        if (isOnlyTodayDataRequired) {
            url = url + `&isOnlyTodayDataRequired=${isOnlyTodayDataRequired}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERMONITORING_SUBDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'tower monitoring sub Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion