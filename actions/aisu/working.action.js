import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service'; 
import * as workingTypes from '../../action-types/aisu/working.action.types';
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

//#region  antenna rotation Details
export const getAntennaRotataionDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
        let id = filters && filters.id ? filters.id : '';
        let towerAntennaId = filters && filters.towerAntennaId ? filters.towerAntennaId : '';
        let towerId = filters && filters.towerId ? filters.towerId : '';
        let macOrAntennaCode = filters && filters.macOrAntennaCode ? filters.criticamacOrAntennaCodelityMasterId : '';

        let url = config.NOKIA_URL + `nokia/nokiaworking/antennaRotationDetails?pageIndex=${pageIndex}`;

        if (id) {
            url = url + `&id=${id}`;
        }
        if (towerAntennaId) {
            url = url + `&towerAntennaId=${towerAntennaId}`;
        }
        if (towerId) {
            url = url + `&towerId=${towerId}`;
        }
        if (macOrAntennaCode) {
            url = url + `&macOrAntennaCode=${macOrAntennaCode}`;
        }

        //console.log("ActionPlan url : ", url);

        const data = await service.get(url, true);
        console.log("antenna Rotations Details:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ANTENNAROTATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Antenna Rotation Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region  antenna rotation Detail Logs
export const getAntennaRotataionDetailLogs = (antennaRotationDetailId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
       // let antennaRotationDetailId = filters && filters.antennaRotationDetailId ? filters.antennaRotationDetailId : '';
        
        let url = config.NOKIA_URL + `nokia/nokiaworking/antennaRotationDetailLogs?pageIndex=${pageIndex}`;
        console.log("antennaRotationDetailId:::::------->>:  ", antennaRotationDetailId);
        if (antennaRotationDetailId) {
            url = url + `&antennaRotationDetailId=${antennaRotationDetailId}`;
        }  
        const data = await service.get(url, true);
        console.log("antenna Rotations Details Logs:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ANTENNAROTATIONDETAILLOGS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Antenna Rotation Details Logs error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion
