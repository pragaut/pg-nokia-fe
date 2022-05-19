import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service';
import * as workingTypes from '../../action-types/tmc/working.action.types';
import * as util from '../../utils'
import config from '../../config';
import * as errorTypes from '../../action-types/comman/error.action.types';
import * as sessionHelper from '../../utils/session.helper';


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

//#region  Device Mapping Details
export const getDeviceMappingDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        const user = sessionHelper.getLoggedUser();
        const userRole = sessionHelper.getLoggedUserRole_JSONConverted();
        // console.log("----------current User ---- ",user);
        //console.log("----------current userRole ---- ",userRole);
        let orgDetailsId = user && user.orgDetailsId;
        let roleMasterId = userRole && userRole.id;
        //console.log("ActionPlan filters : ", filters);
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let towerId = filters && filters.towerId ? filters.towerId : '';

        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceMappingDetails?pageIndex=${pageIndex}`;


        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (towerId) {
            url = url + `&towerId=${towerId}`;
        }
        if (orgDetailsId) {
            url = url + `&orgDetailsId=${orgDetailsId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        const data = await service.get(url, true);
        console.log("Device Mapping Details:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICEMAPPINGDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Error in getting details'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Tower Notification Details
export const getTowerNotificationDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
        //console.log("filters : >>", filters);
        const user = sessionHelper.getLoggedUser();
        const userRole = sessionHelper.getLoggedUserRole_JSONConverted();
        // console.log("----------current User ---- ",user);
        //console.log("----------current userRole ---- ",userRole);
        let orgDetailsId = user && user.orgDetailsId;
        let roleMasterId = userRole && userRole.id;

        let towerMonitoringSubDetailId = filters && filters.towerMonitoringSubDetailId ? filters.towerMonitoringSubDetailId : '';
        let alarmTypeId = filters && filters.alarmTypeId ? filters.alarmTypeId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let isClosed = filters && filters.isClosed ? filters.isClosed : '';
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';

        let url = config.NOKIA_URL + `nokia/nokiaworking/towerNotificationDetails?pageIndex=${pageIndex}`;


        if (towerMonitoringSubDetailId) {
            url = url + `&towerMonitoringSubDetailId=${towerMonitoringSubDetailId}`;
        }
        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        if (alarmTypeId) {
            url = url + `&alarmTypeId=${alarmTypeId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (orgDetailsId) {
            url = url + `&orgDetailsId=${orgDetailsId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        if (isClosed) {
            url = url + `&isClosed=${isClosed}`;
        }
        else {
            url = url + `&isClosed=${0}`;
        }
        //console.log("url : 1>>>>>>", url);
        const data = await service.get(url, true);
        //console.log("Tower Notification Details:  ", data);

        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERNOTIFICATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Error in getting details'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const updateTowerNotificationDetails = towerNotificationDetails => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaworking/towerNotificationDetails/`;
        const data = (typeof towerNotificationDetails.id === 'undefined' || towerNotificationDetails.id === -1) ? await service.post(url, towerNotificationDetails, true)
            : await service.put(url, towerNotificationDetails, true);
        //console.log("Tower Notification Details : >>>>>>>>>>>", towerNotificationDetails);
        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, workingTypes.TOWERNOTIFICATIONDETAILS_SAVE_SUCCESS, towerNotificationDetails, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Tower notification updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'tower notification updating error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getTowerActiveDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        const user = sessionHelper.getLoggedUser();
        const userRole = sessionHelper.getLoggedUserRole_JSONConverted();
        // console.log("----------current User ---- ",user);
        //console.log("----------current userRole ---- ",userRole);
        let orgDetailsId = user && user.orgDetailsId;
        let roleMasterId = userRole && userRole.id;

        let url = config.NOKIA_URL + `nokia/nokiaworking/towerActiveStatusDetails?pageIndex=${pageIndex}`;
        if (orgDetailsId) {
            url = url + `&orgDetailsId=${orgDetailsId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERACTIVESTATUS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Error in getting details'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Device Battery Status
export const getDeviceBatteryStatus = (filters) => async dispatch => {
    // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceBatteryStatus?pageIndex=${pageIndex}`;
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICEBATTERYSTATUS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Battery Status Details error'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getDeviceBatteryStatusLog = (filters) => async dispatch => {
    // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceBatteryStatusLog?pageIndex=${pageIndex}`;
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICEBATTERYSTATUSLOG_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Battery Status Details error'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Tower Monitoring Details
export const getTowerMonitoringDetails = (filters) => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {

        const user = sessionHelper.getLoggedUser();
        const userRole = sessionHelper.getLoggedUserRole_JSONConverted();
        //console.log("----------current User ---- ",user);
        //console.log("----------current userRole ---- ",userRole);
        let orgDetailsId = user && user.orgDetailsId;
        let roleMasterId = userRole && userRole.id;
        let pageIndex = 0;
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';
        let towerMasterId = filters && filters.towerMasterId && filters.towerMasterId !== null && filters.towerMasterId !== '' && filters.towerMasterId !== '-1' ? filters.towerMasterId : '';
        let riggerEmployeeId = filters && filters.riggerEmployeeId && filters.riggerEmployeeId !== null && filters.riggerEmployeeId !== '' && filters.riggerEmployeeId !== '-1' ? filters.riggerEmployeeId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let uniqueId = filters && filters.uniqueId ? filters.uniqueId : '';
        let isOnlyTodayDataRequired = filters && filters.isOnlyTodayDataRequired ? filters.isOnlyTodayDataRequired : '0';
        let isOnlyLiveTMCDataRequired = filters && filters.isOnlyLiveTMCDataRequired ? filters.isOnlyLiveTMCDataRequired : '0';
        let fromDate = filters && filters.fromDate && filters.fromDate !== null ? filters.fromDate : null;
        let toDate = filters && filters.toDate && filters.toDate !== null ? filters.toDate : null;
        let url = config.NOKIA_URL + `nokia/nokiaworking/towerMonitoringDetails?pageIndex=${pageIndex}`;

        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
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
        if (isOnlyLiveTMCDataRequired) {
            url = url + `&isOnlyLiveTMCDataRequired=${isOnlyLiveTMCDataRequired}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }
        if (fromDate) {
            url = url + `&fromDate=${fromDate}`;
        }
        if (toDate) {
            url = url + `&toDate=${toDate}`;
        }
        if (orgDetailsId) {
            url = url + `&orgDetailsId=${orgDetailsId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERMONITORINGDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            //   dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Monitoring Details error'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Device Status Details
export const getDeviceStatusDetails = (filters) => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let deviceStatusDetailId = filters && filters.deviceStatusDetailId ? filters.deviceStatusDetailId : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : '';
        let towerMonitoringDetailId = filters && filters.towerMonitoringDetailId ? filters.towerMonitoringDetailId : '';

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
        if (towerMonitoringDetailId) {
            url = url + `&towerMonitoringDetailId=${towerMonitoringDetailId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICESTATUSDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            //   dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Status Details error'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region   Network Connectivity Status
export const getNetworkConnectivityStatuDetails = (filters) => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
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
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.NETWORKCONNECTIVITYSTATUSDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'network connectivity status details error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion



//#region   Tower Monitoring Sub Details
export const getTowerMonitoringSubDetails = (filters) => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
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
            //   dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERMONITORING_SUBDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            //   dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'tower monitoring sub Details error'), null, null);
        }
    }
    catch (error) {
        //dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region  Device Location

export const getDeviceLocationDetails = () => async dispatch => {
    // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        const user = sessionHelper.getLoggedUser();
        const userRole = sessionHelper.getLoggedUserRole_JSONConverted();
        let orgDetailsId = user && user.orgDetailsId;
        let roleMasterId = userRole && userRole.id;

        let url = config.NOKIA_URL + `nokia/nokiaworking/getTMCDeviceLocationDetails?pageIndex=${pageIndex}`;
        if (orgDetailsId) {
            url = url + `&orgDetailsId=${orgDetailsId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICELOCATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Error in getting details'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion