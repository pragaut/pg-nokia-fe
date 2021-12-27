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
 
//#region  device location details
// export const getDeviceLocationDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
//     dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
//     try {
//         let pageIndex = 0;
 
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

//#region  Device Mapping Details
export const getDeviceMappingDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

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
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
        let towerMonitoringSubDetailId = filters && filters.towerMonitoringSubDetailId ? filters.towerMonitoringSubDetailId : '';
        let alarmTypeId = filters && filters.alarmTypeId ? filters.alarmTypeId : ''; 
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : ''; 
        let isClosed = filters && filters.isClosed ? filters.isClosed : ''; 

        let url = config.NOKIA_URL + `nokia/nokiaworking/towerNotificationDetails?pageIndex=${pageIndex}`;

        
        if (towerMonitoringSubDetailId) {
            url = url + `&towerMonitoringSubDetailId=${towerMonitoringSubDetailId}`;
        } 
        if (alarmTypeId) {
            url = url + `&alarmTypeId=${alarmTypeId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        } 
        if (isClosed) {
            url = url + `&isClosed=${isClosed}`;
        } 

        const data = await service.get(url, true);
        console.log("Tower Notification Details:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.TOWERNOTIFICATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
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

export const updateTowerNotificationDetails = towerNotificationDetails => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaworking/towerNotificationDetails/`;
        const data = (typeof towerNotificationDetails.id === 'undefined' || towerNotificationDetails.id === -1) ? await service.post(url, towerNotificationDetails, true)
            : await service.put(url, towerNotificationDetails, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, workingTypes.TOWERNOTIFICATIONDETAILS_SAVE_SUCCESS, roleMaster, null, data.message, null);

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

//#endregion
