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
export const getDeviceLocationDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
        let deviceLocationDetailId = filters && filters.id ? filters.id : '';
        let deviceRegistrationDetailId = filters && filters.deviceRegistrationDetailId ? filters.deviceRegistrationDetailId : '';
        let macAddress = filters && filters.macAddress ? filters.macAddress : ''; 

        let url = config.NOKIA_URL + `nokia/nokiaworking/deviceLocationDetails?pageIndex=${pageIndex}`;

        if (deviceLocationDetailId) {
            url = url + `&deviceLocationDetailId=${deviceLocationDetailId}`;
        }
        if (deviceRegistrationDetailId) {
            url = url + `&deviceRegistrationDetailId=${deviceRegistrationDetailId}`;
        }
        if (macAddress) {
            url = url + `&macAddress=${macAddress}`;
        }

        const data = await service.get(url, true);
        console.log("Device Location Details:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.DEVICELOCATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Location Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion
